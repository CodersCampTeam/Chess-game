import { Pawn } from '../../../../src/services/game-logic/pieces/Pawn';
import { Square } from '../../../../src/models/Square';
import { Colors } from '../../../../src/enums/Colors';

describe('Testing Pawn.getPossibleMoves()', () => {
    describe.each([
        [Colors.BLACK, 1, 1, [new Square(2, 1), new Square(3, 1), new Square(2, 0), new Square(2, 2)]],
        [Colors.WHITE, 6, 1, [new Square(5, 1), new Square(4, 1), new Square(5, 0), new Square(5, 2)]]
    ])('Pawn shall return 4 possible moves', (color: Colors, row: number, column: number, expected) => {
        test(`${Colors[color]} Pawn moves from row ${row}, column ${column}`, () => {
            // Setup
            const staringSquare = new Square(row, column);
            const pawn = new Pawn(staringSquare, color);

            const possibleMoves: Array<Square> = pawn.getPossibleMoves();

            // Test
            expect(possibleMoves).toEqual(expected);
        });
    });
});
