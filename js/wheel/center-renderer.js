const CenterRenderer = {
    render(svg, center) {
        const centerCircleRadius = 65;
        
        // Render center circle
        const centerCircle = WheelSVG.createSVGElement('circle', {
            cx: center,
            cy: center,
            r: centerCircleRadius.toString(),
            fill: 'white'
        });
        svg.appendChild(centerCircle);

        this.renderGameName(svg, center, centerCircleRadius);
    },

    renderGameName(svg, center, centerCircleRadius) {
        const gameName = document.getElementById('gameName').value;
        const wrappedGameName = Utils.wrapText(gameName, 10.75);
        
        // Calculate dynamic font size
        const maxFontSize = 20;
        const minFontSize = 10;
        const fontSize = Math.max(
            minFontSize,
            Math.min(
                maxFontSize,
                Math.floor(centerCircleRadius * 1.2 / wrappedGameName.length)
            )
        );

        const gameNameText = WheelSVG.createSVGElement('text', {
            x: center,
            'text-anchor': 'middle',
            'font-weight': 'bold',
            'font-size': `${fontSize}px`
        });
        
        // Calculate vertical position for centered text
        const lineHeight = fontSize * 1.1;
        const totalHeight = wrappedGameName.length * lineHeight;
        const startY = center - (totalHeight / 2) + (lineHeight / 2) + (lineHeight * 0.2);

        wrappedGameName.forEach((line, index) => {
            const tspan = WheelSVG.createSVGElement('tspan', {
                x: center,
                y: startY + (index * lineHeight),
                'text-anchor': 'middle'
            });
            tspan.textContent = line;
            gameNameText.appendChild(tspan);
        });
        
        svg.appendChild(gameNameText);
    }
};
