class ModalView {
    constructor(modalContent: HTMLElement) {
        const modal = document.createElement('div');
        modal.id = 'modal';
        const content = document.createElement('div');
        content.className = 'modal-content';
        content.appendChild(modalContent);
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    closeModal(): void {
        const modal = document.querySelector('#modal');
        if (modal) {
            modal.remove();
        }
    }
}

export { ModalView };
