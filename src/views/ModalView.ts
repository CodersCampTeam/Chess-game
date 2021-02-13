class ModalView {
    constructor(private modalContent: HTMLElement) {
        this.setupModal();
    }

    setupModal(): void {
        const modal = document.createElement('div');
        modal.id = 'modal';
        const content = document.createElement('div');
        content.className = 'modal-content';
        content.appendChild(this.modalContent);
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
