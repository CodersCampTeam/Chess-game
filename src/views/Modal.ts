import { Colors } from '../enums';

class Modal {
    element: HTMLDivElement;
    constructor(private saveSettings: (name: string, side: Colors) => void) {
        const modal = document.createElement('div');
        this.element = modal;
        this.element.classList.add('modal', 'modal--closed');
        const potter = document.createElement('div');
        potter.classList.add('modal__potter');
        modal.appendChild(potter);
        const gambit = document.createElement('div');
        gambit.classList.add('modal__gambit');
        modal.appendChild(gambit);
        this.addModalForm();
        this.openModal();
        document.querySelector('#app')?.appendChild(modal);
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
                        <input type="radio" id="side-white" name="side" value="white">
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
                        <input type="radio" id="modal__gambit" name="layout" value="gambit">
                        <label for="modal__gambit" class="modal__label">"Queen's Gambit"</label> 
                    </div>
                    <div class="modal__option">
                        <input type="radio" id="modal__potter" name="layout" value="potter">
                        <label for="modal__potter" class="modal__label">"Harry Potter"</label>
                    </div>
                </div>
            </div>
            <div class="modal__unit">              
                <p class="modal__header--option">Name</p>               
                <div class="modal__option">
                    <input type="modal__input" id="name" name="name" value="" class="modal__option--name">                    
                </div>
            </div>
            <div class="modal__unit">
                <p class="modal__header--option">Pieces</p>  
                <div class="modal__options">
                    <div class="modal__option">
                        <input type="radio" id="modal__classic" name="pieces" value="classic">
                        <label for="modal__classic" class="modal__label">Classic</label></div>  
                    <div class="modal__option">
                        <input type="radio" id="modal__modern" name="pieces" value="modern">
                        <label for="modal__modern" class="modal__label">Modern</label>
                    </div>
                </div>
            </div>`;
        const modalButton = document.createElement('div');
        modalButton.innerHTML = `<button type="button" class="modal__button">Play the game</button>`;
        modalButton.onclick = () => this.handleSettings();
        modalForm.appendChild(modalButton);
        this.element.appendChild(modalForm);
    }

    handleSettings(): void {
        const layout = document.querySelector('.modal input[name="layout"]:checked') as HTMLInputElement;
        const pieces = document.querySelector('.modal input[name="pieces"]:checked') as HTMLInputElement;
        const side = document.querySelector('.modal input[name="side"]:checked') as HTMLInputElement;
        const name = document.querySelector('.modal input[name="name"]') as HTMLInputElement;
        document
            .querySelector('body')
            ?.classList.remove('body--potter', 'body--gambit', 'body--classic', 'body--modern');
        document.querySelector('body')?.classList.add(`body--${layout?.value}`, `body--${pieces?.value}`);
        this.element.classList.add('modal--closed');
        this.saveSettings(name.value, side.value as Colors);
    }

    openModal(): void {
        this.element.classList.remove('modal--closed');
    }
}

export { Modal };
