class Sound {
    private lastPlayedMoveSound = 0;
    private AMOUNT_OF_NORMAL_MOVE_SOUNDS = 3;

    public playCapturingMoveSound(): void {
        const sound = new Audio('/static/sounds/capture.mp3');
        sound.play();
    }

    public playNormalMoveSound(): void {
        const generateRandomNumber = () => Math.floor(Math.random() * this.AMOUNT_OF_NORMAL_MOVE_SOUNDS);
        let randomNumber = generateRandomNumber();

        // avoid playing same sound as before
        while (this.lastPlayedMoveSound === randomNumber) {
            randomNumber = generateRandomNumber();
        }
        const sound = new Audio(`/static/sounds/${randomNumber}.mp3`);
        sound.play();
        this.lastPlayedMoveSound = randomNumber;
    }
}

export { Sound };
