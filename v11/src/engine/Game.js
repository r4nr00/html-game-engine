////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Game.js:
// The brain. Coordinates everything.
////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { AssetLoader } from './assets/AssetLoader.js';
import { Input } from './input/Input.js';
import { Renderer } from './rendering/Renderer.js';
import { StateMachine } from './StateMachine.js';


export class Game {
    constructor(config) {
        this.running = false;
        this.lastTime = 0;

        this.input = new Input({
            canvas: config.canvas,
            ...config.engine.input,
            ...config.game.resolution,
        });

        this.renderer = new Renderer({ 
            canvas: config.canvas,
            tileSize: config.game.tileSize,
            ...config.engine.renderer,
            ...config.theme,
            ...config.game.resolution,
        });

        this.assets = new AssetLoader();

        this.stateMachine = new StateMachine({
            states: config.gameStates,
            context: {
                input: this.input,
                assets: this.assets,
                config: config.game,
                theme: config.theme,
            },
        });
        this.stateMachine.change(config.game.initialState);



        // // Systems
        // Asset loader
        // this.audio = new AudioManager();
        // this.assets = new AssetManager();
        // this.time = new Time();
        // this.events = new EventEmitter();
        // this.entity = new Entity();
        // Debugger? or is this within other systems?
        // Camera
        
    }

    async start() {
        await this.init();
        this.running = true;
        this.lastTime = performance.now();

        // using an arrow function keeps 'this' referring to game.
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    stop() {
        this.running = false;
    }

    async init() {
        // // for debugging loading
        // await new Promise(resolve => setTimeout(resolve, 2000));
    }


    gameLoop (timestamp) {        
        if (!this.running) return;

        const dt = Math.min( (timestamp - this.lastTime) / 1000, 0.1 );
        this.lastTime = timestamp;

        this.update(dt);
        this.render();

        requestAnimationFrame((t) => this.gameLoop(t));
    }

    update(dt) {
        this.input.update(dt);
        this.stateMachine.update(dt);
    }

    render() {
        this.renderer.clear();
        this.stateMachine.render(this.renderer);
    }

}