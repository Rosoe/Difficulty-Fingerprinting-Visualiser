const Utils = {
    wrapText(text, maxWidth = 20) {
        // If text is shorter than maxWidth, return as single line
        if (text.length <= maxWidth) {
            return [text];
        }

        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];
        let currentLength = words[0].length;

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const wordLength = word.length;
            
            // Check if adding this word would exceed maxWidth
            if (currentLength + 1 + wordLength <= maxWidth) {
                currentLine += ' ' + word;
                currentLength += 1 + wordLength;
            } else {
                // If current word is too long, try to split it
                if (wordLength > maxWidth) {
                    if (currentLine) lines.push(currentLine);
                    // Split long word across lines
                    for (let j = 0; j < wordLength; j += maxWidth) {
                        lines.push(word.substr(j, maxWidth));
                    }
                    currentLine = '';
                    currentLength = 0;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                    currentLength = wordLength;
                }
            }
        }
        
        if (currentLine) {
            lines.push(currentLine);
        }
        
        return lines;
    },

    getTextRotation(angle) {
        let degrees = (angle * 180) / Math.PI;
        if (degrees > 90 && degrees < 270) {
            return degrees + 180;
        }
        return degrees;
    }
};
