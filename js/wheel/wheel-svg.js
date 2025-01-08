const WheelSVG = {
    setupSVG() {
        const svg = document.getElementById('wheel');
        svg.innerHTML = ''; // Clear existing content

        // Add definitions for filters
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        // Text shadow filter
        const textShadowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        textShadowFilter.setAttribute('id', 'textShadow');
        
        const feDropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
        feDropShadow.setAttribute('dx', '0');
        feDropShadow.setAttribute('dy', '0');
        feDropShadow.setAttribute('stdDeviation', '1.5');
        feDropShadow.setAttribute('flood-color', 'black');
        feDropShadow.setAttribute('flood-opacity', '0.7');
        
        textShadowFilter.appendChild(feDropShadow);
        defs.appendChild(textShadowFilter);

        // LuminousToAlpha filter
        const luminousFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        luminousFilter.setAttribute('id', 'luminousToAlpha');
        luminousFilter.setAttribute('x', '0');
        luminousFilter.setAttribute('y', '0');
        luminousFilter.setAttribute('width', '100%');
        luminousFilter.setAttribute('height', '100%');
        
        // Convert to grayscale
        const feColorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
        feColorMatrix.setAttribute('type', 'matrix');
        feColorMatrix.setAttribute('values', '0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0');
        feColorMatrix.setAttribute('result', 'grayscale');
        
        // Create blur effect
        const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        feGaussianBlur.setAttribute('in', 'grayscale');
        feGaussianBlur.setAttribute('stdDeviation', '2');
        feGaussianBlur.setAttribute('result', 'blur');
        
        // Composite with original
        const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
        feComposite.setAttribute('operator', 'arithmetic');
        feComposite.setAttribute('k1', '1');
        feComposite.setAttribute('k2', '0');
        feComposite.setAttribute('k3', '0');
        feComposite.setAttribute('k4', '0');
        feComposite.setAttribute('in', 'blur');
        feComposite.setAttribute('in2', 'SourceGraphic');
        
        luminousFilter.appendChild(feColorMatrix);
        luminousFilter.appendChild(feGaussianBlur);
        luminousFilter.appendChild(feComposite);
        defs.appendChild(luminousFilter);
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
