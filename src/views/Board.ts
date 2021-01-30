class BoardView {
    render(): void {
        const board = document.createElement(`div`);
        board.id = 'board';
        board.innerHTML = this.getSquares();
        document.querySelector('#app').appendChild(board);
    }

    private getSquares() {
        let squares = '';
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const color = i % 2 === j % 2 ? 'light' : 'dark';
                squares += `<div class="square ${color}"></div>`;
            }
        }
        return squares;
    }
}

export { BoardView };
