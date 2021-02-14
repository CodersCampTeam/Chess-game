class OpeningView {
    element: HTMLDivElement;
    constructor(private saveSettings: (soundOn: boolean) => void) {
        const modal = document.createElement('div');
        this.element = modal;
        this.setUpOpeningView();
        this.addModalForm();
        this.openModal();
    }

    setUpOpeningView(): void {
        this.element.classList.add('modal', 'modal--closed');
        const potter = document.createElement('div');
        potter.classList.add('modal__potter');
        this.element.appendChild(potter);
        const gambit = document.createElement('div');
        gambit.classList.add('modal__gambit', 'modal__gambit--selected');
        this.element.appendChild(gambit);
        document.querySelector('#app')?.appendChild(this.element);
    }

    addModalForm(): void {
        const modalForm = document.createElement('form');
        modalForm.classList.add('modal__form');
        modalForm.innerHTML = `
            <div class = "modal__header"><p>Game settings</p></div>           
            <div class="modal__unit">
                <p class="modal__header--option">Side</p>                
                <div class="modal__options">
                    <div class="modal__option">
                        <input type="radio" id="side-white" name="side" value="white" checked>
                        <label for="side-white" class="modal__label">White</label> 
                    </div>
                    <div class="modal__option">
                        <input type="radio" id="side-black" name="side" value="black">
                        <label for="side-black" class="modal__label">Black</label>
                    </div>
                </div>
            </div>
            <div class="modal__unit">
                <p class="modal__header--option">Theme</p>
                <div>
                    <div class="modal__option">
                        <input type="radio" id="modal__gambit" name="layout" value="gambit" checked="true">
                        <label id="modal__label--gambit" for="modal__gambit" class="modal__label">"Queen's Gambit"</label> 
                    </div>
                    <div class="modal__option">
                        <input type="radio" id="modal__potter" name="layout" value="potter">
                        <label id="modal__label--potter" for="modal__potter" class="modal__label">"Harry Potter"</label>
                    </div>
                </div>
            </div>
            <div class="modal__unit">              
                <p class="modal__header--option">Name</p>               
                <div class="modal__option">
                    <input type="modal__input" id="name" name="name" value="" class="modal__option--name"  placeholder="Insert your name">                    
                </div>
            </div>
            <div class="modal__unit">
                <p class="modal__header--option">Pieces</p>  
                <div class="modal__options">
                    <div class="modal__option">
                        <input type="radio" id="modal__classic" name="pieces" value="classic">
                        <label for="modal__classic" class="modal__label">Classic</label></div>  
                    <div class="modal__option">
                        <input type="radio" id="modal__modern" name="pieces" value="modern" checked>
                        <label for="modal__modern" class="modal__label">Modern</label>
                    </div>
                </div>
            <div class="modal__unit">
                <p class="modal__header--option">Sounds</p>  
                <div class="modal__options">
                    <div class="modal__option">
                        <input type="radio" id="modal__nosounds" name="sounds" value="off" checked>
                        <label for="modal__nosounds" class="modal__label">Off</label></div>  
                    <div class="modal__option">
                        <input type="radio" id="modal__sounds" name="sounds" value="on">
                        <label for="modal__sounds" class="modal__label">On</label>
                    </div>
                </div>    
            </div>`;
        const modalButton = document.createElement('div');
        modalButton.innerHTML = `<button type="button" class="modal__button">Play the game</button>`;
        modalButton.onclick = () => this.handleSettings();
        modalForm.appendChild(modalButton);
        this.element.appendChild(modalForm);
        document.querySelector('#modal__label--gambit')?.addEventListener('click', () => {
            document.querySelector('.modal__gambit')?.classList.add('modal__gambit--selected');
            document.querySelector('.modal__potter')?.classList.remove('modal__potter--selected');
        });
        document.querySelector('#modal__label--potter')?.addEventListener('click', () => {
            document.querySelector('.modal__potter')?.classList.add('modal__potter--selected');
            document.querySelector('.modal__gambit')?.classList.remove('modal__gambit--selected');
        });
    }

    handleSettings(): void {
        const layout = document.querySelector('.modal input[name="layout"]:checked') as HTMLInputElement;
        const pieces = document.querySelector('.modal input[name="pieces"]:checked') as HTMLInputElement;
        const side = document.querySelector('.modal input[name="side"]:checked') as HTMLInputElement;
        const sounds = document.querySelector('.modal input[name="sounds"]:checked') as HTMLInputElement;
        document
            .querySelector('body')
            ?.classList.remove('body--potter', 'body--gambit', 'body--classic', 'body--modern');
        document
            .querySelector('body')
            ?.classList.add(`body--${layout?.value}`, `body--${pieces?.value}`, `body--${side?.value}`);

        this.element.classList.add('modal--closed');
        this.saveSettings(sounds.value === 'on');
    }

    openModal(): void {
        this.element.classList.remove('modal--closed');
    }
}

export { OpeningView };
