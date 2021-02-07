import { Square } from '../../../../src/models/Square';
import { Bishop } from '../../../../src/services/game-logic/pieces/Bishop';
import { Colors } from '../../../../src/enums';

describe('should correct display possible moves for bishop', () => {
    test('Correct moves from corner', () => {
        const field = new Square(0, 0);
        const bishop: Bishop = new Bishop(field, Colors.BLACK);
        const correctMoves = [
            { row: 1, column: 1 },
            { row: 2, column: 2 },
            { row: 3, column: 3 },
            { row: 4, column: 4 },
            { row: 5, column: 5 },
            { row: 6, column: 6 },
            { row: 7, column: 7 }
        ];
        expect(JSON.stringify(bishop.getPossibleMoves())).toEqual(JSON.stringify(correctMoves));
    });
    test('Correct moves from center point', () => {
        const field = new Square(4, 4);
        const bishop: Bishop = new Bishop(field, Colors.BLACK);
        const correctMoves = [
            { row: 0, column: 0 },
            { row: 1, column: 1 },
            { row: 1, column: 7 },
            { row: 2, column: 2 },
            { row: 2, column: 6 },
            { row: 3, column: 3 },
            { row: 3, column: 5 },
            { row: 5, column: 3 },
            { row: 5, column: 5 },
            { row: 6, column: 2 },
            { row: 6, column: 6 },
            { row: 7, column: 1 },
            { row: 7, column: 7 }
        ];
        expect(JSON.stringify(bishop.getPossibleMoves())).toEqual(JSON.stringify(correctMoves));
    });
});
