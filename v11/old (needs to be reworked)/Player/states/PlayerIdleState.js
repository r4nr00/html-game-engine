
import PlayerBaseState from './PlayerBaseState.js';
import CONTROLS from '../../Controls.js';
import idle from '../animations/idle.js';


export default class PlayerIdleState extends PlayerBaseState {
    enter(params) {
        // console.log('enter player idle state');
       this.player.animation.play(idle);
    }

    update(dt) {
        if (this.input.wasPressed(CONTROLS.PLAYSTATE.moveLeft) || this.input.wasPressed(CONTROLS.PLAYSTATE.moveRight)) {
            this.sm.change('move', { player: this.player, input: this.input });
        }
    }
}
