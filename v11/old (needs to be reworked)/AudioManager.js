// AudioManager.js
// From ChatGPT

export default class AudioManager {
    constructor() {
        this.sounds = {};
        this.playingSounds = {};
        this.music = null;
    }

    loadSound(name, src, volume = 1) {
        const audio = new Audio(src);
        audio.volume = volume;

        this.sounds[name] = audio;
    }

    playSound(name) {
        const current = this.playingSounds[name];
    
        if (current && !current.paused && !current.ended) {
            return;
        }
    
        const clone = this.sounds[name].cloneNode();
        clone.volume = this.sounds[name].volume;
    
        this.playingSounds[name] = clone;
    
        clone.addEventListener("ended", () => {
            delete this.playingSounds[name];
        });
    
        clone.play();
    }

    // currently creating a new Audio object for each playMusic call.
    playMusic(src, volume = 0.5) {
        if (this.music) {
            this.music.pause();
        }

        this.music = new Audio(src);
        this.music.loop = true;
        this.music.volume = volume;
        this.music.play();
    }

    stopMusic() {
        if (!this.music) return;

        this.music.pause();
        this.music.currentTime = 0;
    }
}