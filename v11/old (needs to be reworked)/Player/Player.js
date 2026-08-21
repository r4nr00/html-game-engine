import { TILE_SIZE, WIDTH } from '../Constants.js';
import PlayerAnimation from './PlayerAnimation.js';
import StateMachine from '../StateMachine.js';
import PlayerIdleState from './states/PlayerIdleState.js';
import PlayerMoveState from './states/PlayerMoveState.js';


export default class Player {
    constructor(game, player = {}) {
        this.game = game;

        this.scale = 2;

        this.origin = {
            x: player.x ?? TILE_SIZE * 1.25,
            y: player.y ?? TILE_SIZE * 2,

        };

        this.facing = 1; // 1 = right, -1 = left

        this.animation = new PlayerAnimation({
            image: game.images.entities.player
        });


        this.sm = new StateMachine({
            idle: PlayerIdleState,
            move: PlayerMoveState,
        });

        this.sm.change('idle', { player: this, input: this.game.input });

    }

    update(dt) {
        this.sm.update(dt);
        this.animation.update(dt);
    }

    render(ctx) {
        this.animation.render(ctx, this.origin, this.facing)
    }


}