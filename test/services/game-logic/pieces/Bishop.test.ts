import { Square } from '../../../../src/models/Square';
import { Bishop } from '../../../../src/services/game-logic/pieces/Bishop';
import { Sides } from '../../../../src/enums';

describe('should correct display possible moves for bishop', () => {
    const field: Square = new Square();
    field.x = 0;
    field.y = 0;
    test('Correct moves in corners', () => {
        const bishop: Bishop = new Bishop(field, Sides.BLACK);
        expect(bishop.getPossibleMoves().length).toEqual(7);
    });
    test('Correct moves from point', () => {
        field.x = 5;
        field.y = 4;
        const bishop: Bishop = new Bishop(field, Sides.BLACK);
        const correctMoves = [
            { x: 1, y: 0 },
            { x: 2, y: 1 },
            { x: 2, y: 7 },
            { x: 3, y: 2 },
            { x: 3, y: 6 },
            { x: 4, y: 3 },
            { x: 4, y: 5 },
            { x: 6, y: 3 },
            { x: 6, y: 5 },
            { x: 7, y: 2 },
            { x: 7, y: 6 }
        ];
        expect(JSON.stringify(bishop.getPossibleMoves())).toEqual(JSON.stringify(correctMoves));
    });
});
