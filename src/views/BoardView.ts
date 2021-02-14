import { Square } from '../models/Square';
import { Board } from '../services/game-logic/Board';
import { Helpers } from '../utils/Helpers';
import { SquareView } from './SquareView';

class BoardView {
    squareViews: SquareView[];

    constructor(private handleBoardClick: (square: Square) => void) {
        this.squareViews = this.createSquares();
        const board = document.createElement(`div`);
        board.id = 'board';
        this.squareViews.forEach(({ element }) => board.appendChild(element));
        this.generateNotation(board);
        document.querySelector('#app')?.appendChild(board);
    }

    private generateNotation(board: HTMLElement): void {
        const sides = ['left', 'right', 'bottom', 'top'];

        sides.forEach((side, sideIndex) => {
            const notationBox = document.createElement('div');
            notationBox.classList.add('notation', `${side}-notation`);
            this.getNotationSymbols(notationBox, sideIndex);
            board.appendChild(notationBox);
        });
    }

    private getNotationSymbols(notationBox: HTMLElement, sideIndex: number) {
        for (let i = 8; i >= 1; i--) {
            const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
            const notationElement = document.createElement('div');
            notationElement.classList.add('notation-element');
            notationElement.innerText = sideIndex < 2 ? i.toString() : letters[8 - i];
            notationBox.appendChild(notationElement);
        }
    }

    render(state: Board): void {
        this.placePieces(state);
    }

    selectSquares(squares: Square[]): void {
        squares.forEach((square) =>
            this.squareViews
                .filter(({ row, column }) => row === square.row && column === square.column)
                .forEach((square) => square.select())
        );
    }

    deselectSquares(): void {
        this.squareViews.forEach((square) => square.deselect());
    }

    private placePieces(state: Board): void {
        this.squareViews.forEach((square) => {
            const piece = state.getPiece({ row: square.row, column: square.column });
            square.update(piece);
        });
    }

    private createSquares() {
        const squares: SquareView[] = [];
        Helpers.useNestedForLoop((i, j) => {
            squares.push(new SquareView(i, j, this.handleBoardClick));
        });
        return squares;
    }
}

export { BoardView };
