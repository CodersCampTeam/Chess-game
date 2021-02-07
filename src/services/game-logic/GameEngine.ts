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
        let legalMoves = piece?.getPossibleMoves(this.board).filter(this.isOnBoard) ?? [];
        if (piece?.name === PieceNames.KING)
            legalMoves = legalMoves.filter((square) => !this.isCastlingIllegal(square, piece));
        return legalMoves.filter((square) => !this.isOccupiedBySameColor(square, piece));
    };

    public movePiece(location: Square, destination: Square): void {
        //can be useful when saving moves
        const piece = this.board.getPiece(location);
        this.board.movePiece(location, destination);
        if (piece?.name === PieceNames.KING) this.performCastling(location, destination);
    }

    private performCastling(location: Square, destination: Square): void {
        if (location.column - destination.column === -2) {
            this.board.movePiece(new Square(location.row, 7), new Square(location.row, 5));
        } else if (location.column - destination.column === 2) {
            this.board.movePiece(new Square(location.row, 0), new Square(location.row, 3));
        }
    }

    private isCastlingIllegal = (square: Square, piece: Piece): boolean => {
        let rook = null;
        let rookTarget = null;
        if (square.column - piece.position.column === 2) {
            rook = this.board.getPiece(new Square(piece.position.row, 7));
            rookTarget = new Square(piece.position.row, 5);
        } else if (square.column - piece.position.column === -2) {
            rook = this.board.getPiece(new Square(piece.position.row, 0));
            rookTarget = new Square(piece.position.row, 3);
        } else {
            return false;
        }
        return rook ? rook.hasMoved || !this.canMoveTo(rook.position, rookTarget) : true;
    };

    private canMoveTo = (from: Square, to: Square): boolean => {
        return this.getLegalMoves(from).some(({ row, column }) => row === to.row && column === to.column);
    }; // might be useful for 'check'

    private isOnBoard = (square: Square): boolean => {
        // here or in knight.ts (for now knights can get outside the board)
        return square.row >= 0 && square.row < 8 && square.column >= 0 && square.column < 8;
    };

    private isOccupiedBySameColor = (square: Square, piece: Piece | null): boolean =>
        this.board.getPiece(square)?.color === piece?.color;
}

export { GameEngine };
