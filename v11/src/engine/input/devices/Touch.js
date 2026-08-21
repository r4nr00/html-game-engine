////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Touch.js:
// This module tracks screen taps. It sets up Touch:0, Touch:1, etc., based on how many fingers are on 
// the screen.
////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class Touch {
    constructor(canvas) {
        this.touches = new Map(); // Stores active touches and their X/Y coordinates
        this.inputs = new Set();

        const updateTouches = (e) => {
            // Prevent scrolling, zooming, and pull-to-refresh on mobile devices
            e.preventDefault(); 
            
            this.touches.clear();
            this.inputs.clear();

            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();

            for (let i = 0; i < e.touches.length; i++) {
                const t = e.touches[i];
                
                // Store coordinates relative to the canvas
                this.touches.set(t.identifier, {
                    x: t.clientX - rect.left,
                    y: t.clientY - rect.top
                });

                // Add a discrete input for the Input.js aggregator
                this.inputs.add(`Touch:${i}`); 
            }
        };

        // passive: false is required to allow e.preventDefault() in touch events
        const options = { passive: false };
        
        canvas.addEventListener('touchstart', updateTouches, options);
        canvas.addEventListener('touchmove', updateTouches, options);
        canvas.addEventListener('touchend', updateTouches, options);
        canvas.addEventListener('touchcancel', updateTouches, options);
    }
}