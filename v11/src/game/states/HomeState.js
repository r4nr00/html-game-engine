import { BaseState } from '../../engine/BaseState.js';
import { Controls } from '../../engine/input/Controls.js';
import { GameControls } from '../config/GameControls.js';


export class HomeState extends BaseState {
    constructor(sm, params = {}) {
        super(sm);
        this.gameWidth = this.context.config.resolution.gameWidth;
        this.gameHeight = this.context.config.resolution.gameHeight;
        this.fonts = this.context.theme.fonts;
        this.colors = this.context.theme.colors;

        this.controls = new Controls(this.context.input, GameControls);

        // // TEST rebinding controls
        // this.controls.rebind('LEFT', ['Gamepad:0:B14', 'Gamepad:0:A2:-']);

        this.backgroundImg = this.context.assets.get('grid');
    }

    update(dt) {
        // console.log(this.controls.input.gamepad.inputs);  // to see codes for each controller button pressed
        // console.log(this.controls.input.mouse.x);

        if (this.controls.wasPressed('START')) {
            this.sm.change('play');
            return; // return after changing state so the rest of the update code doesn't keep running
        }
    }

    render(renderer) {
        renderer.drawRect(0, 0, this.gameWidth, this.gameHeight, this.colors.navy);
        renderer.drawGrid();
        renderer.drawImage(this.backgroundImg, 0, 0, this.gameWidth, this.gameHeight);

        renderer.drawText(
            'Home', 
            this.gameWidth * 0.5, 
            this.gameHeight * 0.5, 
            { 
                align: 'center',
                textBaseline: 'bottom',
            }
        );

        renderer.drawText(
            '[ Press START to Play ]', 
            this.gameWidth * 0.5, 
            this.gameHeight * 0.5, 
            { 
                align: 'center', 
                font: this.fonts.default,
                textBaseline: 'top',
            }
        );
    }
}

