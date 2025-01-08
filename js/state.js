const State = {
    difficulties: {},
    showSubcategories: true, // Track subcategory visibility
    gameTitle: '', // Store game title
    gameContext: '', // Store game context

    initialize() {
        // Try to load saved state
        const savedState = localStorage.getItem('wheelState');
        const savedCategories = localStorage.getItem('wheelCategories');
        const savedVisibility = localStorage.getItem('wheelSubcategoryVisibility');
        const savedGameTitle = localStorage.getItem('wheelGameTitle');
        const savedGameContext = localStorage.getItem('wheelGameContext');
        
        if (savedState && savedCategories) {
            // Load game title and context if they exist
            if (savedGameTitle) {
                this.gameTitle = savedGameTitle;
                document.getElementById('gameName').value = savedGameTitle;
            }
            if (savedGameContext) {
                this.gameContext = savedGameContext;
                document.getElementById('gameContext').value = savedGameContext;
            }
            this.difficulties = JSON.parse(savedState);
            Object.assign(categories, JSON.parse(savedCategories));
            this.showSubcategories = savedVisibility ? JSON.parse(savedVisibility) : true;
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

        // Reset categories to original state by using the global categories object
        // which is already loaded via the script tag
        this.saveState();
        ControlsGenerator.generate();
        WheelRenderer.render();
    },

    saveState() {
        localStorage.setItem('wheelState', JSON.stringify(this.difficulties));
        localStorage.setItem('wheelCategories', JSON.stringify(categories));
        localStorage.setItem('wheelSubcategoryVisibility', JSON.stringify(this.showSubcategories));
        
        // Save game title and context
        const gameTitle = document.getElementById('gameName').value;
        const gameContext = document.getElementById('gameContext').value;
        this.gameTitle = gameTitle;
        this.gameContext = gameContext;
        localStorage.setItem('wheelGameTitle', gameTitle);
        localStorage.setItem('wheelGameContext', gameContext);
    },

    getCategoryOpacity(category) {
        // Get this category's raw opacity from its subcategories
        const subRatings = Object.entries(this.difficulties)
            .filter(([key]) => key.startsWith(category))
            .map(([, value]) => value);
        const rawOpacity = (subRatings.reduce((a, b) => a + b, 0) / subRatings.length) / 100;
        
        // Get all categories' raw opacities
        const allOpacities = Object.keys(categories).map(cat => {
            const ratings = Object.entries(this.difficulties)
                .filter(([key]) => key.startsWith(cat))
                .map(([, value]) => value);
            return (ratings.reduce((a, b) => a + b, 0) / ratings.length) / 100;
        });
        
        // Find the maximum opacity
        const maxOpacity = Math.max(...allOpacities);
        
        // If no categories have any opacity, return the raw value
        if (maxOpacity === 0) return rawOpacity;
        
        // Otherwise, scale the opacity relative to the maximum
        return rawOpacity / maxOpacity;
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
            gameName: document.getElementById('gameName').value,
            gameContext: document.getElementById('gameContext').value
        };
    },

    importData(data) {
        if (data.categories && data.difficulties) {
            Object.assign(categories, data.categories);
            this.difficulties = data.difficulties;
            if (data.gameName) {
                document.getElementById('gameName').value = data.gameName;
                this.gameTitle = data.gameName;
            }
            if (data.gameContext) {
                document.getElementById('gameContext').value = data.gameContext;
                this.gameContext = data.gameContext;
            }
            this.saveState();
            ControlsGenerator.generate();
            WheelRenderer.render();
            return true;
        }
        return false;
    },

    isDefaultCategory(category) {
        // Check if all subcategories for this category are at their default value of 1
        return Object.entries(this.difficulties)
            .filter(([key]) => key.startsWith(category + '-'))
            .every(([, value]) => value === 1);
    }
};
