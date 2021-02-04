import { Square } from '../../models/Square';
import { Board } from './Board';
import { PieceNames } from '../../enums/PieceNames';
import { Piece } from './pieces/Piece';

class GameEngine {
    board: Board;

    constructor() {
        this.board = new Board();
    }

    getLegalMoves = (square: Square): Square[] => {
        const piece = this.board.getPiece(square);
        let legalMoves = piece?.getPossibleMoves() ?? [];
        if (piece?.name === PieceNames.KING)
            legalMoves = legalMoves.filter((square) => !this.isCastlingIllegal(square, piece));
        return legalMoves;
    };

    isCastlingIllegal = (square: Square, piece: Piece): Boolean => {
        if (square.column - piece.position.column === 2) {
            let rook = this.board.getPiece(new Square(piece.position.row, 7));
            return rook ? rook.hasMoved : true;
        } else if (square.column - piece.position.column === -2) {
            let rook = this.board.getPiece(new Square(piece.position.row, 0));
            return rook ? rook.hasMoved : true;
        } else {
            return false;
        }
    };
}

export { GameEngine };
