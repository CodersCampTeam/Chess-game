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
        const pieceMoves = piece!.getPossibleMoves(this.board);

        const firstCollission = this.getFirstCollission(square);
        const pieceMoves2 = pieceMoves
            .filter(this.isOnBoard)
            .filter((square) => !this.isOccupiedBySameColor(square, piece));

        if (piece?.name === PieceNames.ROOK || piece?.name === PieceNames.QUEEN) {
            const rook = pieceMoves2
                .filter((square) => !(square.row < firstCollission[0] && square.column === piece.position.column))
                .filter((square) => !(square.row > firstCollission[1] && square.column === piece.position.column))
                .filter((square) => !(square.column < firstCollission[2] && square.row === piece.position.row))
                .filter((square) => !(square.column > firstCollission[3] && square.row === piece.position.row))
                .filter((square) => !(square.row < firstCollission[4] && square.column < piece.position.column))
                .filter((square) => !(square.row > firstCollission[5] && square.column < piece.position.column))
                .filter((square) => !(square.row < firstCollission[6] && square.column > piece.position.column))
                .filter((square) => !(square.row > firstCollission[7] && square.column > piece.position.column));
            return rook;
        } else if (piece?.name === PieceNames.BISHOP) {
            const bishop = pieceMoves2
                .filter((square) => !(square.row < firstCollission[4] && square.column < piece.position.column))
                .filter((square) => !(square.row > firstCollission[5] && square.column < piece.position.column))
                .filter((square) => !(square.row < firstCollission[6] && square.column > piece.position.column))
                .filter((square) => !(square.row > firstCollission[7] && square.column > piece.position.column));

            return bishop;
        } else return pieceMoves2;
    };
    private detectAllCollisions = (square: Square) => {
        const PossibleMoves = this.board.getPiece(square)?.getPossibleMoves(this.board).flat();

        const piecesPositionsOnBoard = this.board.state
            .map((e) => Object.entries(e).map(([, y]) => y?.position))
            .flat();

        const collisions = piecesPositionsOnBoard.filter(function (obj) {
            return PossibleMoves?.some(function (obj2) {
                return obj?.column == obj2?.column && obj?.row == obj2?.row;
            });
        });

        return collisions;
    };

    private getFirstCollission = (square: Square): number[] => {
        const directions: number[] = [];
        const collisions = this.detectAllCollisions(square);
        const piecePosition = this.board.getPiece(square)?.position;
        let [
            up,
            down,
            left,
            rigth,
            diagonallyUpLeft,
            diagonallyDownLeft,
            diagonallyUpRight,
            diagonallyDownRight
        ] = directions;

        up = Math.max(
            ...collisions
                .filter(function (obj) {
                    return (obj!.row < piecePosition!.row) && (obj!.column === piecePosition!.column);
                })
                .map((e) => e!.row)
        );
        directions.push(up);
        down = Math.min(
            ...collisions
                .filter(function (obj) {
                    return (obj!.row > piecePosition!.row) && (obj?.column === piecePosition?.column);
                })
                .map((e) => e!.row)
        );
        directions.push(down);
        left = Math.max(
            ...collisions
                .filter(function (obj) {
                    return (obj!.column < piecePosition!.column) && (obj?.row === piecePosition?.row);
                })
                .map((e) => e!.column)
        );
        directions.push(left);
        rigth = Math.min(
            ...collisions
                .filter(function (obj) {
                    return (obj!.column > piecePosition!.column) && (obj?.row === piecePosition?.row);
                })
                .map((e) => e!.column)
        );
        directions.push(rigth);
        diagonallyUpLeft = Math.max(
            ...collisions
                .filter(function (obj) {
                    return (obj!.row < piecePosition!.row) &&
                        (obj!.row - obj!.column === piecePosition!.row - piecePosition!.column);
                })
                .map((e) => e!.row)
        );
        directions.push(diagonallyUpLeft);
        diagonallyDownLeft = Math.min(
            ...collisions
                .filter(function (obj) {
                    return (obj!.row > piecePosition!.row) &&
                        (obj!.row + obj!.column === piecePosition!.row + piecePosition!.column);
                })
                .map((e) => e!.row)
        );
        directions.push(diagonallyDownLeft);
        diagonallyUpRight = Math.max(
            ...collisions
                .filter(function (obj) {
                    return (obj!.row < piecePosition!.row ) && (obj!.row + obj!.column) === (piecePosition!.row + piecePosition!.column)
                })
                .map((e) => e!.row)
        );
        directions.push(diagonallyUpRight);
        diagonallyDownRight = Math.min(
            ...collisions
                .filter(function (obj) {
                    return (obj!.row > piecePosition!.row) && 
                        (obj!.row - obj!.column === piecePosition!.row - piecePosition!.column)
                })
                .map((e) => e!.row)
        );
        directions.push(diagonallyDownRight);
        return directions;
    };

    private isOnBoard = (square: Square): boolean => {
        // here or in knight.ts (for now knights can get outside the board)
        return square.row >= 0 && square.row < 8 && square.column >= 0 && square.column < 8;
    };

    private isOccupiedBySameColor = (square: Square, piece: Piece | null): boolean =>
        this.board.getPiece(square)?.color === piece?.color;
}

export { GameEngine };
