import { PieceNames } from '../../../enums';
import { Square } from '../../../models/Square';
import { Piece } from './Piece';

class King extends Piece {
	name = PieceNames.KING;

	getPossibleMoves(): Square[] {
		const positions = [ [ -1, -1 ], [ 0, -1 ], [ 1, 1 ], [ -1, 0 ], [ 1, 0 ], [ 0, 1 ], [ -1, 1 ], [ 1, -1 ] ];
		const [ row, column ] = positions;

		const possibleMoves = positions.map(([ row, column ]) => ({
			row: this.position.row + row,
			column: this.position.column + column
		}));

		return possibleMoves;
	}
}

export { King };
