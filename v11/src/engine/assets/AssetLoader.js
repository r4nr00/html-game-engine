////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AssetLoader.js:
// Loads and stores game assets.
//
// The engine knows how to load different asset types.
// It does NOT know which assets a particular game needs.
//
// The game supplies an asset manifest (GameAssets.js).
////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class AssetLoader {
    constructor() {
        this.assets = new Map();
    }


    //////////////////////////////////////////////////////////////////////////////////////////
    // Public loading methods
    //////////////////////////////////////////////////////////////////////////////////////////

    image(key, src) {
        return this.#load(key, this.#loadImage(src));
    }


    audio(key, src) {
        return this.#load(key, this.#loadAudio(src));
    }


    font(key, family, src, descriptors = {}) {
        return this.#load(key, this.#loadFont(family, src, descriptors));
    }


    //////////////////////////////////////////////////////////////////////////////////////////
    // Load a complete manifest
    //
    // Example manifest:
    //
    // {
    //     images: {
    //         player: './assets/images/player.png'
    //     },
    //
    //     audio: {
    //         turn: './assets/audio/turn.mp3'
    //     },
    //
    //     fonts: {
    //         jost: {
    //             family: 'Jost',
    //             src: './assets/fonts/Jost.ttf'
    //         }
    //     }
    // }
    //////////////////////////////////////////////////////////////////////////////////////////

    async load(manifest, onProgress) {
        const tasks = [];


        // Images
        for (const [key, src] of Object.entries(manifest.images ?? {})) {
            tasks.push({
                key,
                type: 'image',
                load: () => this.image(key, src),
            });
        }


        // Audio
        for (const [key, src] of Object.entries(manifest.audio ?? {})) {
            tasks.push({
                key,
                type: 'audio',
                load: () => this.audio(key, src),
            });
        }


        // Fonts
        for (const [key, font] of Object.entries(manifest.fonts ?? {})) {
            tasks.push({
                key,
                type: 'font',
                load: () => this.font(
                    key,
                    font.family,
                    font.src,
                    font.descriptors
                ),
            });
        }


        const total = tasks.length;

        if (total === 0) {
            onProgress?.(1);
            return;
        }


        let completed = 0;


        // Load assets in parallel.
        await Promise.all(
            tasks.map(async task => {
                await task.load();

                completed++;

                onProgress?.(completed / total);
            })
        );
    }


    //////////////////////////////////////////////////////////////////////////////////////////
    // Retrieval
    //////////////////////////////////////////////////////////////////////////////////////////

    get(key) {
        const asset = this.assets.get(key);

        if (!asset) {
            throw new Error(`Asset '${key}' has not been loaded.`);
        }

        return asset;
    }


    has(key) {
        return this.assets.has(key);
    }


    //////////////////////////////////////////////////////////////////////////////////////////
    // Private helpers
    //////////////////////////////////////////////////////////////////////////////////////////

    async #load(key, promise) {
        const asset = await promise;

        this.assets.set(key, asset);

        return asset;
    }


    #loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();

            image.onload = () => resolve(image);

            image.onerror = () => {
                reject(new Error(`Failed to load image: ${src}`));
            };

            image.src = src;
        });
    }


    #loadAudio(src) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();

            const onLoaded = () => {
                cleanup();
                resolve(audio);
            };

            const onError = () => {
                cleanup();
                reject(new Error(`Failed to load audio: ${src}`));
            };

            const cleanup = () => {
                audio.removeEventListener('canplaythrough', onLoaded);
                audio.removeEventListener('error', onError);
            };

            audio.addEventListener('canplaythrough', onLoaded, { once: true });
            audio.addEventListener('error', onError, { once: true });

            audio.preload = 'auto';
            audio.src = src;
            audio.load();
        });
    }


    async #loadFont(family, src, descriptors) {
        const font = new FontFace(
            family,
            `url("${src}")`,
            descriptors
        );

        await font.load();

        document.fonts.add(font);

        return font;
    }
}