// Mouse wheel
// Click and drag to multiselect


export class Mouse {
    constructor(canvas, gameWidth, gameHeight) {
        this.buttons = new Set();
        this.x = 0;
        this.y = 0;

        window.addEventListener('mousemove', e => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();

            // // Store coordinates relative to canvas display size
            // this.x = e.clientX - rect.left;
            // this.y = e.clientY - rect.top;

            // Store coordinates using game logic values
            const scaleX = gameWidth / rect.width;
            const scaleY = gameHeight / rect.height;

            this.x = (e.clientX - rect.left) * scaleX;
            this.y = (e.clientY - rect.top) * scaleY;
        });

        window.addEventListener('mousedown', e => {
            this.buttons.add(e.button); // 0 = Left, 1 = Middle, 2 = Right
        });

        window.addEventListener('mouseup', e => {
            this.buttons.delete(e.button);
        });

        window.addEventListener('blur', () => this.buttons.clear());

        window.addEventListener('contextmenu', e => e.preventDefault());
    }

    isButtonDown(button) {
        return this.buttons.has(button);
    }
}