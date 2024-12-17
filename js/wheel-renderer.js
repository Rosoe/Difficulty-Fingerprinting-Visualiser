const WheelRenderer = {
    render() {
        this.renderWheel(categories);
    },

    renderWheel(categories) {
        const svg = WheelSVG.setupSVG();
        const viewBoxSize = 800;  // Changed back to 800 to match HTML template
        svg.setAttribute('viewBox', `0 0 ${viewBoxSize} ${viewBoxSize}`);
        
        const center = viewBoxSize / 2;
        const innerRadius = center * 0.6;  // 240
        const outerRadius = center * 0.9;  // 360

        const sectionAngle = (2 * Math.PI) / Object.keys(categories).length;

        // Render main categories
        CategoryRenderer.render(svg, categories, sectionAngle, center, innerRadius);

        // Render subcategories
        SubcategoryRenderer.render(svg, categories, sectionAngle, center, innerRadius, outerRadius);

        // Render center
        CenterRenderer.render(svg, center);
    }
};
