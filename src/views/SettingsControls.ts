import { settings } from '../services/game-logic/Settings';

class SettingsControls {
    element: HTMLDivElement;
    constructor(private handleSounds: (soundsOn: boolean) => void) {
        const settings = document.createElement('div');
        this.element = settings;
        this.addSettingsForm();
        this.setUpSettingsControls();
        document.querySelector('#app')?.prepend(settings);
    }

    setUpSettingsControls(): void {
        this.element.classList.add('settings');
        const controls = document.createElement('div');
        controls.classList.add('controls');
        controls.innerHTML = `<i class='fas fa-cog'>`;
        controls.addEventListener('click', () => {
            this.openSettings();
        });
        this.element.prepend(controls);
        document.querySelector('body')?.classList.add('body--gambit');
    }

    addSettingsForm(): void {
        const form = document.createElement('form');
        form.classList.add('form');
        form.classList.add('form--closed');
        form.innerHTML = `
            <p class = "form__header">Settings</p>
            <p class="form__header--option">Theme</p>                
            <div class="form__option">
                <input type="radio" id="gambit" name="layout" value="gambit" checked="${settings.layout === 'gambit'}">
                <label for="gambit" class="form__label">"Queen's Gambit"</label> 
            </div>
            <div class="form__option">
                <input type="radio" id="potter" name="layout" value="potter" checked="${settings.layout === 'potter'}">
                <label for="potter" class="form__label">"Harry Potter"</label>
            </div>  
            <p class="form__header--option">Pieces</p>   
            <div class="form__option">           
                <input type="radio" id="classic-pieces" name="pieces" value="classic" checked="${
                    settings.pieces === 'classic'
                }">
                <label for="classic-pieces" class="form__label">Classic</label>
                <input type="radio" id="modern-pieces" name="pieces" value="modern" checked="${
                    settings.pieces === 'modern'
                }">
                <label for="modern-pieces" class="form__label">Modern</label>
            </div>  
            <p class="form__header--option">Sounds</p>   
            <div class="form__option">
                <input type="radio" id="noSound" name="sounds" value="off" checked="${settings.sounds === 'off'}">
                <label for="noSound" class="form__label">Off</label>
                <input type="radio" id="soundOn" name="sounds" value="on" checked="${settings.sounds === 'on'}">
                <label for="soundOn" class="form__label">On</label>
            </div>`;
        const submitButton = document.createElement('div');
        submitButton.innerHTML = `<button type="button" class="form__button">Save settings</button>`;
        submitButton.onclick = () => this.saveSettings();
        form.appendChild(submitButton);
        const exitButton = document.createElement('div');
        exitButton.innerHTML = `<button type="button" class="form__button--exit">End game</button>`;
        exitButton.onclick = () => window.location.reload();
        form.appendChild(exitButton);
        const closeButton = document.createElement('span');
        closeButton.classList.add('form__close');
        closeButton.innerHTML = `&times`;
        closeButton.onclick = () => form.classList.add('form--closed');
        form.prepend(closeButton);
        this.element.appendChild(form);
    }

    openSettings(): void {
        if (settings.layout === 'gambit') {
            const layout = document.querySelector('#gambit') as HTMLInputElement;
            layout.checked = true;
        } else {
            const layout = document.querySelector('#potter') as HTMLInputElement;
            layout.checked = true;
        }

        if (settings.pieces === 'classic') {
            const pieces = document.querySelector('#classic-pieces') as HTMLInputElement;
            pieces.checked = true;
        } else {
            const pieces = document.querySelector('#modern-pieces') as HTMLInputElement;
            pieces.checked = true;
        }

        if (settings.sounds === 'on') {
            const sounds = document.querySelector('#soundOn') as HTMLInputElement;
            sounds.checked = true;
        } else {
            const sounds = document.querySelector('#noSound') as HTMLInputElement;
            sounds.checked = true;
        }

        this.element.querySelector('.form')?.classList.remove('form--closed');
    }

    saveSettings(): void {
        const layout = document.querySelector('input[name="layout"]:checked') as HTMLInputElement;
        const pieces = document.querySelector('input[name="pieces"]:checked') as HTMLInputElement;
        const sounds = document.querySelector('input[name="sounds"]:checked') as HTMLInputElement;
        document
            .querySelector('body')
            ?.classList.remove('body--potter', 'body--gambit', 'body--classic', 'body--modern');
        document.querySelector('body')?.classList.add(`body--${layout?.value}`, `body--${pieces?.value}`);
        this.element.querySelector('.form')?.classList.add('form--closed');
        this.handleSounds(sounds.value === 'on');

        settings.layout = layout?.value;
        settings.pieces = pieces?.value;
        settings.sounds = sounds.value;
    }
}

export { SettingsControls };
