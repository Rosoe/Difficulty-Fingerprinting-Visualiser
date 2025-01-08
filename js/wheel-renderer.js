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
        CategoryRenderer.render(svg, categories, sectionAngle, center, innerRadius, outerRadius);

        // Render subcategories
        SubcategoryRenderer.render(svg, categories, sectionAngle, center, innerRadius, outerRadius);

        // Render center
        CenterRenderer.render(svg, center);

        // Render difficulty metrics
        this.renderDifficultyMetrics(svg);
    },

    renderDifficultyMetrics(svg) {
        const metrics = [
            {
                type: 'intensity',
                x: 50,
                label: 'Difficulty Intensity',
                value: Utils.calculateDifficultyIntensity(),
                tooltipX: '-10'
            },
            {
                type: 'variation',
                x: 700,
                label: 'Difficulty Depth',
                value: Utils.calculateDifficultyVariation(),
                tooltipX: '-160'
            }
        ];

        metrics.forEach(metric => {
            const group = WheelSVG.createSVGElement('g', {
                class: 'difficulty-metric',
                transform: `translate(${metric.x}, 50)`
            });

            // Label
            const label = WheelSVG.createSVGElement('text', {
                x: '0',
                y: '15',
                'text-anchor': 'start',
                fill: 'black',
                'font-size': '12',
                class: 'metric-label'
            });
            label.textContent = metric.label;

            // Value
            const value = WheelSVG.createSVGElement('text', {
                x: '0',
                y: '35',
                'text-anchor': 'start',
                fill: 'black',
                'font-size': '16',
                'font-weight': 'bold',
                class: 'metric-value'
            });
            value.textContent = metric.value;

            // Create a transparent rect for hover area
            const hoverArea = WheelSVG.createSVGElement('rect', {
                x: '-10',
                y: '0',
                width: '80',
                height: '40',
                fill: 'transparent',
                class: 'metric-hover-area'
            });

            // Tooltip
            const tooltipText = Utils.getDifficultyTooltip(metric.type);
            const foreignObject = WheelSVG.createSVGElement('foreignObject', {
                class: 'metric-tooltip',
                x: metric.tooltipX,
                y: '40',
                width: '200',
                height: '600'
            });

            const tooltipDiv = document.createElement('div');
            tooltipDiv.textContent = tooltipText;
            tooltipDiv.style.background = 'white';
            tooltipDiv.style.border = '1px solid black';
            tooltipDiv.style.padding = '8px';
            tooltipDiv.style.borderRadius = '4px';
            tooltipDiv.style.fontSize = '12px';
            tooltipDiv.style.whiteSpace = 'pre-line';
            tooltipDiv.style.visibility = 'hidden';

            foreignObject.appendChild(tooltipDiv);

            // Add hover events
            hoverArea.addEventListener('mouseenter', () => {
                tooltipDiv.style.visibility = 'visible';
            });
            hoverArea.addEventListener('mouseleave', () => {
                tooltipDiv.style.visibility = 'hidden';
            });

            group.appendChild(hoverArea);
            group.appendChild(label);
            group.appendChild(value);
            group.appendChild(foreignObject);
            svg.appendChild(group);
        });
    }
};
