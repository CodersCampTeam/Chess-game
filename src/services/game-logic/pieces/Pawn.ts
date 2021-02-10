import { PieceNames } from '../../../enums';
import { Piece } from '../pieces/Piece';
import { Colors } from '../../../enums/Colors';
import { Square } from '../../../models/Square';
import { Board } from '../Board';

class Pawn extends Piece {
    name = PieceNames.PAWN;
    hasDoubleMoved = false;

    getPossibleMoves(board: Board): Square[] {
        const moves: Square[] = [];
        let specialMove: Square | null = null;

        const moveDirection = this.getMoveDirection();
        const move = this.prepareMove(moveDirection);

        if (!this.hasMoved) {
            specialMove = this.prepareMove(moveDirection * 2);
        }

        if (move) moves.push(move);
        if (specialMove) moves.push(specialMove);

        this.removeMoveIfEnemy(board, moves);
        this.setPawnCaptures(board, moves);
        this.enPassant(board, moves);

        return moves;
    }

    move(destination: Square): void {
        if (Math.abs(this.position.row - destination.row) === 2) {
            this.hasDoubleMoved = true;
        }

        super.move(destination);
    }

    private getCapturingSquares(): Square[] {
        const moves: Square[] = [];

        const moveDirection = this.getMoveDirection();
        const captureLeft = this.prepareMove(moveDirection, -1);
        const captureRight = this.prepareMove(moveDirection, 1);

        if (captureLeft) moves.push(captureLeft);
        if (captureRight) moves.push(captureRight);

        return moves;
    }

    private prepareMove(rowStep: number, colStep: number = 0): Square | null {
        const move = new Square(this.position.row + rowStep, this.position.column + colStep);

        // Check if out of boundaries
        if (this.isOutOfBoundaries(move)) {
            return null;
        }
        return move;
    }

    private isOutOfBoundaries(move: Square): boolean {
        return move.row > 7 || move.column > 7 || move.row < 0 || move.column < 0;
    }

    /**
     * Removes move from array if on target square stands the enemy
     */
    private removeMoveIfEnemy(board: Board, pieceMoves: Square[]): void {
        pieceMoves.forEach((move) => {
            if (board.getPiece(move) && !board.isOccupiedBySameColorPiece(move, this)) {
                pieceMoves.pop();
            }
        });
    }

    private setPawnCaptures(board: Board, pieceMoves: Square[]): void {
        let capturingSquares = this.getCapturingSquares();
        capturingSquares = capturingSquares.filter((c) => {
            return !board.isOccupiedBySameColorPiece(c, this) && board.getPiece(c);
        });
        capturingSquares.forEach((m) => {
            pieceMoves.push(m);
        });
    }

    private enPassant(board: Board, pieceMoves: Square[]): void {
        if (
            (this.color === Colors.WHITE && this.position.row === 3) ||
            (this.color === Colors.BLACK && this.position.row === 4)
        ) {
            const squareLeft = new Square(this.position.row, this.position.column - 1);
            const squareRight = new Square(this.position.row, this.position.column + 1);

            [squareLeft, squareRight].forEach((square) => {
                const lastMove = board.getLastMove();
                const piece = board.getPiece(square);
                if (
                    lastMove &&
                    lastMove?.[0].name === PieceNames.PAWN &&
                    (lastMove?.[0] as Pawn).hasDoubleMoved &&
                    !board.isOccupiedBySameColorPiece(square, this)
                ) {
                    pieceMoves.push(new Square(this.position.row + this.getMoveDirection(), square.column));
                }
            });
        }
    }
}

export { Pawn };
