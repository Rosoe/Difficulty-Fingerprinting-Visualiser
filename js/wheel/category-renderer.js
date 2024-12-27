const CategoryRenderer = {
    render(svg, categories, sectionAngle, center, innerRadius) {
        Object.entries(categories).forEach(([category, { color }], index) => {
            const startAngle = index * sectionAngle - Math.PI / 2;
            const endAngle = startAngle + sectionAngle;
            const centerlineAngle = startAngle + sectionAngle / 2;
            
            // Calculate fill percentage (0-1)
            const fillPercentage = State.getCategoryOpacity(category);
            
            // Create background (unfilled) section
            const backgroundSection = WheelSVG.createSVGElement('path', {
                d: `M ${center} ${center} 
                    L ${center + innerRadius * Math.cos(startAngle)} ${center + innerRadius * Math.sin(startAngle)} 
                    A ${innerRadius} ${innerRadius} 0 0 1 ${center + innerRadius * Math.cos(endAngle)} ${center + innerRadius * Math.sin(endAngle)} Z`,
                fill: color,
                'fill-opacity': 0.1
            });
            svg.appendChild(backgroundSection);

            // Calculate angles for the filled portion
            const fillAngleOffset = (sectionAngle * fillPercentage) / 2;
            const fillStartAngle = centerlineAngle - fillAngleOffset;
            const fillEndAngle = centerlineAngle + fillAngleOffset;

            // Create filled section
            if (fillPercentage > 0) {
                const filledSection = WheelSVG.createSVGElement('path', {
                    d: `M ${center} ${center} 
                        L ${center + innerRadius * Math.cos(fillStartAngle)} ${center + innerRadius * Math.sin(fillStartAngle)} 
                        A ${innerRadius} ${innerRadius} 0 0 1 ${center + innerRadius * Math.cos(fillEndAngle)} ${center + innerRadius * Math.sin(fillEndAngle)} Z`,
                    fill: color,
                    'fill-opacity': 1
                });
                svg.appendChild(filledSection);
            }

            this.renderLabel(svg, category, startAngle, sectionAngle, center, innerRadius);
        });
    },

    renderLabel(svg, category, startAngle, sectionAngle, center, innerRadius) {
        const labelAngle = startAngle + sectionAngle / 2;
        const labelRadius = innerRadius * 0.62;
        const labelX = center + labelRadius * Math.cos(labelAngle);
        const labelY = center + labelRadius * Math.sin(labelAngle);

        // Calculate dynamic font size
        const arcLength = innerRadius * sectionAngle;
        const wedgeHeight = innerRadius;
        const maxFontSize = Math.min(arcLength * 0.15, wedgeHeight * 0.08);
        const fontSize = Math.min(maxFontSize, 200 / category.length);

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
