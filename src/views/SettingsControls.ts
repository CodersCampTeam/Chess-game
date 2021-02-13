class SettingsControls {
    element: HTMLDivElement;
    constructor() {
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
            <p class = "form__header"> Your preferences </p>
            <p class="form__header--option">Theme</p>                
            <div class="form__option">
                <input type="radio" id="gambit" name="layout" value="gambit">
                <label for="gambit" class="form__label">"Queen's Gambit"</label> 
            </div>
            <div class="form__option">
                <input type="radio" id="potter" name="layout" value="potter">
                <label for="potter" class="form__label">"Harry Potter"</label>
            </div>  
            <p class="form__header--option">Pieces</p>   
            <div class="form__option">           
                <input type="radio" id="classic-pieces" name="pieces" value="classic">
                <label for="classic-pieces" class="form__label">Classic</label>
                <input type="radio" id="modern-pieces" name="pieces" value="modern">
                <label for="modern-pieces" class="form__label">Modern</label>
            </div>  
            <p class="form__header--option">Sounds</p>   
            <div class="form__option">
                <input type="radio" id="soundsoff" name="sounds" value="off">
                <label for="soundsoff" class="form__label">Off</label>
                <input type="radio" id="soundson" name="sounds" value="on">
                <label for="soundson" class="form__label">On</label>
            </div>`;
        const submitButton = document.createElement('div');
        submitButton.innerHTML = `<button type="button" class="form__button">Save settings</button>`;
        submitButton.onclick = () => this.saveSettings();
        form.appendChild(submitButton);
        const exitButton = document.createElement('div');
        exitButton.innerHTML = `<button type="button" class="form__button">End game</button>`;
        exitButton.onclick = () => window.location.reload();
        form.appendChild(exitButton);
        this.element.appendChild(form);
    }

    openSettings(): void {
        this.element.querySelector('.form')?.classList.remove('form--closed');
    }

    saveSettings(): void {
        const layout = document.querySelector('input[name="layout"]:checked') as HTMLInputElement;
        const pieces = document.querySelector('input[name="pieces"]:checked') as HTMLInputElement;
        document
            .querySelector('body')
            ?.classList.remove('body--potter', 'body--gambit', 'body--classic', 'body--modern');
        document.querySelector('body')?.classList.add(`body--${layout?.value}`, `body--${pieces?.value}`);
        this.element.querySelector('.form')?.classList.add('form--closed');
    }
}

export { SettingsControls };
