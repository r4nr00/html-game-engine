////////////////////////////////////////////////////////////////////////////////////////////////////////////
// main.js:
// The entry point to the game. Its purpose is to bootstrap the game (i.e., create and launch the game).
////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Game } from './engine/Game.js';
import { EngineConfig } from './engine/EngineConfig.js';
import { GameConfig } from './game/config/GameConfig.js';
import { GameStates } from './game/GameStates.js';
import { Theme } from './game/config/Theme.js';

const canvas = document.getElementById('game-canvas');

const config = {
    canvas,
    engine: EngineConfig,
    game: GameConfig,
    gameStates: GameStates,
    theme: Theme,
};

const game = new Game(config);
await game.start();



