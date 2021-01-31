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

        document.querySelector('#app')?.appendChild(board);
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
