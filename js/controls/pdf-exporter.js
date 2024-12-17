const PDFExporter = {
    async export() {
        try {
            const svg = document.getElementById('wheel');
            const serializer = new XMLSerializer();
            const svgStr = serializer.serializeToString(svg);
            
            // Create high-resolution canvas
            const canvas = document.createElement('canvas');
            canvas.width = 2400; // Increased resolution for better quality
            canvas.height = 2400;
            const ctx = canvas.getContext('2d');
            
            // Create image from SVG
            const img = new Image();
            const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);
            
            img.onload = () => {
                try {
                    // Draw white background and SVG
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    
                    // Create PDF
                    const pdf = new jsPDF();
                    const gameName = document.getElementById('gameName').value || 'Game Difficulty Wheel';
                    
                    // Add title to first page
                    pdf.setFontSize(16);
                    pdf.text(gameName, 105, 15, { align: 'center' });
                    
                    // Add wheel image with better quality
                    pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 10, 20, 190, 190);
                    
                    // Add difficulty ratings with page breaks
                    let y = 220;
                    const pageHeight = pdf.internal.pageSize.height;
                    const margin = 20;
                    
                    pdf.setFontSize(12);
                    Object.entries(categories).forEach(([category, data]) => {
                        // Check if we need a new page
                        if (y > pageHeight - margin) {
                            pdf.addPage();
                            y = margin;
                        }
                        
                        // Add category header and description
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold');
                        pdf.text(category, 20, y);
                        y += 7;
                        
                        pdf.setFontSize(10);
                        pdf.setFont(undefined, 'italic');
                        pdf.text(data.description, 20, y);
                        y += 12;
                        
                        // Add subcategories
                        pdf.setFont(undefined, 'normal');
                        Object.entries(data.subcategories).forEach(([sub, descriptor]) => {
                            // Check if we need a new page
                            if (y > pageHeight - margin) {
                                pdf.addPage();
                                y = margin;
                            }
                            
                            const rating = State.difficulties[`${category}-${sub}`] || 1;
                            
                            // Add subcategory name and rating
                            pdf.setFont(undefined, 'bold');
                            pdf.text(`${sub}: ${rating}/10`, 30, y);
                            y += 7;
                            
                            // Add subcategory descriptor
                            pdf.setFont(undefined, 'normal');
                            const splitDescriptor = pdf.splitTextToSize(descriptor, 150);
                            splitDescriptor.forEach(line => {
                                if (y > pageHeight - margin) {
                                    pdf.addPage();
                                    y = margin;
                                }
                                pdf.text(line, 40, y);
                                y += 7;
                            });
                            
                            y += 5; // Add space after each subcategory
                        });
                        
                        y += 10; // Add space between categories
                    });
                    
                    // Save PDF
                    const fileName = `${gameName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-difficulty.pdf`;
                    pdf.save(fileName);
                    
                    // Cleanup
                    URL.revokeObjectURL(url);
                } catch (err) {
                    console.error('Error generating PDF:', err);
                    alert('Error generating PDF. Please try again.');
                }
            };
            
            img.onerror = () => {
                console.error('Error loading SVG image');
                alert('Error generating PDF. Please try again.');
            };
            
            img.src = url;
        } catch (err) {
            console.error('Error exporting PDF:', err);
            alert('Error generating PDF. Please try again.');
        }
    }
};
