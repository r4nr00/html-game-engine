////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Keyboard.js:
// Detecting physical inputs from keyboard. Feeds into input system.
// Only responsible for listening to DOM events or polling hardware APIs and maintaining raw, physical state.
////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class Keyboard {
    constructor(preventKeys = ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']) {
        this.keys = new Set();
        this.preventKeys = new Set(preventKeys);

        window.addEventListener('keydown', e => {
            if (this.preventKeys.has(e.code)) e.preventDefault();
            if (!e.repeat) this.keys.add(e.code);
        });

        window.addEventListener('keyup', e => {
            this.keys.delete(e.code);
        });

        const reset = () => this.keys.clear();
        window.addEventListener('blur', reset);
        window.addEventListener('contextmenu', reset);
    }

    isKeyDown(code) {
        return this.keys.has(code);
    }
}