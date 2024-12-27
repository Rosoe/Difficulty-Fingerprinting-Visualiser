const ControlsGenerator = {
    generate() {
        const controlsContainer = document.getElementById('difficultyControls');
        controlsContainer.innerHTML = ''; // Clear existing controls
        
        Object.entries(categories).forEach(([category, { description, subcategories, color }]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            categoryDiv.style.borderLeft = `4px solid ${color}`;

            const title = document.createElement('h3');
            title.className = 'category-title';
            title.textContent = category;
            title.style.color = color;

            const desc = document.createElement('p');
            desc.className = 'category-description';
            desc.textContent = description;

            categoryDiv.appendChild(title);
            categoryDiv.appendChild(desc);

            Object.entries(subcategories).forEach(([sub, desc]) => {
                const subDiv = document.createElement('div');
                subDiv.className = 'subcategory';

                const subTitle = document.createElement('label');
                subTitle.className = 'subcategory-title';
                subTitle.textContent = sub;

                const subDesc = document.createElement('p');
                subDesc.className = 'subcategory-description';
                subDesc.textContent = desc;

                const slider = document.createElement('input');
                slider.type = 'range';
                slider.min = '1';
                slider.max = '100';
                slider.value = State.difficulties[`${category}-${sub}`] || 1;
                slider.className = 'difficulty-slider';

                const percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
                slider.style.background = `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)`;

                const value = document.createElement('span');
                value.className = 'difficulty-value';
                value.textContent = `${slider.value}/100`;

                slider.addEventListener('input', (e) => {
                    State.difficulties[`${category}-${sub}`] = Number(e.target.value);
                    value.textContent = `${e.target.value}/100`;
                    const percent = ((e.target.value - e.target.min) / (e.target.max - e.target.min)) * 100;
                    e.target.style.background = `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)`;
                    WheelRenderer.renderWheel(categories);  // Changed from render() to renderWheel()
                    State.saveState();
                });

                subDiv.appendChild(subTitle);
                subDiv.appendChild(subDesc);
                subDiv.appendChild(slider);
                subDiv.appendChild(value);
                categoryDiv.appendChild(subDiv);
            });

            controlsContainer.appendChild(categoryDiv);
        });
    }
};
