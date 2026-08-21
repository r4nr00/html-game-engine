import { BaseState } from '../../engine/BaseState.js';
import { Theme } from '../config/Theme.js';
import { GameConfig } from '../config/GameConfig.js';
import { Controls } from '../../engine/input/Controls.js';
import { GameControls } from '../config/GameControls.js';



export class TutorialState extends BaseState {
    constructor(sm, params = {}) {
        super(sm);
        this.gameWidth = GameConfig.resolution.gameWidth;
        this.gameHeight = GameConfig.resolution.gameHeight;
        this.controls = new Controls(this.context.input, GameControls);
    }

    update(dt) {  
        if (this.controls.wasPressed('EXIT')) {
            this.sm.change('home');
            return; // return after changing state so the rest of the update code doesn't keep running
        }
    }


    render(renderer) {
        renderer.drawRect(0, 0, this.gameWidth, this.gameHeight, Theme.colors.white);
        renderer.drawGrid();

        renderer.drawText(
            'Tutorial', 
            this.gameWidth * 0.5, 
            this.gameHeight * 0.5, 
            { 
                align: 'center',
                textBaseline: 'bottom',
                color: Theme.colors.black,
            }
        );

        renderer.drawText(
            '[ Press EXIT to Quit ]', 
            this.gameWidth * 0.5, 
            this.gameHeight * 0.5, 
            { 
                align: 'center', 
                font: Theme.fonts.default, 
                color: Theme.colors.black,
                textBaseline: 'top',
            }
        );
    }
}

