import { PieceNames } from '../../../enums';
import { Piece } from '../pieces/Piece';
import { Colors } from '../../../enums/Colors';
import { Square } from '../../../models/Square';

class Pawn extends Piece {
    name = PieceNames.PAWN;
    hasMoved = false;

    getPossibleMoves(): Square[] {
        const moves: Square[] = [];
        let specialMove: Square | null = null;

        // Assume that white plays on bottom
        // row = 0, column = 0 means left upper corner
        const moveDirection = this.color === Colors.WHITE ? -1 : 1;
        const move = this.prepareMove(moveDirection);

        if (!this.hasMoved) {
            specialMove = this.prepareMove(moveDirection * 2);
        }

        if (move) moves.push(move);
        if (specialMove) moves.push(specialMove);

        return moves;
    }

    getCapturingSquares(): Square[] {
        const moves: Square[] = [];

        // Assume that white plays on bottom
        // row = 0, column = 0 means left upper corner
        const moveDirection = this.color === Colors.WHITE ? -1 : 1;
        const capture1 = this.prepareMove(moveDirection, -1);
        const capture2 = this.prepareMove(moveDirection, 1);

        if (capture1) moves.push(capture1);
        if (capture2) moves.push(capture2);

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
}

export { Pawn };
