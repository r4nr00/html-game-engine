////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LoadState.js:
// Loads the game's assets and displays loading progress.
//
// Asset loading belongs to the AssetLoader.
// This state is responsible for the loading process from the game's
// point of view: starting it, displaying progress, handling errors,
// and moving to the next state when finished.
////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { BaseState } from '../../engine/BaseState.js';
import { GameConfig } from '../config/GameConfig.js';
import { Theme } from '../config/Theme.js';
import { GameAssets } from '../config/GameAssets.js';


export class LoadState extends BaseState {

    constructor(sm, params = {}) {
        super(sm);

        this.assets = this.context.assets;

        this.gameWidth = GameConfig.resolution.gameWidth;
        this.gameHeight = GameConfig.resolution.gameHeight;

        this.progress = 0;
        this.error = null;

        this.load();
    }


    async load() {
        try {

            await this.assets.load(
                GameAssets,
                progress => {
                    this.progress = progress;
                }
            );

            await new Promise(resolve => setTimeout(resolve, 2000));
            this.sm.change('home');

        } catch (error) {
            console.error(error);

            this.error = error;
        }
    }


    update() {
        // Loading happens asynchronously.
        // Nothing needs to happen here.
    }


    render(renderer) {

        // Background
        renderer.drawRect(
            0,
            0,
            this.gameWidth,
            this.gameHeight,
            Theme.colors.grey
        );


        // Loading text
        renderer.drawText(
            'LOADING',
            this.gameWidth * 0.5,
            this.gameHeight * 0.5,
            {
                align: 'center',
                textBaseline: 'bottom',
            }
        );


        // Error message
        if (this.error) {

            renderer.drawText(
                'Error loading game data',
                this.gameWidth * 0.5,
                this.gameHeight * 0.5 + 40,
                {
                    align: 'center',
                    textBaseline: 'top',
                    font: Theme.fonts.small,
                }
            );

        } else {

            // Percentage
            const percent = Math.floor(this.progress * 100);

            renderer.drawText(
                `${percent}%`,
                this.gameWidth * 0.5,
                this.gameHeight * 0.5 + 30,
                {
                    align: 'center',
                    textBaseline: 'top',
                }
            );


            // Progress bar
            const barWidth = 200;
            const barHeight = 10;

            const x = this.gameWidth * 0.5 - barWidth * 0.5;
            const y = this.gameHeight * 0.5 + 50;


            // Outline
            renderer.strokeRect(x, y, barWidth, barHeight, Theme.colors.black);
            
            // Fill
            renderer.drawRect(x, y, barWidth * this.progress, barHeight, Theme.colors.black);


        }
    }
}