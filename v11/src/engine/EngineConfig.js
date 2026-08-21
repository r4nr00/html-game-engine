export const EngineConfig = { 
    renderer: {
        canvasMargin: 25,
        scaleMode: 'fit',    
    },
    input: {
        preventKeys: ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
        deadzone: 0.2,  // higher number means joystick needs to move further before movement registers    
    },
};