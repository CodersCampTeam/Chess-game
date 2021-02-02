import { PieceNames } from '../../enums';
import { Square } from '../../models/Square';
import { Board } from './Board';
import { Piece } from './pieces/Piece';

class GameEngine {
    board: Board;

    constructor() {
        this.board = new Board();
    }

    getLegalMoves = (square: Square): Square[] => {
        const piece = this.board.getPiece(square);
        let pieceMoves = piece?.getPossibleMoves() ?? [];
        return pieceMoves.filter((square) => this.isOccupiedBySameColorPiece(square, piece));
    };

    private isOccupiedBySameColorPiece = (square: Square, piece: Piece | null): Boolean => {
        if (piece?.name === PieceNames.PAWN) {
            return !this.board.getPiece(square);
        } else {
            return this.board.getPiece(square)?.color !== piece?.color;
        }
    };
}

export { GameEngine };
