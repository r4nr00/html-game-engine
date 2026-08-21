
import PlayerBaseState from './PlayerBaseState.js';
import CONTROLS from '../../Controls.js';
import animation from '../animations/walk.js';


export default class PlayerMoveState extends PlayerBaseState {
    enter(params) {
        // console.log('enter player move state');
        this.player.animation.play(animation);

    }
    update(dt) {

        // conditions
        const leftDown = this.input.isDown(CONTROLS.PLAYSTATE.moveLeft);
        const leftLastPressed = this.input.lastPressed === CONTROLS.PLAYSTATE.moveLeft;
        const rightDown = this.input.isDown(CONTROLS.PLAYSTATE.moveRight);
        const rightLastPressed = this.input.lastPressed === CONTROLS.PLAYSTATE.moveRight;

        // switch to idle state
        if (!leftDown && !rightDown) {
            this.sm.change('idle', { player: this.player, input: this.input });
        }

        // move direction
        if ( (rightDown && rightLastPressed) || (rightDown && !leftDown) ) {
            this.player.facing = 1;
            // this.player.origin.x += this.player.vx * dt;
        } 
        else if ( (leftDown && leftLastPressed) || (leftDown && !rightDown) ) {
            this.player.facing = -1;
            // this.player.origin.x -= this.player.vx * dt;
        }


    }
}
