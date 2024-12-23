# Game Difficulty Fingerprinting Application

A simple web-based tool for creating comprehensive difficulty analysis visualizations for games. This application helps game developers, designers, and researchers analyze and document the various dimensions of difficulty in games using an interactive wheel-based visualization system. You can download the files and run it locally or try it out here: https://rosoe.xyz/difficulty-wheel/index.html

## Overview

The Difficulty Fingerprinting Application allows users to create detailed "fingerprints" of a game's difficulty across multiple dimensions. Using a dynamic wheel visualization, users can assess and document how challenging different aspects of a game are, from physical performance requirements to emotional resilience needs.

## Features

- **Interactive Wheel Visualization**: Dynamic SVG-based wheel that visualizes difficulty across multiple categories
- **Category Management**: Add, edit, and remove difficulty categories
- **Export Capabilities**: 
  - Export visualizations as PDF
  - Export/Import category configurations
  - Export/Import difficulty values
- **Customizable Game Profiles**: Save and load different game difficulty profiles
- **Reset Functionality**: Quickly reset values to start a new analysis

## How to Use

1. Open `index.html` in a web browser
2. Enter your game's name in the input field
3. Use the sliders to adjust difficulty levels for each category and subcategory
4. Export your analysis as a PDF using the "Export as PDF" button
5. Use the Categories dropdown to manage categories or import/export configurations

## Technical Details

The application is built using:
- HTML5
- CSS3
- Vanilla JavaScript
- SVG for wheel visualization
- jsPDF for PDF export functionality

## File Structure

```
├── index.html              # Main application file
├── categories.js          # Category definitions
├── script.js             # Main JavaScript file
├── css/                  # Stylesheet directory
│   ├── base.css         # Base styles
│   ├── controls.css     # Control panel styles
│   ├── layout.css       # Layout styles
│   ├── main.css         # Main styles
│   ├── slider.css       # Slider component styles
│   └── wheel.css        # Wheel visualization styles
└── js/                  # JavaScript directory
    ├── controls/        # Control panel components
    │   ├── category-manager.js
    │   ├── controls-generator.js
    │   ├── modal-manager.js
    │   └── pdf-exporter.js
    ├── wheel/           # Wheel visualization components
    │   ├── category-renderer.js
    │   ├── center-renderer.js
    │   ├── subcategory-renderer.js
    │   └── wheel-svg.js
    ├── controls.js      # Control panel logic
    ├── state.js         # Application state management
    ├── utils.js         # Utility functions
    └── wheel-renderer.js # Main wheel rendering logic
```

## License

This project is licensed under the terms included in the LICENSE file.
