import { Board } from '../services/game-logic/Board';
import { Helpers } from '../utils/Helpers';
import { PieceMapper } from '../utils/PieceMapper';

class BoardView {
    render(state: Board): void {
        const board = document.createElement(`div`);
        board.id = 'board';
        board.innerHTML = this.getSquares();
        document.querySelector('#app').appendChild(board);

        this.placePieces(state);
    }

    placePieces(state: Board): void {
        Helpers.useNestedForLoop((x, y) => {
            const piece = state.getPiece({ x, y });
            if (piece) {
                const square = document.querySelector(`[data-row='${x}'][data-column='${y}']`);
                const wrapper = document.createElement('span');
                wrapper.classList.add(piece.side);
                wrapper.innerHTML = PieceMapper.getIcon(piece.name);
                square.appendChild(wrapper);
            }
        });
    }

    private getSquares() {
        let squares = '';
        Helpers.useNestedForLoop((i, j) => {
            const color = i % 2 === j % 2 ? 'light' : 'dark';
            squares += `<div data-row="${i}" data-column="${j}" class="square ${color}"></div>`;
        });
        return squares;
    }
}

export { BoardView };
