import { Colors } from '../enums';

class GameEndModal {
    constructor() {}

    render(color: Colors | undefined, start: any): void {
        this.setGameEndModal(color);
        this.setSettingsButton();
        this.setRevengeButton(start);
    }

    setGameEndModal(color: Colors | undefined) {
        const modal = document.createElement('div');
        modal.innerHTML = `<div class="modal-content-end">
            <h1>gameover</h1>
            <p>${color} win</p>
            <button type="button" class="form__button start">Revenge</button>
            <button type="button" class="form__button settings">Back to Settings</button>
        </div>`;
        document.querySelector('#gameEndModal')?.classList.add('displayed');
        document.querySelector('#gameEndModal')?.appendChild(modal);

        document.querySelector('.settings')?.classList.add('not-displayed');
    }

    setSettingsButton(): void {
        const settingsButton = document.querySelector('.form__button.settings');
        settingsButton?.addEventListener('click', () => {
            window.location.reload();
        });
    }

    setRevengeButton(start: any): void {
        const startButton = document.querySelector('.form__button.start');
        startButton?.addEventListener('click', () => {
            document.querySelector('#app')!.innerHTML = '';
            document.querySelector('.settings')?.classList.remove('not-displayed');
            document.querySelector('#gameEndModal')?.classList.remove('displayed');
            start();
        });
    }
}

export { GameEndModal };
