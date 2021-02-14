import { PieceNames, Constants, Colors } from '../../enums';
import { Square } from '../../models/Square';
import { Board } from './Board';
import { King } from './pieces/King';
import { Piece } from './pieces/Piece';

class GameEngine {
    board: Board;

    constructor() {
        this.board = new Board();
    }

    getLegalMoves = (square: Square): Square[] => {
        const piece = this.board.getPiece(square);
        let legalMoves = piece?.getPossibleMoves(this.board) ?? [];
        if (piece?.name === PieceNames.KING) {
            legalMoves = legalMoves.filter(
                (move) => !this.isCastling(move, piece) || this.isCastlingLegal(move, piece)
            );
        }
        return legalMoves
            .filter((destination) => !this.isOccupiedBySameColor(destination, piece))
            .filter((move) => this.moveNotResultWithCheck(move, piece, square));
    };

    moveNotResultWithCheck(move: Square, piece: Piece | null, square: Square): boolean {
        const potentialMove = new Square(move.row, move.column);
        const potentialPiece = this.board.getPiece(potentialMove);
        const hasMoved = piece?.hasMoved || false;
        this.movePiece(square, potentialMove, true);
        piece!.hasMoved = true;
        const isMovePossible = !this.isCheck(piece);

        this.movePiece(potentialMove, square, true);
        piece!.hasMoved = hasMoved;

        if (potentialPiece)
            this.board.state[potentialPiece.position.row][potentialPiece.position.column] = potentialPiece;

        return isMovePossible;
    }

    private isCheck(piece: Piece | null): boolean {
        const color = piece?.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK;
        const currentPlayerKing = this.getKingForCheck(piece)?.position;
        const isChecked = this.isKingUnderCheck(color, currentPlayerKing);
        return isChecked;
    }

    isKingUnderCheck(color: Colors, piecePosition: Square | undefined): boolean {
        let checked = false;
        this.board.checkAllSquares((square: Piece) => {
            if (square && square.color === color) {
                checked =
                    checked ||
                    square
                        .getPossibleMoves(this.board)
                        .some((move) => move.row === piecePosition?.row && move.column === piecePosition.column);
            }
        });
        return checked;
    }

    getKingForCheck = (piece: Piece | null): King | null => {
        let king = null;
        this.board.checkAllSquares((square: Piece) => {
            if (square && square.color === piece?.color && square.name === PieceNames.KING) {
                king = square;
            }
        });
        return king;
    };

    public runSpecialRoutines(location: Square, destination: Square): void {
        const locationPiece = this.board.getPiece(location);

        if (locationPiece?.name === PieceNames.PAWN) {
            this.performEnPassat(locationPiece, destination);
        } else if (locationPiece?.name === PieceNames.KING) {
            this.performCastling(location, destination);
        }
    }

    public movePiece(location: Square, destination: Square, potentialMove: boolean): void {
        const piece = this.board.getPiece(location);
        if (piece) {
            if (!potentialMove) this.runSpecialRoutines(piece?.position, destination);
            this.board.movePiece(location, destination, potentialMove);
        }
    }

    private performEnPassat(locationPiece: Piece, destination: Square) {
        const enPassatPiece = this.board.getPiece(
            new Square(-locationPiece.getMoveDirection() + destination.row, destination.column)
        );
        if (enPassatPiece?.name === PieceNames.PAWN && this.board.getLastMove()?.[0] === enPassatPiece) {
            this.board.resetSquare(enPassatPiece.position);
        }
    }

    private performCastling(location: Square, destination: Square): void {
        if (destination.column - location.column === Constants.KINGSIDE_CASTLING) {
            this.board.movePiece(
                { row: location.row, column: Constants.KINGSIDE_ROOK_COLUMN },
                { row: location.row, column: Constants.KINGSIDE_ROOK_DESTINATION_COLUMN },
                false
            );
        } else if (destination.column - location.column === Constants.QUEENSIDE_CASTLING) {
            this.board.movePiece(
                { row: location.row, column: Constants.QUEENSIDE_ROOK_COLUMN },
                { row: location.row, column: Constants.QUEENSIDE_ROOK_DESTINATION_COLUMN },
                false
            );
        }
    }
    private isCastling = (square: Square, piece: Piece): boolean => {
        return Math.abs(piece.position.column - square.column) > 1;
    };

    private isCastlingLegal = (square: Square, piece: Piece): boolean => {
        const rook = this.board.getPiece({
            row: piece.position.row,
            column:
                square.column - piece.position.column === Constants.KINGSIDE_CASTLING
                    ? Constants.KINGSIDE_ROOK_COLUMN
                    : Constants.QUEENSIDE_ROOK_COLUMN
        });
        const rookTarget = {
            row: piece.position.row,
            column:
                square.column - piece.position.column === Constants.KINGSIDE_CASTLING
                    ? Constants.KINGSIDE_ROOK_DESTINATION_COLUMN
                    : Constants.QUEENSIDE_ROOK_DESTINATION_COLUMN
        };
        const passedSquare = {
            row: piece.position.row,
            column:
                square.column - piece.position.column === Constants.KINGSIDE_CASTLING
                    ? Constants.KINGSIDE_PASSED_SQUARE
                    : Constants.QUEENSIDE_PASSED_SQUARE
        };
        return rook
            ? !rook.hasMoved &&
                  this.canMoveTo(rook.position, rookTarget) &&
                  this.moveNotResultWithCheck(passedSquare, piece, piece?.position)
            : false;
    };

    private canMoveTo = (from: Square, to: Square): boolean => {
        return this.getLegalMoves(from).some(({ row, column }) => row === to.row && column === to.column);
    };

    private isOccupiedBySameColor = (square: Square, piece: Piece | null): boolean =>
        this.board.getPiece(square)?.color === piece?.color;
}

export { GameEngine };
