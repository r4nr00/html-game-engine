// LoadState is used for loading assets (fonts, images, audio) and game data
// LoadState does all the async / await stuff so that it doesn't interfere with the initial game engine setup in main.js
// (i.e., canvas sizing, input setup, state machine creation, starting the anmiation loop)


import BaseState from './BaseState.js';
import Loader from '../Loader.js';
import { WIDTH, HEIGHT } from '../Constants.js';


export default class LoadState extends BaseState {
    constructor(sm, params) {
        super(sm);
        this.game = params.game;

        this.loaded = false;
        this.error = null;

        this.load();
    }

    async load() {
        try {
            this.progress = 0;
            const loader = new Loader();

            // Fonts
            loader.add(async () => {
                const font = new FontFace(
                    'Jost',
                    "url('../assets/fonts/Jost-VariableFont_wght.ttf')"
                );
                await font.load();
                document.fonts.add(font);
                this.game.fontFamily = 'Jost';
            });

            // Audio
            loader.add(async () => {
                // this is loading the audio into this.game.audio, but it isn't awaited. 
                // right now could go to home state before audio is loaded.
                this.game.audio.loadSound('turn', './assets/audio/turn.mp3', 1);
            });

            // Images
            loader.add(async () => {
                const loadImage = src => new Promise((resolve, reject) => {
                    const img = new Image();
            
                    img.onload = () => resolve(img);
                    img.onerror = reject;
            
                    img.src = src;
                });
            
                this.game.images = {
                    backgrounds: {
                        grid: await loadImage('../assets/images/grid.png'),
                    },
                    // ui: {},
                    entities: {
                        player: await loadImage('../assets/images/player.png'),
                    },
                };
            });

            await loader.run(p => this.progress = p);

            this.sm.change('home', { game: this.game });

        } catch (err) {
            this.error = err;
        }
    }

    update() {}

    render(ctx) {
        ctx.font = '18px ' + this.game.fontFamily;
        ctx.textAlign = 'center';
        ctx.fillStyle = this.game.fontColor = 'black'
        ctx.fillText('LOADING', WIDTH * 0.5, HEIGHT * 0.5);

        ctx.textAlign = 'center';
        if (this.error) {
            console.log(this.error);
            ctx.fillText(
                'Error loading game data',
                WIDTH * 0.5, 
                HEIGHT * 0.5 + 40
            );
        } 
        // else {
        //     ctx.fillText(
        //         'Loading…',
        //         WIDTH * 0.5,
        //         HEIGHT * 0.5 + 40
        //     );
        // }

        // Progress Bar
        const percent = Math.floor(this.progress * 100);

        ctx.fillText(
            `${percent}%`,
            WIDTH * 0.5,
            HEIGHT * 0.5 + 30
        );

        const barWidth = 200;
        const barHeight = 10;
        const x = WIDTH * 0.5;
        const y = HEIGHT * 0.5 + 40;

        ctx.strokeStyle = 'black';
        ctx.strokeRect(WIDTH * 0.5 - barWidth * 0.5, HEIGHT * 0.5 + 40, barWidth, barHeight);

        ctx.fillStyle = 'black';
        ctx.fillRect(WIDTH * 0.5 - barWidth * 0.5, HEIGHT * 0.5 + 40, barWidth * this.progress, barHeight);
    }

}
