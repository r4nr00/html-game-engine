import { HomeState } from './states/HomeState.js';
import { PlayState } from './states/PlayState.js';
import { TutorialState } from './states/TutorialState.js';
import { LoadState } from './states/LoadState.js';

export const GameStates = {
    home: HomeState,
    play: PlayState,
    tutorial: TutorialState,
    load: LoadState,
}