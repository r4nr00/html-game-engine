////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Gamepad.js:
// This module reads the gamepad state. It converts buttons into IDs like Gamepad:0:B0 (Player 1, Button 0) 
// and converts analog sticks into directional IDs like Gamepad:0:A0:- (Player 1, Left Stick, Negative/Left 
// direction).
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Can add getAxisValue() method in the future. this allows for things like different speeds depending 
// on how far you push the controller joystick.


export class Gamepad {
    constructor(deadzone = 0.2) {
        this.deadzone = deadzone;
        this.inputs = new Set();
        this.axes = new Map(); // Store raw analog values for advanced usage
    }

    // This MUST be called every frame to get the latest hardware state
    update() {
        this.axes.clear();
        this.inputs.clear();
        
        // Get all connected controllers
        const pads = navigator.getGamepads ? navigator.getGamepads() : [];

        for (let i = 0; i < pads.length; i++) {
            const pad = pads[i];
            if (!pad) continue;

            // Map Buttons
            pad.buttons.forEach((btn, btnIdx) => {
                if (btn.pressed) {
                    this.inputs.add(`Gamepad:${i}:B${btnIdx}`);
                }
            });

            // Map Axes (Thumbsticks) over a deadzone
            // A0 = Left Stick X, A1 = Left Stick Y, A2 = Right Stick X, A3 = Right Stick Y
            pad.axes.forEach((axisVal, axisIdx) => {
                this.axes.set(`Gamepad:${i}:A${axisIdx}`, axisVal);

                if (axisVal < -this.deadzone) {
                    this.inputs.add(`Gamepad:${i}:A${axisIdx}:-`); // Left / Up
                }
                if (axisVal > this.deadzone) {
                    this.inputs.add(`Gamepad:${i}:A${axisIdx}:+`); // Right / Down
                }
            });
        }
    }
}