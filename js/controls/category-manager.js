const CategoryManager = {
    setupEventHandlers() {
        document.getElementById('addCategoryBtn').addEventListener('click', () => {
            ModalManager.show('add', (modal) => this.handleAddCategory(modal));
        });

        document.getElementById('editCategoryBtn').addEventListener('click', () => {
            if (Object.keys(categories).length === 0) {
                alert('No categories available to edit.');
                return;
            }
            ModalManager.show('edit', (modal) => this.handleEditCategory(modal));
        });

        document.getElementById('removeCategoryBtn').addEventListener('click', () => {
            if (Object.keys(categories).length === 0) {
                alert('No categories available to remove.');
                return;
            }
            ModalManager.show('remove', (modal) => this.handleRemoveCategory(modal));
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all difficulty values? This cannot be undone.')) {
                State.resetDifficulties();
                ControlsGenerator.generate();
                WheelRenderer.render();
            }
        });

        document.getElementById('exportPdfBtn').addEventListener('click', () => {
            PDFExporter.export();
        });

        document.getElementById('exportCategoriesBtn').addEventListener('click', () => {
            this.exportCategories();
        });

        document.getElementById('importCategoriesBtn').addEventListener('click', () => {
            this.importCategories();
        });

        document.getElementById('exportValuesBtn').addEventListener('click', () => {
            this.exportValues();
        });

        document.getElementById('importValuesBtn').addEventListener('click', () => {
            this.importValues();
        });
    },

    handleAddCategory(modal) {
        const name = modal.querySelector('#categoryName').value.trim();
        const desc = modal.querySelector('#categoryDesc').value.trim();
        const color = modal.querySelector('#categoryColor').value;
        
        const subcategories = {};
        modal.querySelectorAll('#subcategoryList > div').forEach(div => {
            const subName = div.querySelector('.subcategory-name').value.trim();
            const subDesc = div.querySelector('.subcategory-desc').value.trim();
            if (subName && subDesc) {
                subcategories[subName] = subDesc;
            }
        });

        if (!name) {
            alert('Please enter a category name.');
            return false;
        }
        if (!desc) {
            alert('Please enter a category description.');
            return false;
        }
        if (Object.keys(subcategories).length === 0) {
            alert('Please add at least one subcategory.');
            return false;
        }
        if (categories[name]) {
            alert('A category with this name already exists.');
            return false;
        }

        categories[name] = {
            color: color,
            description: desc,
            subcategories: subcategories
        };
        State.updateCategory(name, categories[name]);
        ControlsGenerator.generate();
        WheelRenderer.render();
        return true;
    },

    handleEditCategory(modal) {
        const name = modal.querySelector('#categorySelect').value;
        const desc = modal.querySelector('#categoryDesc').value.trim();
        const color = modal.querySelector('#categoryColor').value;
        
        const subcategories = {};
        modal.querySelectorAll('#subcategoryList > div').forEach(div => {
            const subName = div.querySelector('.subcategory-name').value.trim();
            const subDesc = div.querySelector('.subcategory-desc').value.trim();
            if (subName && subDesc) {
                subcategories[subName] = subDesc;
            }
        });

        if (!desc) {
            alert('Please enter a category description.');
            return false;
        }
        if (Object.keys(subcategories).length === 0) {
            alert('Please add at least one subcategory.');
            return false;
        }

        categories[name] = {
            color: color,
            description: desc,
            subcategories: subcategories
        };
        State.updateCategory(name, categories[name]);
        ControlsGenerator.generate();
        WheelRenderer.render();
        return true;
    },

    handleRemoveCategory(modal) {
        const name = modal.querySelector('#categorySelect').value;
        if (Object.keys(categories).length <= 1) {
            alert('Cannot remove the last category. At least one category is required.');
            return false;
        }
        if (confirm(`Are you sure you want to remove the category "${name}"? This cannot be undone.`)) {
            delete categories[name];
            State.removeCategory(name);
            ControlsGenerator.generate();
            WheelRenderer.render();
            return true;
        }
        return false;
    },

    exportCategories() {
        const categoriesJson = JSON.stringify(categories, null, 2);
        const blob = new Blob([categoriesJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'difficulty-wheel-categories.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    importCategories() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = event => {
                try {
                    const importedCategories = JSON.parse(event.target.result);
                    
                    // Validate the imported data structure
                    for (const [name, category] of Object.entries(importedCategories)) {
                        if (!category.color || !category.description || !category.subcategories || 
                            typeof category.subcategories !== 'object' || 
                            Object.keys(category.subcategories).length === 0) {
                            throw new Error(`Invalid category structure for "${name}"`);
                        }
                    }
                    
                    // Clear existing categories and difficulties
                    for (const key in categories) {
                        delete categories[key];
                    }
                    State.difficulties = {};
                    
                    // Add new categories
                    Object.assign(categories, importedCategories);
                    
                    // Initialize difficulties for new categories
                    Object.keys(importedCategories).forEach(name => {
                        State.updateCategory(name, importedCategories[name]);
                    });
                    
                    // Save state and update UI
                    State.saveState();
                    ControlsGenerator.generate();
                    WheelRenderer.render();
                    
                    alert('Categories imported successfully!');
                } catch (error) {
                    alert('Error importing categories: ' + error.message);
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    },

    exportValues() {
        const data = State.exportData();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'difficulty-wheel-values.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    importValues() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = event => {
                try {
                    const data = JSON.parse(event.target.result);
                    if (State.importData(data)) {
                        alert('Values imported successfully!');
                    } else {
                        throw new Error('Invalid data format');
                    }
                } catch (error) {
                    alert('Error importing values: ' + error.message);
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    }
};
