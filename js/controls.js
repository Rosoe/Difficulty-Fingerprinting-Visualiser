const Controls = {
    generate() {
        ControlsGenerator.generate();
        CategoryManager.setupEventHandlers();
        this.setupToggleSubcategories();
    },

    setupToggleSubcategories() {
        const toggleBtn = document.getElementById('toggleSubcategoriesBtn');
        toggleBtn.textContent = State.showSubcategories ? 'Hide Subcategories' : 'Show Subcategories';
        
        toggleBtn.addEventListener('click', () => {
            State.showSubcategories = !State.showSubcategories;
            toggleBtn.textContent = State.showSubcategories ? 'Hide Subcategories' : 'Show Subcategories';
            State.saveState();
            WheelRenderer.render();
        });
    }
};
