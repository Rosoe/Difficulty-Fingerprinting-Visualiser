const WheelSVG = {
    setupSVG() {
        const svg = document.getElementById('wheel');
        svg.innerHTML = ''; // Clear existing content

        // Add definitions for filters
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', 'textShadow');
        
        const feDropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
        feDropShadow.setAttribute('dx', '0');
        feDropShadow.setAttribute('dy', '0');
        feDropShadow.setAttribute('stdDeviation', '1.5');
        feDropShadow.setAttribute('flood-color', 'black');
        feDropShadow.setAttribute('flood-opacity', '0.7');
        
        filter.appendChild(feDropShadow);
        defs.appendChild(filter);
        svg.appendChild(defs);

        return svg;
    },

    createSVGElement(type, attributes = {}) {
        const element = document.createElementNS('http://www.w3.org/2000/svg', type);
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    }
};
