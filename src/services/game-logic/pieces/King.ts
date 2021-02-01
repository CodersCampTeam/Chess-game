import { PieceNames } from '../../../enums';
import { Square } from '../../../models/Square';
import { Piece } from './Piece';

class King extends Piece {
	name = PieceNames.KING;

	getPossibleMoves(): Square[] {
		const positions: Array<number[]> = [
			[ -1, -1 ],
			[ 0, -1 ],
			[ 1, 1 ],
			[ -1, 0 ],
			[ 1, 0 ],
			[ 0, 1 ],
			[ -1, 1 ],
			[ 1, -1 ]
		];

		const possibleMoves: Square[] = positions.map((position) => ({
			row: this.position.row + position[0],
			column: this.position.column + position[1]
		}));

		return possibleMoves;
	}
}

export { King };
