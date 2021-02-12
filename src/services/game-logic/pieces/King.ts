import { PieceNames } from '../../../enums';
import { Square } from '../../../models/Square';
import { Piece } from './Piece';

class King extends Piece {
    name = PieceNames.KING;

    getPossibleMoves(): Square[] {
        let positions = [
            [-1, -1],
            [0, -1],
            [1, 1],
            [-1, 0],
            [1, 0],
            [0, 1],
            [-1, 1],
            [1, -1]
        ];
        if (!this.hasMoved) positions = [...positions, [0, 2], [0, -2]];
        const [row, column] = positions;

        const possibleMoves = positions.map(([row, column]) => ({
            row: this.position.row + row,
            column: this.position.column + column
        }));

        const kingPossibleMovesOnBoard = possibleMoves.filter(
            (move) => move.row >= 0 && move.row < 8 && move.column >= 0 && move.column < 8
        );
        return kingPossibleMovesOnBoard;
    }
}

export { King };
