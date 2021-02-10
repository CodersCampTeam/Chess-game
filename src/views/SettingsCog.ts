//import { BoardView } from './BoardView';

class SettingsCog {
    element: HTMLDivElement;
    constructor() {
        const cog = document.createElement(`div`);
        this.element = cog;
        this.element.classList.add('cog');
        this.element.innerHTML = `<i class='fas fa-cog'>`;
        this.element.addEventListener('click', () => {
            this.openSettings();
        });
        document.querySelector('#app')?.prepend(cog);
    }

    openSettings(): void {
        return console.log('jej');
    }
    //closeSettings
    //saveSetting
}

export { SettingsCog };
