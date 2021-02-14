import { PieceNames, Constants, Colors } from '../../enums';
import { Square } from '../../models/Square';
import { Board } from './Board';
import { King } from './pieces/King';
import { Piece } from './pieces/Piece';
import * as _ from 'lodash';

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

        legalMoves = legalMoves
            .filter((destination) => !this.isOccupiedBySameColor(destination, piece))
            .filter((move) => this.moveNotResultWithCheck(move, piece, square));

        const firstCollision = this.getFirstCollision(square);

        if (piece?.name === PieceNames.ROOK || piece?.name === PieceNames.QUEEN || piece?.name === PieceNames.PAWN) {
            const rook = legalMoves
                .filter((square) => !(square.row < firstCollision[0] && square.column === piece.position.column))
                .filter((square) => !(square.row > firstCollision[1] && square.column === piece.position.column))
                .filter((square) => !(square.column < firstCollision[2] && square.row === piece.position.row))
                .filter((square) => !(square.column > firstCollision[3] && square.row === piece.position.row))
                .filter((square) => !(square.row < firstCollision[4] && square.column < piece.position.column))
                .filter((square) => !(square.row > firstCollision[5] && square.column < piece.position.column))
                .filter((square) => !(square.row < firstCollision[6] && square.column > piece.position.column))
                .filter((square) => !(square.row > firstCollision[7] && square.column > piece.position.column));
            return rook;
        } else if (piece?.name === PieceNames.BISHOP) {
            const bishop = legalMoves
                .filter((square) => !(square.row < firstCollision[4] && square.column < piece.position.column))
                .filter((square) => !(square.row > firstCollision[5] && square.column < piece.position.column))
                .filter((square) => !(square.row < firstCollision[6] && square.column > piece.position.column))
                .filter((square) => !(square.row > firstCollision[7] && square.column > piece.position.column));

            return bishop;
        } else return legalMoves;
    };

    private detectAllCollisions = (square: Square) => {
        const possibleMoves = this.board.getPiece(square)?.getPossibleMoves(this.board).flat();

        const piecesPositionsOnBoard = this.board.state
            .map((e) => Object.entries(e).map(([_, y]) => y?.position))
            .flat();

        const collisions = piecesPositionsOnBoard.filter((obj) => {
            return possibleMoves?.some((obj2) => {
                return obj?.column == obj2?.column && obj?.row == obj2?.row;
            });
        });

        return collisions;
    };

    private getFirstCollision = (square: Square): number[] => {
        const directions: number[] = [];
        const collisions = this.detectAllCollisions(square);
        const piecePosition = this.board.getPiece(square)?.position;
        let [
            up,
            down,
            left,
            right,
            diagonallyUpLeft,
            diagonallyDownLeft,
            diagonallyUpRight,
            diagonallyDownRight
        ] = directions;

        up = Math.max(
            ...collisions
                .filter((obj) => {
                    return obj!.row < piecePosition!.row && obj!.column === piecePosition!.column;
                })
                .map((e) => e!.row)
        );
        directions.push(up);
        down = Math.min(
            ...collisions
                .filter((obj) => {
                    return obj!.row > piecePosition!.row && obj?.column === piecePosition?.column;
                })
                .map((e) => e!.row)
        );
        directions.push(down);
        left = Math.max(
            ...collisions
                .filter((obj) => {
                    return obj!.column < piecePosition!.column && obj?.row === piecePosition?.row;
                })
                .map((e) => e!.column)
        );
        directions.push(left);
        right = Math.min(
            ...collisions
                .filter((obj) => {
                    return obj!.column > piecePosition!.column && obj?.row === piecePosition?.row;
                })
                .map((e) => e!.column)
        );
        directions.push(right);
        diagonallyUpLeft = Math.max(
            ...collisions
                .filter((obj) => {
                    return (
                        obj!.row < piecePosition!.row &&
                        obj!.row - obj!.column === piecePosition!.row - piecePosition!.column
                    );
                })
                .map((e) => e!.row)
        );
        directions.push(diagonallyUpLeft);
        diagonallyDownLeft = Math.min(
            ...collisions
                .filter((obj) => {
                    return (
                        obj!.row > piecePosition!.row &&
                        obj!.row + obj!.column === piecePosition!.row + piecePosition!.column
                    );
                })
                .map((e) => e!.row)
        );
        directions.push(diagonallyDownLeft);
        diagonallyUpRight = Math.max(
            ...collisions
                .filter((obj) => {
                    return (
                        obj!.row < piecePosition!.row &&
                        obj!.row + obj!.column === piecePosition!.row + piecePosition!.column
                    );
                })
                .map((e) => e!.row)
        );
        directions.push(diagonallyUpRight);
        diagonallyDownRight = Math.min(
            ...collisions
                .filter((obj) => {
                    return (
                        obj!.row > piecePosition!.row &&
                        obj!.row - obj!.column === piecePosition!.row - piecePosition!.column
                    );
                })
                .map((e) => e!.row)
        );
        directions.push(diagonallyDownRight);
        return directions;
    };

    isCheckMate(selectedPiece: Piece | null): boolean {
        const checkedMate: boolean[] = [];
        this.board.checkAllSquares((square: Piece) => {
            if (square && square.color != selectedPiece?.color) {
                this.getLegalMoves(square.position).length > 0 ? checkedMate.push(false) : checkedMate.push(true);
            }
        });
        return checkedMate.every((el) => el);
    }

    moveNotResultWithCheck(move: Square, piece: Piece | null, square: Square): boolean {
        const boardCopy = _.cloneDeep(this.board.state);
        const potentialMove = new Square(move.row, move.column);
        const potentialPiece = this.board.getPiece(potentialMove);
        const hasMoved = piece?.hasMoved || false;
        this.movePiece(square, potentialMove, true);
        piece!.hasMoved = true;
        const isMovePossible = !this.isCheck(piece);

        this.movePiece(potentialMove, square, true);
        piece!.hasMoved = hasMoved;

        if (potentialPiece) {
            this.board.state[potentialPiece.position.row][potentialPiece.position.column] = potentialPiece;
        }
        this.board.state = boardCopy;
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
                const firstCollision = this.getFirstCollision(square.position);
                if (
                    square?.name === PieceNames.ROOK ||
                    square?.name === PieceNames.QUEEN ||
                    square?.name === PieceNames.PAWN
                ) {
                    checked =
                        checked ||
                        square
                            .getPossibleMoves(this.board)
                            .filter((move) => !(move.row < firstCollision[0] && move.column === square.position.column))
                            .filter((move) => !(move.row > firstCollision[1] && move.column === square.position.column))
                            .filter((move) => !(move.column < firstCollision[2] && move.row === square.position.row))
                            .filter((move) => !(move.column > firstCollision[3] && move.row === square.position.row))
                            .filter((move) => !(move.row < firstCollision[4] && move.column < square.position.column))
                            .filter((move) => !(move.row > firstCollision[5] && move.column < square.position.column))
                            .filter((move) => !(move.row < firstCollision[6] && move.column > square.position.column))
                            .filter((move) => !(move.row > firstCollision[7] && move.column > square.position.column))
                            .some((move) => move.row === piecePosition?.row && move.column === piecePosition.column);
                } else if (square?.name === PieceNames.BISHOP) {
                    checked =
                        checked ||
                        square
                            .getPossibleMoves(this.board)
                            .filter((move) => !(move.row < firstCollision[4] && move.column < square.position.column))
                            .filter((move) => !(move.row > firstCollision[5] && move.column < square.position.column))
                            .filter((move) => !(move.row < firstCollision[6] && move.column > square.position.column))
                            .filter((move) => !(move.row > firstCollision[7] && move.column > square.position.column))
                            .some((move) => move.row === piecePosition?.row && move.column === piecePosition.column);
                } else
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

        const destinationPiece = this.board.getPiece(destination);

        if (
            !destinationPiece &&
            enPassatPiece?.name === PieceNames.PAWN &&
            JSON.stringify(this.board.getLastMove()?.[0]) === JSON.stringify(enPassatPiece)
        ) {
            this.board.resetSquare(enPassatPiece.position);
        }
    }

    public changePawnAfterPromotion(square: Square, selectedPiece: PieceNames, color: Colors): void {
        this.board.promotePawn(square, selectedPiece, color);
    }

    public checkPawnPromotion(destination: Square): Colors | null {
        const piece = this.board.getPiece(destination);

        if (
            piece?.name === PieceNames.PAWN &&
            destination.row === Constants.WHITE_END_ROW &&
            piece?.color === Colors.WHITE
        ) {
            return Colors.WHITE;
        }
        if (
            piece?.name === PieceNames.PAWN &&
            destination.row === Constants.BLACK_END_ROW &&
            piece?.color === Colors.BLACK
        ) {
            return Colors.BLACK;
        }
        return null;
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
