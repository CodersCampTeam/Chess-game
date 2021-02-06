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
        let pieceMoves = piece?.getPossibleMoves(this.board) ?? [];
        return pieceMoves.filter(this.isOnBoard).filter((square) => !this.isOccupiedBySameColor(square, piece));
    };

    private isOnBoard = (square: Square): Boolean => {
        // here or in knight.ts (for now knights can get outside the board)
        return square.row >= 0 && square.row < 8 && square.column >= 0 && square.column < 8;
    };

    private isOccupiedBySameColor = (square: Square, piece: Piece | null): Boolean =>
        this.board.getPiece(square)?.color === piece?.color;
}

export { GameEngine };
