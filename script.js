// Initialize
document.addEventListener('DOMContentLoaded', () => {
    State.initialize();
    Controls.generate();
    WheelRenderer.renderWheel(categories);

    document.getElementById('gameName').addEventListener('input', () => {
        State.saveState();
        WheelRenderer.renderWheel(categories);
    });
    document.getElementById('gameContext').addEventListener('input', () => {
        State.saveState();
        WheelRenderer.renderWheel(categories);
    });
    
    // Reset button handler
    document.getElementById('resetBtn').addEventListener('click', () => {
        State.resetDifficulties();
        Controls.generate(); // Regenerate controls with reset values
        WheelRenderer.renderWheel(categories); // Re-render wheel with reset colors
    });
});
