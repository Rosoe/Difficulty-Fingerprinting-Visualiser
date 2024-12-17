const ModalManager = {
    show(action, onSave) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('categoryModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'categoryModal';
            modal.className = 'modal';
            document.body.appendChild(modal);
        }

        const title = action === 'add' ? 'Add Category' :
                     action === 'edit' ? 'Edit Category' :
                     'Remove Category';

        modal.innerHTML = this.getModalContent(action, title);
        modal.style.display = 'block';

        // Setup modal event handlers
        const closeModal = () => {
            modal.style.display = 'none';
        };

        modal.querySelector('.close-modal').onclick = closeModal;
        modal.querySelector('.cancel-modal').onclick = closeModal;

        if (action === 'add' || action === 'edit') {
            this.setupSubcategoryHandlers(modal);
        }

        const actionButton = modal.querySelector('#saveCategory, #removeCategory');
        if (actionButton) {
            actionButton.onclick = () => {
                if (onSave(modal)) {
                    closeModal();
                }
            };
        }

        if (action === 'edit') {
            this.setupEditHandlers(modal);
        }
    },

    getModalContent(action, title) {
        if (action === 'add') {
            return this.getAddModalContent(title);
        } else if (action === 'edit') {
            return this.getEditModalContent(title);
        } else {
            return this.getRemoveModalContent(title);
        }
    },

    getAddModalContent(title) {
        return `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-header">
                    <h2>${title}</h2>
                </div>
                <div class="modal-body">
                    <div>
                        <label>Category Name:</label>
                        <input type="text" id="categoryName" class="modal-input" placeholder="Enter category name">
                    </div>
                    <div>
                        <label>Description:</label>
                        <input type="text" id="categoryDesc" class="modal-input" placeholder="Enter category description">
                    </div>
                    <div>
                        <label>Color:</label>
                        <input type="color" id="categoryColor" class="modal-input" value="#4f46e5">
                    </div>
                    <div id="subcategoriesContainer">
                        <label>Subcategories:</label>
                        <button id="addSubcategoryBtn" class="action-button">Add Subcategory</button>
                        <div id="subcategoryList"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="saveCategory" class="action-button">Save</button>
                    <button class="cancel-modal">Cancel</button>
                </div>
            </div>
        `;
    },

    getEditModalContent(title) {
        return `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-header">
                    <h2>${title}</h2>
                </div>
                <div class="modal-body">
                    <div>
                        <label>Select Category:</label>
                        <select id="categorySelect" class="modal-input">
                            ${Object.keys(categories).map(cat => 
                                `<option value="${cat}">${cat}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div>
                        <label>Description:</label>
                        <input type="text" id="categoryDesc" class="modal-input" placeholder="Enter category description">
                    </div>
                    <div>
                        <label>Color:</label>
                        <input type="color" id="categoryColor" class="modal-input">
                    </div>
                    <div id="subcategoriesContainer">
                        <label>Subcategories:</label>
                        <button id="addSubcategoryBtn" class="action-button">Add Subcategory</button>
                        <div id="subcategoryList"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="saveCategory" class="action-button">Save Changes</button>
                    <button class="cancel-modal">Cancel</button>
                </div>
            </div>
        `;
    },

    getRemoveModalContent(title) {
        return `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-header">
                    <h2>${title}</h2>
                </div>
                <div class="modal-body">
                    <div>
                        <label>Select Category to Remove:</label>
                        <select id="categorySelect" class="modal-input">
                            ${Object.keys(categories).map(cat => 
                                `<option value="${cat}">${cat}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="removeCategory" class="action-button">Remove Category</button>
                    <button class="cancel-modal">Cancel</button>
                </div>
            </div>
        `;
    },

    setupSubcategoryHandlers(modal) {
        const addSubcategoryBtn = modal.querySelector('#addSubcategoryBtn');
        const subcategoryList = modal.querySelector('#subcategoryList');
        
        if (addSubcategoryBtn && subcategoryList) {
            addSubcategoryBtn.onclick = () => {
                const subDiv = document.createElement('div');
                subDiv.innerHTML = `
                    <input type="text" placeholder="Subcategory name" class="subcategory-name">
                    <input type="text" placeholder="Description" class="subcategory-desc">
                    <button class="remove-subcategory">Remove</button>
                `;
                subcategoryList.appendChild(subDiv);
            };

            // Add initial subcategory field for new categories
            if (!subcategoryList.children.length) {
                addSubcategoryBtn.click();
            }

            subcategoryList.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-subcategory')) {
                    if (subcategoryList.children.length > 1) {
                        e.target.parentElement.remove();
                    } else {
                        alert('Category must have at least one subcategory.');
                    }
                }
            });
        }
    },

    setupEditHandlers(modal) {
        const categorySelect = modal.querySelector('#categorySelect');
        const categoryDesc = modal.querySelector('#categoryDesc');
        const categoryColor = modal.querySelector('#categoryColor');
        const subcategoryList = modal.querySelector('#subcategoryList');

        if (categorySelect && categoryDesc && categoryColor && subcategoryList) {
            const loadCategoryData = () => {
                const category = categories[categorySelect.value];
                categoryDesc.value = category.description;
                categoryColor.value = category.color;
                
                subcategoryList.innerHTML = '';
                Object.entries(category.subcategories).forEach(([name, desc]) => {
                    const subDiv = document.createElement('div');
                    subDiv.innerHTML = `
                        <input type="text" value="${name}" class="subcategory-name">
                        <input type="text" value="${desc}" class="subcategory-desc">
                        <button class="remove-subcategory">Remove</button>
                    `;
                    subcategoryList.appendChild(subDiv);
                });
            };

            categorySelect.onchange = loadCategoryData;
            loadCategoryData();
        }
    }
};
