export default class AudioController {
    name: string;
    audioElement: HTMLAudioElement;
    icecast: any;
    sourceInitialized: boolean;
    constructor(name: string) {
        this.name = name;
        this.audioElement = new Audio();
        this.icecast = null;
        this.sourceInitialized = false;
    }

    async setAudioSource({ audioType, src }) {
        console.log(this.name, audioType, src);
        if (audioType === "icecast" && src) {
            const IcecastMetadataPlayer = await import("icecast-metadata-player");
            const player = new IcecastMetadataPlayer.default(src, {
                onMetadata: (meta) => { },
                onError(message, error?) { },
                audioElement: this.audioElement,
            });

            this.icecast = player;
        }

        if (audioType === "mp3") {
            this.audioElement.src = src;
        }
        this.sourceInitialized = true;
    }

    playAudio() {

        if (!this.sourceInitialized) return;
        console.log(this.name, "was signaled to play")
        this.audioElement.play();
    }

    pauseAudio() {
        if (!this.sourceInitialized) return;
        console.log(this.name, "was signaled to pause")

        this.audioElement.pause();
    }

    remove() {
        this.audioElement.remove();
    }
}