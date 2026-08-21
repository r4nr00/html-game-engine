import { BaseState } from '../../engine/BaseState.js';
import { Theme } from '../config/Theme.js';
import { GameConfig } from '../config/GameConfig.js';
import { Controls } from '../../engine/input/Controls.js';
import { GameControls } from '../config/GameControls.js';

// import Player from '../Player/Player.js';


export class PlayState extends BaseState {
    constructor(sm, params = {}) {
        super(sm);
        this.gameWidth = GameConfig.resolution.gameWidth;
        this.gameHeight = GameConfig.resolution.gameHeight;
        this.controls = new Controls(this.context.input, GameControls);
        // this.player = params.player ?? new Player(this.game, { x: WIDTH * 0.5, y: HEIGHT * 0.5 }); // using ?? instead of || avoids problem where 0 is treated as false
    
        // CONTROLS TEST: movement
        this.x = this.gameWidth * 0.5;
        this.y = this.gameHeight * 0.5;
        this.speed = 250; // pixels per second
    
    }

    update(dt) {  
        if (this.controls.wasPressed('EXIT')) {
            this.sm.change('home');
            return; // return after changing state so the rest of the update code doesn't keep running
        }
        // this.player.update(dt);

        // CONTROLS TEST: SOCD movement
        const moveX = this.controls.getAxis('LEFT', 'RIGHT', this.controls.AxisMode.LAST_INPUT);
        const moveY = this.controls.getAxis('UP', 'DOWN', this.controls.AxisMode.LAST_INPUT);

        this.x += moveX * this.speed * dt;
        this.y += moveY * this.speed * dt;

        // // CONTROLS TEST: movement
        // if (this.controls.isDown('LEFT')) this.x -= this.speed;
        // if (this.controls.isDown('RIGHT')) this.x += this.speed;
        // if (this.controls.isDown('UP')) this.y -= this.speed;
        // if (this.controls.isDown('DOWN')) this.y += this.speed;
    }


    render(renderer) {
        renderer.drawRect(0, 0, this.gameWidth, this.gameHeight, Theme.colors.grey);
        renderer.drawGrid();

        renderer.drawText(
            'Play', 
            this.gameWidth * 0.5, 
            this.gameHeight * 0.5, 
            { 
                align: 'center',
                textBaseline: 'bottom',
            }
        );

        renderer.drawText(
            '[ Press EXIT to Quit ]', 
            this.gameWidth * 0.5, 
            this.gameHeight * 0.5, 
            { 
                align: 'center', 
                font: Theme.fonts.default, 
                textBaseline: 'top',
            }
        );

        // CONTROLS TEST: Drawing movement
        renderer.drawRect(this.x, this.y, 10, 10, Theme.colors.white);
        
        // this.player.render(renderer);
    }
}

