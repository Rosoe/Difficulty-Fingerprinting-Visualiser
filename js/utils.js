const Utils = {
    calculateDifficultyIntensity() {
        const difficulties = State.difficulties;
        const totalPoints = Object.values(difficulties).reduce((sum, value) => sum + value, 0);
        const maxPossiblePoints = Object.keys(difficulties).length * 100;
        return Math.round((totalPoints / maxPossiblePoints) * 100);
    },

    calculateDifficultyVariation() {
        const difficulties = State.difficulties;
        const categoryScores = {};
        
        // Calculate weighted scores for each category
        Object.entries(difficulties).forEach(([key, value]) => {
            const category = key.split('-')[0];
            if (!categoryScores[category]) {
                categoryScores[category] = [];
            }
            // Each subcategory contributes based on its actual value
            categoryScores[category].push(value);
        });

        // Calculate engagement score for each category
        const categoryEngagements = Object.entries(categoryScores).map(([_, values]) => {
            // Square root of (sum of squares / count) gives us a value that:
            // 1. Increases with both higher values and more subcategories
            // 2. Weights higher difficulties more heavily
            // 3. Naturally scales with the number of subcategories
            return Math.sqrt(
                values.reduce((sum, val) => sum + (val * val), 0) / values.length
            );
        });

        // Final score is the average engagement across categories
        const totalEngagement = categoryEngagements.reduce((sum, val) => sum + val, 0);
        const maxPossibleEngagement = 100; // Maximum possible per category
        const depthScore = (totalEngagement / (categoryEngagements.length * maxPossibleEngagement)) * 100;
        
        return Math.round(Math.max(1, Math.min(100, depthScore)));
    },

    getDifficultyTooltip(type) {
        if (type === 'intensity') {
            const score = this.calculateDifficultyIntensity();
            return `Difficulty Intensity: ${score}/100
            
Calculation: (Total difficulty points / Maximum possible points) × 100

Total points: ${Object.values(State.difficulties).reduce((sum, value) => sum + value, 0)}
Max possible: ${Object.keys(State.difficulties).length * 100}`;
        } else if (type === 'variation') {
            const score = this.calculateDifficultyVariation();
            return `Difficulty Depth: ${score}/100
            
Calculation: Average of category engagement scores, where each category's engagement is:
√(sum of squared difficulties / number of subcategories)

Higher scores indicate more categories are deeply engaged with higher difficulty ratings.
Lower scores indicate fewer engaged categories or lower difficulty ratings.`;
        }
        return '';
    },

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
