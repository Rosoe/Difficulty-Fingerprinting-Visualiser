const CategoryRenderer = {
    render(svg, categories, sectionAngle, center, innerRadius, outerRadius) {
        // Use outerRadius instead of innerRadius when subcategories are hidden
        const radius = State.showSubcategories ? innerRadius : outerRadius;
        
        // Calculate minimum font size across all categories
        const effectiveRadius = State.showSubcategories ? innerRadius : outerRadius;
        const arcLength = effectiveRadius * sectionAngle;
        // When subcategories are hidden, we have more vertical space for text
        const wedgeHeight = State.showSubcategories ? (outerRadius - innerRadius) : outerRadius;
        // Adjust font size scaling based on available space
        const maxFontSize = State.showSubcategories 
            ? Math.min(arcLength * 0.15, wedgeHeight * 0.2)  // Taller text when in smaller wedge
            : Math.min(arcLength * 0.15, wedgeHeight * 0.08); // Wider but shorter when full radius
        const minFontSize = Object.keys(categories).reduce((min, category) => {
            const categoryFontSize = Math.min(maxFontSize, 200 / category.length);
            return Math.min(min, categoryFontSize);
        }, maxFontSize);
        Object.entries(categories).forEach(([category, { color }], index) => {
            const startAngle = index * sectionAngle - Math.PI / 2;
            const endAngle = startAngle + sectionAngle;
            const centerlineAngle = startAngle + sectionAngle / 2;
            
            // Calculate fill percentage (0-1)
            const fillPercentage = State.getCategoryOpacity(category);
            
            // Always create background section
            const backgroundSection = WheelSVG.createSVGElement('path', {
                d: `M ${center} ${center} 
                    L ${center + radius * Math.cos(startAngle)} ${center + radius * Math.sin(startAngle)} 
                    A ${radius} ${radius} 0 0 1 ${center + radius * Math.cos(endAngle)} ${center + radius * Math.sin(endAngle)} Z`,
                fill: color,
                'fill-opacity': 0.1
            });
            svg.appendChild(backgroundSection);

            // Calculate angles for the filled portion
            const fillAngleOffset = (sectionAngle * fillPercentage) / 2;
            const fillStartAngle = centerlineAngle - fillAngleOffset;
            const fillEndAngle = centerlineAngle + fillAngleOffset;

            // Create filled section if there's a non-zero fill percentage
            if (fillPercentage > 0) {
                const filledSection = WheelSVG.createSVGElement('path', {
                    d: `M ${center} ${center} 
                        L ${center + radius * Math.cos(fillStartAngle)} ${center + radius * Math.sin(fillStartAngle)} 
                        A ${radius} ${radius} 0 0 1 ${center + radius * Math.cos(fillEndAngle)} ${center + radius * Math.sin(fillEndAngle)} Z`,
                    fill: color,
                    'fill-opacity': 1
                });
                svg.appendChild(filledSection);
            }

            this.renderLabel(svg, category, startAngle, sectionAngle, center, innerRadius, outerRadius, minFontSize);
        });
    },

    renderLabel(svg, category, startAngle, sectionAngle, center, innerRadius, outerRadius, fontSize) {
        const labelAngle = startAngle + sectionAngle / 2;
        // Position labels based on whether subcategories are shown
        const effectiveRadius = State.showSubcategories ? innerRadius : outerRadius;
        const labelRadius = effectiveRadius * 0.7;
        const labelX = center + labelRadius * Math.cos(labelAngle);
        const labelY = center + labelRadius * Math.sin(labelAngle);

        // Use the passed in font size that was calculated for all categories

        const categoryLabel = WheelSVG.createSVGElement('text', {
            x: labelX,
            y: labelY,
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            fill: 'white',
            'font-weight': 'bold',
            'font-size': `${fontSize}px`,
            filter: 'url(#textShadow)',
            transform: `rotate(${Utils.getTextRotation(labelAngle)}, ${labelX}, ${labelY})`
        });
        categoryLabel.textContent = category;
        svg.appendChild(categoryLabel);
    }
};
