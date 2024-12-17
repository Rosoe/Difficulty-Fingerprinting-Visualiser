const CategoryRenderer = {
    render(svg, categories, sectionAngle, center, innerRadius) {
        Object.entries(categories).forEach(([category, { color }], index) => {
            const startAngle = index * sectionAngle - Math.PI / 2;
            const endAngle = startAngle + sectionAngle;

            // Main category section
            const mainSection = WheelSVG.createSVGElement('path', {
                d: `M ${center} ${center} 
                    L ${center + innerRadius * Math.cos(startAngle)} ${center + innerRadius * Math.sin(startAngle)} 
                    A ${innerRadius} ${innerRadius} 0 0 1 ${center + innerRadius * Math.cos(endAngle)} ${center + innerRadius * Math.sin(endAngle)} Z`,
                fill: color,
                'fill-opacity': State.getCategoryOpacity(category)
            });
            svg.appendChild(mainSection);

            this.renderLabel(svg, category, startAngle, sectionAngle, center, innerRadius);
        });
    },

    renderLabel(svg, category, startAngle, sectionAngle, center, innerRadius) {
        const labelAngle = startAngle + sectionAngle / 2;
        const labelRadius = innerRadius * 0.65;
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
