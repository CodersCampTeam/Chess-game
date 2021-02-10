//import { BoardView } from './BoardView';

class SettingsCog {
    element: HTMLDivElement;
    constructor() {
        const settings = document.createElement('div');
        this.element = settings;
        this.element.classList.add('settings');
        const cog = document.createElement('div');
        cog.classList.add('cog');
        cog.innerHTML = `<i class='fas fa-cog'>`;
        cog.addEventListener('click', () => {
            this.openSettings();
        });
        this.element.prepend(cog);
        this.addSettingsForm();
        document.querySelector('#app')?.prepend(settings);
    }

    addSettingsForm(): void {
        const form = document.createElement('form');
        form.classList.add('form');
        form.classList.add('form--closed');
        form.innerHTML = `
            <p class = "form__header"> Your preferences </p>
            <p class="form__header--option">Theme</p>                
            <div class="form__option">
            <label for="gambit" class="form__label">"Queen's Gambit"</label>
            <input type="radio" id="gambit" name="layout" value="gambit" checked> 
            </div>
            <div class="form__option">
            <label for="potter" class="form__label">"Harry Potter"</label>
            <input type="radio" id="potter"  name="layout" value="potter"></div>  
            <p class="form__header--option">Pieces</p>   
            <div class="form__option">
            <label for="classic" class="form__label">Classic</label>
            <input type="radio" id="classic-pawns"  name="layout" value="potter"></div>  
            <div class="form__option">
            <label for="potter" class="form__label">Modern</label>
            <input type="radio" id="potter"  name="layout" value="potter"></div>`;
        const submitButton = document.createElement('div');
        submitButton.innerHTML = `<button type="button" class="form__button">Save settings</button>`;
        submitButton.onclick = () => this.saveSettings();
        form.appendChild(submitButton);
        this.element.appendChild(form);
    }
    openSettings(): void {
        this.element.querySelector('.form')?.classList.remove('form--closed');
    }
    //closeSettings
    saveSettings(): void {
        this.element.querySelector('.form')?.classList.add('form--closed');
    }
}

export { SettingsCog };
