class Sound {
    private lastPlayedMoveSound = 0;
    private AMOUNT_OF_NORMAL_MOVE_SOUNDS = 3;
    private capturingMoveSound: HTMLAudioElement;
    private normalMoveSound: HTMLAudioElement[] = [];

    constructor() {
        this.capturingMoveSound = new Audio('/static/sounds/capture.mp3');

        for (let soundIdx = 0; soundIdx < this.AMOUNT_OF_NORMAL_MOVE_SOUNDS; ++soundIdx) {
            this.normalMoveSound.push(new Audio(`/static/sounds/${soundIdx}.mp3`));
        }
    }

    public playCapturingMoveSound(): void {
        this.capturingMoveSound.play();
    }

    public playNormalMoveSound(): void {
        const generateRandomNumber = () => Math.floor(Math.random() * this.AMOUNT_OF_NORMAL_MOVE_SOUNDS);
        let randomNumber = generateRandomNumber();

        // avoid playing same sound as before
        while (this.lastPlayedMoveSound === randomNumber) {
            randomNumber = generateRandomNumber();
        }
        this.normalMoveSound[randomNumber].play();
        this.lastPlayedMoveSound = randomNumber;
    }
}

export { Sound };
