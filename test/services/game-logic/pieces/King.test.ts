import { Square } from '../../../../src/models/Square';
import { King } from '../../../../src/services/game-logic/pieces/King';
import { Colors } from '../../../../src/enums';


describe('A king can move one square in any direction (horizontally, vertically, or diagonally)', () => {
	test('all possible moves from 5,3', () => {
		const position: Square = new Square();
		position.row = 5;
		position.column = 3;
		const king: King = new King(position, Colors.White);
		const correctMoves = [
			{ row: 4, column: 2 },
			{ row: 5, column: 2 },
			{ row: 6, column: 4 },
			{ row: 4, column: 3 },
			{ row: 6, column: 3 },
			{ row: 5, column: 4 },
			{ row: 4, column: 4 },
			{ row: 6, column: 2 }
		];
		expect(king.getPossibleMoves()).toEqual(correctMoves);
	});
});
