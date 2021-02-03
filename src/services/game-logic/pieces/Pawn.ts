import { PieceNames } from '../../../enums';
import { Piece } from '../pieces/Piece';
import { Colors } from '../../../enums/Colors';
import { Square } from '../../../models/Square';

/**
 * This class implements Pawn behavoiur in chess
 */
class Pawn extends Piece {
    name = PieceNames.PAWN;

    /**
     * Returs possible moves of Pawn.
     */
    getPossibleMoves(): Square[] {
        const move = new Square(-1, -1);

        // Assume that white plays on bottom
        // row = 0, column = 0 means left upper corner
        if (this.color === Colors.WHITE) {
            move.column = this.position.column;
            move.row = this.position.row - 1;

            return move.row !== -1 ? [move] : [];
        } else if (this.color === Colors.BLACK) {
            move.column = this.position.column;
            move.row = this.position.row + 1;

            return move.row !== 8 ? [move] : [];
        } else {
            throw Error('Pawn color is not set');
        }
    }
}

export { Pawn };
