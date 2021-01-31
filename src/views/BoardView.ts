import { Board } from '../services/game-logic/Board';
import { PieceMapper } from '../utils/PieceMapper';

const forEach = (callBack: (i: number, j: number) => void, size = 8) => {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            callBack(i, j);
        }
    }
};

class BoardView {
    render(state?: Board): void {
        const board = document.createElement(`div`);
        board.id = 'board';
        board.innerHTML = this.getSquares();
        document.querySelector('#app').appendChild(board);
        this.placePieces(state);
    }

    placePieces(state: Board): void {
        forEach((i, j) => {
            const piece = state[i][j];
            if (piece) {
                const square = document.querySelector(`[data-row='${i}'][data-column='${j}']`);
                const wrapper = document.createElement('span');
                wrapper.classList.add(piece.side);
                wrapper.innerHTML = PieceMapper.getIcon(piece.name);
                square.appendChild(wrapper);
            }
        });
    }

    private getSquares() {
        let squares = '';
        forEach((i, j) => {
            const color = i % 2 === j % 2 ? 'light' : 'dark';
            squares += `<div data-row="${i}" data-column="${j}" class="square ${color}"></div>`;
        });
        return squares;
    }
}

export { BoardView };
