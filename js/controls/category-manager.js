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

        document.getElementById('resetCategoriesBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset categories to their default values? This cannot be undone.')) {
                // Clear existing categories
                for (const key in categories) {
                    delete categories[key];
                }
                // Reset to default categories from categories.js
                const defaultCategories = {
                    Performance: {
                        color: 'rgb(24,144,255)',
                        description: 'Physical and Motor Skills',
                        subcategories: {
                            'Input Precision': 'Executing precise inputs and movements with high accuracy',
                            'Spatial Processing': 'Tracking and managing objects across different spatial layers',
                            'Visual Processing': 'Reading and interpreting visual game information quickly',
                            'Motor Control': 'Maintaining consistent physical control and precision',
                            'Reaction Processing': 'Responding quickly and accurately to game events'
                        }
                    },
                    Execution: {
                        color: 'rgb(82,196,26)',
                        description: 'Real-time Decision Making',
                        subcategories: {
                            'Real-time Decision Making': 'Making quick tactical choices in dynamic situations',
                            'Tactical Adaptation': 'Adjusting strategies based on immediate information',
                            'Priority Management': 'Managing multiple competing objectives effectively',
                            'Resource Management': 'Optimizing usage of limited game resources',
                            'Pattern Recognition & Response': 'Identifying and countering opponent patterns',
                            'Time/Attention Management': 'Balancing multiple gameplay aspects simultaneously',
                            'Threat Assessment': 'Evaluating and prioritizing different threats'
                        }
                    },
                    Comprehension: {
                        color: 'rgb(250,173,20)',
                        description: 'System Understanding',
                        subcategories: {
                            'System Mechanics Understanding': 'Comprehending core game mechanics and systems',
                            'Strategic Pattern Recognition': 'Understanding complex gameplay patterns',
                            'Position/State Evaluation': 'Assessing game states and positions',
                            'Optimal Approach Analysis': 'Determining best strategies and counters',
                            'Matchup Understanding': 'Knowledge of specific matchup dynamics',
                            'System Interaction Knowledge': 'Understanding how game elements interact'
                        }
                    },
                    Strategy: {
                        color: 'rgb(245,34,45)',
                        description: 'Long-term Planning',
                        subcategories: {
                            'Long-term Planning': 'Developing extended gameplay strategies',
                            'Resource Allocation': 'Planning resource usage over time',
                            'System Engagement Choices': 'Selecting which game systems to focus on',
                            'Risk/Reward Evaluation': 'Assessing long-term strategic choices',
                            'Meta-level Understanding': 'Comprehending high-level strategic implications',
                            'Time Investment Planning': 'Optimizing time allocation across activities',
                            'Risk Management': 'Managing strategic risks and alternatives'
                        }
                    },
                    Learning: {
                        color: 'rgb(114,46,209)',
                        description: 'Research and Analysis',
                        subcategories: {
                            'Systematic Testing': 'Methodically testing game mechanics',
                            'Data Collection Methods': 'Gathering and organizing game information',
                            'Theory Development': 'Creating new strategic approaches',
                            'Knowledge Validation': 'Verifying gameplay mechanics and theories',
                            'Tool Development': 'Creating and using analysis tools',
                            'Documentation Methods': 'Recording and sharing game knowledge',
                            'Research Planning': 'Organizing testing and research efforts'
                        }
                    },
                    Meta: {
                        color: 'rgb(99,89,236)',
                        description: 'Meta-game Adaptation',
                        subcategories: {
                            'Community Trend Analysis': 'Understanding evolving meta-game trends',
                            'Developer Pattern Recognition': 'Anticipating game changes and updates',
                            'System Evolution Prediction': 'Predicting future meta-game developments',
                            'Long-term Investment Planning': 'Preparing for future meta shifts',
                            'Meta Shift Preparation': 'Adapting to changing strategic landscapes'
                        }
                    },
                    Emotional: {
                        color: 'rgb(245,86,124)',
                        description: 'Mental Resilience',
                        subcategories: {
                            'Immediate Response Control': 'Managing reactions to game events',
                            'Performance Stability': 'Maintaining consistent performance',
                            'Confidence Management': 'Managing self-confidence and mindset',
                            'Emotional Resilience': 'Handling setbacks and challenges',
                            'Motivation Maintenance': 'Sustaining long-term motivation',
                            'Failure Processing': 'Learning from mistakes and losses',
                            'Social-emotional Response': 'Managing competitive social situations'
                        }
                    },
                    Social: {
                        color: 'rgb(250,84,28)',
                        description: 'Community Interaction',
                        subcategories: {
                            'Hierarchy Navigation': 'Working within community structures',
                            'Trust Building/Maintenance': 'Developing reliable relationships',
                            'Project Coordination': 'Managing group activities and events',
                            'Leadership/Followership': 'Functioning in team hierarchies',
                            'Social Norm Adaptation': 'Understanding community standards',
                            'Conflict Management': 'Resolving interpersonal issues',
                            'Reputation Management': 'Maintaining community standing',
                            'Team Communication': 'Coordinating with team members'
                        }
                    }
                };
                Object.assign(categories, defaultCategories);
                
                // Reset difficulties for all categories
                State.resetDifficulties();
                
                // Update UI
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
