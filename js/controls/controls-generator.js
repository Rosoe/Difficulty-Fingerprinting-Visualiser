const ControlsGenerator = {
    generate() {
        const controlsContainer = document.getElementById('difficultyControls');
        controlsContainer.innerHTML = ''; // Clear existing controls
        
        // First get the categories data
        const categoriesData = Object.entries(categories);
        // Then process each category
        categoriesData.forEach(([category, { description, subcategories, color }]) => {
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

            // Get subcategories data
            const subcategoriesData = Object.entries(subcategories);
            // Process each subcategory
            subcategoriesData.forEach(([sub, values]) => {
                // Handle both string and array values
                const description = typeof values === 'string' ? values : values[0];
                const thirdValue = Array.isArray(values) ? values[1] : '';
                const subDiv = document.createElement('div');
                subDiv.className = 'subcategory';

                const subTitle = document.createElement('label');
                subTitle.className = 'subcategory-title';
                subTitle.textContent = sub;

                const subDesc = document.createElement('p');
                subDesc.className = 'subcategory-description';
                subDesc.textContent = description;
                
                const thirdField = document.createElement('p');
                thirdField.className = 'subcategory-third-value';
                thirdField.textContent = thirdValue;

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

                const feedback = document.createElement('div');
                feedback.className = 'difficulty-feedback';

                const updateSliderVisuals = (sliderEl, val) => {
                    const percent = ((val - sliderEl.min) / (sliderEl.max - sliderEl.min)) * 100;
                    let color, glowColor, feedbackText;

                    if (val <= 10) {
                        color = '#6b7280';
                        glowColor = 'rgba(107, 114, 128, 0.2)';
                        feedbackText = 'Player is not tested or is minimally tested in this area.';
                    } else if (val <= 40) {
                        color = '#4f46e5';
                        glowColor = 'rgba(79, 70, 229, 0.2)';
                        feedbackText = 'Player is tested but not challenged in this area.';
                    } else if (val <= 60) {
                        color = '#22c55e';
                        glowColor = 'rgba(34, 197, 94, 0.3)';
                        feedbackText = 'Player is challenged within the capabilities of the average person in this area.';
                    } else if (val <= 89) {
                        color = '#f97316';
                        glowColor = 'rgba(249, 115, 22, 0.3)';
                        feedbackText = 'Player challenge exceeds the average capabilities in this area.';
                    } else {
                        color = '#ef4444';
                        glowColor = 'rgba(239, 68, 68, 0.4)';
                        feedbackText = 'Players tested to the limits of human performance in this area!';
                    }

                    sliderEl.style.setProperty('--thumb-color', color);
                    sliderEl.style.setProperty('--slider-glow', glowColor);
                    sliderEl.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)`;
                    feedback.textContent = feedbackText;
                    feedback.style.color = color;
                };

                // Initial update
                updateSliderVisuals(slider, slider.value);

                slider.addEventListener('input', (e) => {
                    const val = Number(e.target.value);
                    State.difficulties[`${category}-${sub}`] = val;
                    value.textContent = `${val}/100`;
                    updateSliderVisuals(e.target, val);
                    WheelRenderer.renderWheel(categories);
                    State.saveState();
                });

                subDiv.appendChild(subTitle);
                subDiv.appendChild(subDesc);
                subDiv.appendChild(thirdField);
                subDiv.appendChild(slider);
                subDiv.appendChild(value);
                subDiv.appendChild(feedback);
                categoryDiv.appendChild(subDiv);
            });

            controlsContainer.appendChild(categoryDiv);
        });
    }
};
