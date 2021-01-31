import { Square } from '../models/Square';
import { GameEngine } from '../services/game-logic/GameEngine';
import { BoardView } from '../views/BoardView';

class GameController {
    boardView: BoardView;
    gameEngine: GameEngine;
    activeSquare: Square | null;

    constructor() {
        this.activeSquare = null;
        this.gameEngine = new GameEngine();
        this.boardView = new BoardView(this.handleUserClick);
        this.updateBoard();
    }

    handleUserClick = (square: Square): void => {
        const selectedPiece = this.gameEngine.board.getPiece(square);

        if (this.activeSquare) {
            const legalMoves = this.gameEngine.getLegalMoves(this.activeSquare);
            const isLegalMove = legalMoves.some(
                (move) => square?.row === move.to.row && square?.column === move.to.column
            );

            if (isLegalMove) {
                this.gameEngine.board.movePiece(this.activeSquare, square);
                this.boardView.render(this.gameEngine.board);
            }
            this.activeSquare = null;
            this.boardView.deselectSquares();
        } else if (selectedPiece) {
            const legalMoves = this.gameEngine.getLegalMoves(square);
            this.boardView.selectSquares(legalMoves);
            this.activeSquare = square;
        }
    };

    updateBoard(): void {
        this.boardView.render(this.gameEngine.board);
    }
}

export { GameController };
