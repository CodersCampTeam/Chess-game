import { Colors } from '../enums';
import { Square } from '../models/Square';
import { GameEngine } from '../services/game-logic/GameEngine';
import { Piece } from '../services/game-logic/pieces/Piece';
import { BoardView } from '../views/BoardView';

class GameController {
    boardView: BoardView;
    gameEngine: GameEngine;
    activeSquare: Square | null;
    currentPlayer: Colors.Black | Colors.White;

    constructor() {
        this.activeSquare = null;
        this.gameEngine = new GameEngine();
        this.boardView = new BoardView(this.handleUserClick);
        this.currentPlayer = Colors.White;
        this.updateBoard();
    }

    handleUserClick = (square: Square): void => {
        const selectedPiece = this.gameEngine.board.getPiece(square);

        if (this.activeSquare) {
            const legalMoves = this.gameEngine.getLegalMoves(this.activeSquare);
            const isLegalMove = legalMoves.some((move) => square?.row === move.row && square?.column === move.column);

            if (isLegalMove) {
                this.gameEngine.board.movePiece(this.activeSquare, square);
                this.boardView.render(this.gameEngine.board);
                this.changePlayer();
            }
            this.activeSquare = null;
            this.boardView.deselectSquares();
        } else if (this.isCurrentPlayer(selectedPiece)) {
            const legalMoves = this.gameEngine.getLegalMoves(square);
            this.boardView.selectSquares(legalMoves);
            this.activeSquare = square;
        }
    };

    private isCurrentPlayer(selectedPiece: Piece | null): boolean {
        return !!selectedPiece && this.currentPlayer === selectedPiece.color;
    }

    private changePlayer(): void {
        this.currentPlayer = this.currentPlayer === Colors.White ? Colors.Black : Colors.White;
    }

    updateBoard(): void {
        this.boardView.render(this.gameEngine.board);
    }
}

export { GameController };
