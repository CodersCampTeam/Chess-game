const sound0 = require('../../static/sounds/0.mp3');
const sound1 = require('../../static/sounds/1.mp3');
const sound2 = require('../../static/sounds/2.mp3');
const soundCapture = require('../../static/sounds/capture.mp3');

import { SoundTypes } from '../enums/SoundTypes';

class SoundController {
    private lastPlayedMoveSound: number = 0;

    public makeSound(soundType: SoundTypes) {
        switch (soundType) {
            case SoundTypes.NORMAL_MOVE:
                this.playNormalMoveSound();
                break;
            case SoundTypes.CAPTURING_MOVE:
                this.playCapturingMoveSound();
                break;
            default:
                break;
        }
    }

    private playCapturingMoveSound(): void {
        let sound = new Audio('./static/sounds/capture.mp3');
        sound.play();
    }

    private playNormalMoveSound(): void {
        const generateRandomNumber = () => Math.floor(Math.random() * 3);
        let randomNumber = generateRandomNumber();

        // avoid playing same sound as before
        while (this.lastPlayedMoveSound === randomNumber) {
            randomNumber = generateRandomNumber();
        }
        let sound = new Audio(`/static/sounds/${randomNumber}.mp3`);
        sound.play();
        this.lastPlayedMoveSound = randomNumber;
    }
}

export { SoundController };
