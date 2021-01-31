import { PieceNames } from '../../../enums';
import { Piece } from './Piece';
import { ColorsEnum } from '../ColorsEnum';
import { Move } from '../../../models/Move';

/**
 * This class implements Pawn behavoiur in chess
 * @class
 */
class Pawn extends Piece {
    name = PieceNames.PAWN;

    /**
     * Returs possible moves of Pawn.
     * @returns {Array}
     */
    getPossibleMoves(): Move[] {
        const move = new Move();
        move.from.row = this.position.row;
        move.from.column = this.position.column;

        // Assume that white plays on bottom
        // row = 0, column = 0 means left upper corner
        if (this.color === ColorsEnum.White) {
            move.to.column = this.position.column;
            move.to.row = this.position.row - 1;

            return move.to.row !== -1 ? [move] : [];
        } else if (this.color === ColorsEnum.Black) {
            move.to.column = this.position.column;
            move.to.row = this.position.row + 1;

            return move.to.row !== 8 ? [move] : [];
        } else {
            throw Error('Pawn color is not set');
        }
    }
}

export { Pawn };
