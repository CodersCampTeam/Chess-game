import { PieceNames } from '../../../enums';
import { Square } from '../../../models/Square';
import { Piece } from './Piece';

class Knight extends Piece {
    name = PieceNames.KNIGHT;

    getPossibleMoves(): Square[] {
        let possibleRowMoves: number[] = [2, 1, -1, -2, -2, -1, 1, 2];
        let possibleColumnMoves: number[] = [1, 2, 2, 1, -1, -2, -2, -1];

        let destination: Square[] = [];
        let { row, column } = this.position;

        for (let i = 0; i < possibleRowMoves.length; i++) {
            destination.push(new Square(row + possibleRowMoves[i], column + possibleColumnMoves[i]));
        }

        return destination;
    }
}

export { Knight };
