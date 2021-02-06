import { Square } from '../../../../src/models/Square';
import { Bishop } from '../../../../src/services/game-logic/pieces/Bishop';
import { Colors } from '../../../../src/enums';

describe('should correct display possible moves for bishop', () => {
    test('Correct moves from corner', () => {
        const field = new Square(0, 0);
        const bishop: Bishop = new Bishop(field, Colors.BLACK);
        const correctMoves = [
            new Square(1, 1),
            new Square(2, 2),
            new Square(3, 3),
            new Square(4, 4),
            new Square(5, 5),
            new Square(6, 6),
            new Square(7, 7)
        ];
        expect(JSON.stringify(bishop.getPossibleMoves())).toEqual(JSON.stringify(correctMoves));
    });
    test('Correct moves from center point', () => {
        const field = new Square(4, 4);
        const bishop: Bishop = new Bishop(field, Colors.BLACK);
        const correctMoves = [
            new Square(0, 0),
            new Square(1, 1),
            new Square(1, 7),
            new Square(2, 2),
            new Square(2, 6),
            new Square(3, 3),
            new Square(3, 5),
            new Square(5, 3),
            new Square(5, 5),
            new Square(6, 2),
            new Square(6, 6),
            new Square(7, 1),
            new Square(7, 7)
        ];
        expect(JSON.stringify(bishop.getPossibleMoves())).toEqual(JSON.stringify(correctMoves));
    });
});
