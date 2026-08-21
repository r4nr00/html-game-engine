////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Renderer.js:
// Tackles the problem of how to draw everything to the screen. 
// The renderer is passed to the Game State / Scene where it is used to draw things
// The Game State / Scene say what to draw. Renderer.js is about how to draw it.
// This is similar to something like LÖVE's graphics module (love.graphics)
////////////////////////////////////////////////////////////////////////////////////////////////////////////


const ScaleMode = Object.freeze({
    fit: 'fit',
    integer: 'integer',
});


export class Renderer {
    constructor({ canvas, canvasMargin, scaleMode, gameWidth, gameHeight, tileSize, colors, fonts } = {}) {
        this.canvas = canvas;
        this.canvasMargin = canvasMargin;
        this.scaleMode = ScaleMode[scaleMode] || ScaleMode.integer;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.tileSize = tileSize;
        this.colors = colors;
        this.fonts = fonts;

        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {        
        let w, h;
        const availableWidth = window.innerWidth - (this.canvasMargin * 2);
        const availableHeight = window.innerHeight - (this.canvasMargin * 2);

        if (this.scaleMode === ScaleMode.integer) {
            // Find the largest whole number multiplier that fits on screen
            const scaleX = Math.floor(availableWidth / this.gameWidth);
            const scaleY = Math.floor(availableHeight / this.gameHeight);
            
            // Pick the smaller scale to ensure it fits both dimensions. 
            // We use Math.max(1, ...) so it never shrinks below 1x scale, 
            // even on tiny screens.
            const scale = Math.max(1, Math.min(scaleX, scaleY));

            w = this.gameWidth * scale;
            h = this.gameHeight * scale;
            
        } else if (this.scaleMode === ScaleMode.fit) {
            // Continuous aspect-ratio scaling
            const aspectRatio = this.gameWidth / this.gameHeight;

            if (availableWidth / availableHeight > aspectRatio) {
                h = availableHeight;
                w = h * aspectRatio;
            } else {
                w = availableWidth;
                h = w / aspectRatio;
            }
        }

        // Handle high-DPI displays
        this.ratio = window.devicePixelRatio || 1;

        // Actual canvas pixel dimensions (Physical Pixels)
        this.canvas.width = w * this.ratio;
        this.canvas.height = h * this.ratio;

        // Logical Resolution (CSS Pixels) (Game Coordinates)
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.canvas.style.margin = `${this.canvasMargin}px`;
        
        // Calculate the drawing scale
        const scaleX = (w / this.gameWidth) * this.ratio;
        const scaleY = (h / this.gameHeight) * this.ratio;

        // Scale the drawing context based on the device ratio
        this.ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);

        // IMPORTANT: Changing canvas.width/height resets the context state.
        // You must reapply properties like imageSmoothingEnabled AFTER resizing.
        this.ctx.imageSmoothingEnabled = false;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    }

    // Wrapper functions that make it easier to draw things and abstract away Canvas API 
    // (i.e., avoid all the renderer.ctx code)
    drawRect(x, y, width, height, color = this.colors.black) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    strokeRect(x, y, width, height, color = this.colors.black) {
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(x, y, width, height);
    }

    // Notice the {} around the optional parameters. 
    // The `= {}` at the very end means "if they don't pass an object at all, use an empty one".
    drawText(text, x, y, { color = this.colors.white, font = this.fonts.heading, align = 'left', textBaseline = 'alphabetic' } = {}) {
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline
        // textBaseLine Options: top, hanging, middle, alphabetic (default), ideographic, bottom
        this.ctx.textBaseline = textBaseline;
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
    }

    drawImage(image, x, y, width, height) {
        this.ctx.drawImage(image, x, y, width, height);
    }


    // this is more of a game thing then a draw tool that can be used anywhere
    drawGrid() {
        this.ctx.strokeStyle = this.colors.grey;
        this.ctx.fillStyle = this.colors.white;
        this.ctx.font = this.fonts.small;

        for (let x = 0; x < this.gameWidth; x+= this.tileSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.gameHeight);
            this.ctx.stroke();
            this.ctx.fillText(x / this.tileSize, x, 10);    // tile number
            this.ctx.fillText(x + 'px', x, 20);         // px number
        }

        for (let y = 0; y < this.gameHeight; y+= this.tileSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.gameWidth, y);
            this.ctx.stroke();
            this.ctx.fillText(y / this.tileSize, 20, y - 5);    // tile number
            this.ctx.fillText(y + 'px', 20, y + 5);         // px number
        }
    }
    




    // Additional methods to potentially add in the future:
    // drawSprite()
    // drawLine()
    // drawCircle() or drawEllipse()
    // drawTile()
    // options for drawing text that has multiple lines with line spacing?
    // strokeText() for outlining text 

    // Camera System
    // Layering / Z-Sorting
    // Screen Shake & Flash
    // Debug Toggles (drawing hitboxes and hurtboxes)
}