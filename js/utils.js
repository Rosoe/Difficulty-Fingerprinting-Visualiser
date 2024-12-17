const Utils = {
    wrapText(text, maxWidth = 10) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            if (currentLine.length + words[i].length + 1 <= maxWidth) {
                currentLine += ' ' + words[i];
            } else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }
        lines.push(currentLine);
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
