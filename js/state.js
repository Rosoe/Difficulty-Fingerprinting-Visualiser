const State = {
    difficulties: {},

    initialize() {
        // Try to load saved state
        const savedState = localStorage.getItem('wheelState');
        const savedCategories = localStorage.getItem('wheelCategories');
        
        if (savedState && savedCategories) {
            this.difficulties = JSON.parse(savedState);
            Object.assign(categories, JSON.parse(savedCategories));
        } else {
            // Initialize with default values
            this.resetDifficulties();
        }
    },

    resetDifficulties() {
        // Reset difficulties
        this.difficulties = {};
        Object.entries(categories).forEach(([category, { subcategories }]) => {
            Object.keys(subcategories).forEach(sub => {
                this.difficulties[`${category}-${sub}`] = 1;
            });
        });

        // Reset categories to original state
        fetch('backup/categories.js')
            .then(response => response.text())
            .then(text => {
                // Extract the object literal from the file content
                const objectLiteral = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
                // Parse and assign the original categories
                Object.assign(categories, JSON.parse(objectLiteral));
                // Save state and trigger re-renders after categories are updated
                this.saveState();
                ControlsGenerator.generate();
                WheelRenderer.render();
            });
    },

    saveState() {
        localStorage.setItem('wheelState', JSON.stringify(this.difficulties));
        localStorage.setItem('wheelCategories', JSON.stringify(categories));
    },

    getCategoryOpacity(category) {
        const subRatings = Object.entries(this.difficulties)
            .filter(([key]) => key.startsWith(category))
            .map(([, value]) => value);
        return (subRatings.reduce((a, b) => a + b, 0) / subRatings.length) / 10;
    },

    updateCategory(categoryName, categoryData) {
        // Remove old difficulty values for this category
        Object.keys(this.difficulties).forEach(key => {
            if (key.startsWith(`${categoryName}-`)) {
                delete this.difficulties[key];
            }
        });

        // Initialize new difficulty values
        Object.keys(categoryData.subcategories).forEach(sub => {
            this.difficulties[`${categoryName}-${sub}`] = 1;
        });

        this.saveState();
    },

    removeCategory(categoryName) {
        // Remove difficulty values for this category
        Object.keys(this.difficulties).forEach(key => {
            if (key.startsWith(`${categoryName}-`)) {
                delete this.difficulties[key];
            }
        });

        this.saveState();
    },

    exportData() {
        return {
            categories: categories,
            difficulties: this.difficulties,
            timestamp: new Date().toISOString(),
            gameName: document.getElementById('gameName').value
        };
    },

    importData(data) {
        if (data.categories && data.difficulties) {
            Object.assign(categories, data.categories);
            this.difficulties = data.difficulties;
            if (data.gameName) {
                document.getElementById('gameName').value = data.gameName;
            }
            this.saveState();
            ControlsGenerator.generate();
            WheelRenderer.render();
            return true;
        }
        return false;
    }
};
