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

        // Get text content
        const gameName = document.getElementById('gameName').value;
        const gameContext = document.getElementById('gameContext').value;
        
        // Create temporary container for text measurements
        const measureContainer = WheelSVG.createSVGElement('g');
        svg.appendChild(measureContainer);
        
        // Find optimal font sizes using binary search
        const { nameFontSize, contextFontSize } = this.findOptimalFontSizes(
            measureContainer,
            center,
            centerCircleRadius,
            gameName,
            gameContext
        );
        
        // Remove measurement container
        svg.removeChild(measureContainer);
        
        // Calculate optimal vertical spacing based on measured sizes
        const spacing = this.calculateOptimalSpacing(
            centerCircleRadius,
            gameName,
            gameContext,
            nameFontSize,
            contextFontSize
        );
        
        // Render texts with optimized sizes
        this.renderText(svg, center, centerCircleRadius, gameName, spacing.nameOffset, nameFontSize, true);
        if (gameContext) {
            this.renderText(svg, center, centerCircleRadius, gameContext, spacing.contextOffset, contextFontSize, false);
        }
    },

    measureText(container, text, fontSize, isBold, center) {
        const textElement = WheelSVG.createSVGElement('text', {
            x: center,
            y: '0',
            'text-anchor': 'middle',
            'font-weight': isBold ? 'bold' : 'normal',
            'font-size': `${fontSize}px`,
            visibility: 'hidden'
        });
        textElement.textContent = text;
        container.appendChild(textElement);
        const bbox = textElement.getBBox();
        container.removeChild(textElement);
        return bbox;
    },

    findOptimalFontSizes(container, center, radius, name, context) {
        const findSize = (text, isBold, maxSize, yPosition = 0) => {
            let low = 8;
            let high = maxSize;
            let optimal = low;

            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                
                // Get available width at this y-position with safety margin
                const availableWidth = this.calculateAvailableWidth(center + yPosition, radius, center) * 0.95;
                
                // Simulate text wrapping to check if it fits
                const lines = [];
                const words = text.split(' ');
                let currentLine = words[0];
                
                // Build lines
                for (let i = 1; i < words.length; i++) {
                    const testLine = currentLine + ' ' + words[i];
                    const testWidth = this.measureText(container, testLine, mid, isBold, center).width;
                    
                    if (testWidth <= availableWidth) {
                        currentLine = testLine;
                    } else {
                        lines.push(currentLine);
                        currentLine = words[i];
                    }
                }
                if (currentLine) {
                    lines.push(currentLine);
                }
                
                // Calculate total height with increased line spacing
                const lineHeight = mid * 1.3; // Increased from 1.1 to 1.3 for better separation
                const totalHeight = lines.length * lineHeight;
                
                // More conservative height check
                const fitsHeight = totalHeight <= radius * 0.75; // Reduced from 0.9 to 0.75
                const fitsWidth = lines.every(line => 
                    this.measureText(container, line, mid, isBold, center).width <= availableWidth
                );
                
                if (fitsHeight && fitsWidth) {
                    optimal = mid;
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            return optimal;
        };

        // More conservative maximum sizes
        const maxNameSize = Math.floor(radius * 0.35); // Reduced from 0.4 to 0.35
        const maxContextSize = Math.floor(radius * 0.25); // Reduced from 0.3 to 0.25
        
        const nameFontSize = findSize(name, true, maxNameSize);
        const contextFontSize = context ? findSize(context, false, maxContextSize) : 0;

        return { nameFontSize, contextFontSize };
    },

    calculateOptimalSpacing(radius, gameName, gameContext, nameFontSize, contextFontSize) {
        if (!gameContext) {
            return { nameOffset: 0, contextOffset: 0 };
        }

        const padding = radius * 0.25; // Increased from 0.05 to 0.15 for better separation
        
        // Create temporary container for measurements
        const measureContainer = WheelSVG.createSVGElement('g');
        
        // Simulate text wrapping to get actual heights
        const getWrappedHeight = (text, fontSize, isBold) => {
            const words = text.split(' ');
            const lines = [];
            let currentLine = words[0];
            
            for (let i = 1; i < words.length; i++) {
                const testLine = currentLine + ' ' + words[i];
                const testWidth = this.measureText(measureContainer, testLine, fontSize, isBold, 0).width;
                const availableWidth = this.calculateAvailableWidth(0, radius, 0) * 0.95; // Added safety margin
                
                if (testWidth <= availableWidth) {
                    currentLine = testLine;
                } else {
                    lines.push(currentLine);
                    currentLine = words[i];
                }
            }
            if (currentLine) {
                lines.push(currentLine);
            }
            
            return lines.length * (fontSize * 1.3); // Increased line height multiplier
        };
        
        // Calculate heights with line wrapping
        const nameHeight = getWrappedHeight(gameName, nameFontSize, true);
        const contextHeight = getWrappedHeight(gameContext, contextFontSize, false);
        
        // Position texts with increased spacing
        const totalHeight = nameHeight + padding + contextHeight;
        const verticalSpace = radius * 1.2; // Reduced from 1.4 for tighter vertical bounds
        
        // Calculate offsets with guaranteed separation
        const nameOffset = -padding - (nameHeight / 2);
        const contextOffset = padding + (contextHeight / 2);
        
        return { nameOffset, contextOffset };
    },

    calculateAvailableWidth(y, centerCircleRadius, centerY) {
        // Using circle equation to calculate width at given y position
        const relativeY = Math.abs(y - centerY);
        if (relativeY >= centerCircleRadius) return 0;
        
        // Calculate width using Pythagorean theorem
        const rawWidth = 2 * Math.sqrt(centerCircleRadius * centerCircleRadius - relativeY * relativeY);
        
        // More conservative margin factor
        const marginFactor = 0.85 - (relativeY / centerCircleRadius) * 0.15; // Reduced from 0.9 to 0.85
        return rawWidth * marginFactor;
    },

    renderText(svg, center, centerCircleRadius, text, yOffset, fontSize, isBold) {
        const textElement = WheelSVG.createSVGElement('text', {
            x: center,
            'text-anchor': 'middle',
            'font-weight': isBold ? 'bold' : 'normal',
            'font-size': `${fontSize}px`,
            'dominant-baseline': 'middle'
        });
        
        // Calculate initial position
        const effectiveY = center + yOffset;
        
        // Split text into words and initialize lines array
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];
        let currentY = effectiveY;
        
        // Build lines that fit within circle boundary at their specific y-position
        for (let i = 1; i < words.length; i++) {
            const testLine = currentLine + ' ' + words[i];
            const availableWidth = this.calculateAvailableWidth(currentY, centerCircleRadius, center) * 0.95;
            const testWidth = this.measureText(svg, testLine, fontSize, isBold, center).width;
            
            if (testWidth <= availableWidth) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }
        if (currentLine) {
            lines.push(currentLine);
        }
        
        if (lines.length > 0) {
            // Calculate line spacing with increased height
            const lineHeight = fontSize * 1.3;
            const totalHeight = lines.length * lineHeight;
            let startY = effectiveY - (totalHeight / 2) + (lineHeight / 2);
            
            // More conservative bounds
            const topBound = center - centerCircleRadius * 0.8;
            const bottomBound = center + centerCircleRadius * 0.8;
            if (startY < topBound) startY = topBound;
            if (startY + totalHeight > bottomBound) startY = bottomBound - totalHeight;
            
            // Create lines with dynamic width constraints
            lines.forEach((line, index) => {
                const lineY = startY + (index * lineHeight);
                const lineWidth = this.calculateAvailableWidth(lineY, centerCircleRadius, center) * 0.95;
                
                const tspan = WheelSVG.createSVGElement('tspan', {
                    x: center,
                    y: lineY.toString(),
                    'text-anchor': 'middle',
                    'dominant-baseline': 'middle'
                });
                
                // Ensure line fits within available width
                const measuredWidth = this.measureText(svg, line, fontSize, isBold, center).width;
                if (measuredWidth > lineWidth) {
                    let truncated = line;
                    while (this.measureText(svg, truncated + '...', fontSize, isBold, center).width > lineWidth && truncated.length > 0) {
                        truncated = truncated.slice(0, -1);
                    }
                    tspan.textContent = truncated + (truncated.length < line.length ? '...' : '');
                } else {
                    tspan.textContent = line;
                }
                
                textElement.appendChild(tspan);
            });
        } else {
            // Single line case
            const availableWidth = this.calculateAvailableWidth(effectiveY, centerCircleRadius, center) * 0.95;
            const measuredWidth = this.measureText(svg, text, fontSize, isBold, center).width;
            
            if (measuredWidth > availableWidth) {
                let truncated = text;
                while (this.measureText(svg, truncated + '...', fontSize, isBold, center).width > availableWidth && truncated.length > 0) {
                    truncated = truncated.slice(0, -1);
                }
                textElement.textContent = truncated + (truncated.length < text.length ? '...' : '');
            } else {
                textElement.textContent = text;
            }
            textElement.setAttribute('y', effectiveY.toString());
        }
        
        svg.appendChild(textElement);
    }
};
