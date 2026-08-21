////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Input.js:
// Instantiates the device modules, collects their current raw state every frame, 
// and calculates frame-edge states (pressed and released) across all hardware.
////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { Keyboard } from './devices/Keyboard.js';
import { Mouse } from './devices/Mouse.js';
import { Gamepad } from './devices/Gamepad.js';
import { Touch } from './devices/Touch.js';

export class Input {
    constructor({ canvas, preventKeys, deadzone, gameWidth, gameHeight } = {}) {
        this.keyboard = new Keyboard(preventKeys);
        this.mouse = new Mouse(canvas, gameWidth, gameHeight);
        this.gamepad = new Gamepad(deadzone);
        this.touch = new Touch(canvas);

        this.current = new Set();
        this.previous = new Set();
        this.pressed = new Set();
        this.released = new Set();
    }

    update() {
        // Poll gamepad hardware BEFORE aggregating inputs
        this.gamepad.update();

        this.pressed.clear();
        this.released.clear();
        this.current.clear();

        // 1. Gather all inputs from all devices
        for (const code of this.keyboard.keys) this.current.add(`Key:${code}`);
        for (const btn of this.mouse.buttons) this.current.add(`Mouse:${btn}`);
        for (const input of this.gamepad.inputs) this.current.add(input);
        for (const input of this.touch.inputs) this.current.add(input);

        // 2. Compute edge states
        for (const input of this.current) {
            if (!this.previous.has(input)) this.pressed.add(input);
        }

        for (const input of this.previous) {
            if (!this.current.has(input)) this.released.add(input);
        }

        this.previous = new Set(this.current);
    }

    isDown(id) { return this.current.has(id); }
    wasPressed(id) { return this.pressed.has(id); }
    wasReleased(id) { return this.released.has(id); }
}
















// import { Keyboard } from './Inputs/Keyboard.js';
// import { Mouse } from './Inputs/Mouse.js';

// export class Input {
//     constructor({ canvas, preventKeys } = {}) {
//         this.keyboard = new Keyboard(preventKeys);
//         this.mouse = new Mouse(canvas);

//         this.current = new Set();
//         this.previous = new Set();
//         this.pressed = new Set();
//         this.released = new Set();
//     }

//     update() {
//         this.pressed.clear();
//         this.released.clear();
//         this.current.clear();

//         // 1. Gather keys from Keyboard module
//         for (const code of this.keyboard.keys) {
//             this.current.add(`Key:${code}`);
//         }

//         // 2. Gather buttons from Mouse module
//         for (const button of this.mouse.buttons) {
//             this.current.add(`Mouse:${button}`);
//         }

//         // 3. Compute edge states (pressed / released)
//         for (const input of this.current) {
//             if (!this.previous.has(input)) {
//                 this.pressed.add(input);
//             }
//         }

//         for (const input of this.previous) {
//             if (!this.current.has(input)) {
//                 this.released.add(input);
//             }
//         }

//         this.previous = new Set(this.current);
//     }

//     // Direct hardware queries
//     isDown(id) { return this.current.has(id); }
//     wasPressed(id) { return this.pressed.has(id); }
//     wasReleased(id) { return this.released.has(id); }
// }







// // Should consume device modules state (i.e., Keyboard.js, Mouse.js, Gamepad.js, Touch.js)
// // This is then used with Controls.js

// export class InputHandler {
//     constructor() {
//         this.current = new Set();  // keys down this frame
//         this.previous = new Set(); // keys down last frame
//         this.pressed = new Set();  // edge: went down this frame
//         this.released = new Set(); // edge: went up this frame
//         this.lastPressed;

//         // Keys that shouldn't trigger default browser actions (like scrolling)
//         this.preventKeys = new Set(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

//         window.addEventListener('keydown', e => {
//             // Stop the browser from scrolling if it's a game key
//             if (this.preventKeys.has(e.code)) {
//                 e.preventDefault();
//             }

//             if (!e.repeat) {
//                 this.current.add(e.code);
//                 this.lastPressed = e.code;
//             }
//         });

//         window.addEventListener('keyup', e => {
//             this.current.delete(e.code);
//             // if (this.lastPressed === e.code) this.lastPressed = null;
//         });

//         // Prevent "sticky keys" by clearing inputs if the window loses focus
//         window.addEventListener('blur', () => {
//             this.current.clear();
//             this.lastPressed = null;
//             // clearing this.previous at the same time means it silently cancels input.
//             // otherwise, the next frame will show the key as released which will trigger the release logic.
//             this.previous.clear();
//         });

//         // Clear all keys when context menu opens (i.e., right click)
//         window.addEventListener('contextmenu', () => {
//             this.current.clear();
//             this.lastPressed = null;
//             // clearing this.previous at the same time means it silently cancels input.
//             // otherwise, the next frame will show the key as released which will trigger the release logic.
//             this.previous.clear();
//         });
//     }

//     update() {
//         this.pressed.clear();
//         this.released.clear();

//         // check new presses
//         for (const key of this.current) {
//             if (!this.previous.has(key)) {
//                 this.pressed.add(key);
//             }
//         }

//         // check releases
//         for (const key of this.previous) {
//             if (!this.current.has(key)) {
//                 this.released.add(key);
//             }
//         }

//         // set up for next frame
//         this.previous = new Set(this.current);
//     }

//     isDown(code) {
//         return this.current.has(code);
//     }

//     wasPressed(code) {
//         return this.pressed.has(code);
//     }

//     wasReleased(code) {
//         return this.released.has(code);
//     }
// }




















// // Gemini Input updates

// This is a really solid, clean foundation for a game input handler. Using Set is the perfect data structure for this, and your frame-by-frame edge detection (pressed vs released) in the update() loop is spot on.
// There are just a couple of standard game-dev edge cases you'll likely want to patch before this goes into production. Here is the updated code with three main improvements:
// Preventing Default Browser Behavior: If your game uses the Spacebar or Arrow Keys, hitting them will scroll the web page. We need to catch those specific keys and call e.preventDefault().
// Handling Window Blur (Sticky Keys): If a player is holding the "W" key and clicks onto another monitor (or Alt-Tabs), the keyup event will never fire in the browser. When they click back, the game will think "W" is still held down forever. Clearing the current set on the blur event fixes this.
// Cleaning up lastPressed: I uncommented and fixed your lastPressed logic. It's now safely cleared if that specific key is released.
// Here is the enhanced version:


// export class InputHandler {
//     constructor() {
//         this.current = new Set();  // keys down this frame
//         this.previous = new Set(); // keys down last frame
//         this.pressed = new Set();  // edge: went down this frame
//         this.released = new Set(); // edge: went up this frame
//         this.lastPressed = null;

//         // Keys that shouldn't trigger default browser actions (like scrolling)
//         this.preventKeys = new Set(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

//         window.addEventListener('keydown', e => {
//             // Stop the browser from scrolling if it's a game key
//             if (this.preventKeys.has(e.code)) {
//                 e.preventDefault();
//             }

//             if (!e.repeat) {
//                 this.current.add(e.code);
//                 this.lastPressed = e.code;
//             }
//         });

//         window.addEventListener('keyup', e => {
//             this.current.delete(e.code);
            
//             // Clean up lastPressed if that specific key was just let go
//             if (this.lastPressed === e.code) {
//                 this.lastPressed = null;
//             }
//         });

//         // Prevent "sticky keys" by clearing inputs if the window loses focus
//         window.addEventListener('blur', () => {
//             this.current.clear();
//             this.lastPressed = null;
//             // pressed and released will naturally clear on the next update() tick
//         });
//     }

//     update() {
//         this.pressed.clear();
//         this.released.clear();

//         // check new presses
//         for (const key of this.current) {
//             if (!this.previous.has(key)) {
//                 this.pressed.add(key);
//             }
//         }

//         // check releases
//         for (const key of this.previous) {
//             if (!this.current.has(key)) {
//                 this.released.add(key);
//             }
//         }

//         // set up for next frame
//         this.previous = new Set(this.current);
//     }

//     isDown(code) {
//         return this.current.has(code);
//     }

//     wasPressed(code) {
//         return this.pressed.has(code);
//     }

//     wasReleased(code) {
//         return this.released.has(code);
//     }
// }