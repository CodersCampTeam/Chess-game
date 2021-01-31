import { Pawn } from '../../../../src/services/game-logic/pieces/Pawn';
import { Square } from '../../../../src/models/Square';
import { Colors } from '../../../../src/enums/Colors';

describe('Testing Pawn.getPossibleMoves()', () => {
    describe.each([
        [Colors.Black, 1, 1, 2],
        [Colors.White, 6, 1, 5]
    ])('Pawn shall return 1 possible move', (color: Colors, row: number, column: number, rowExpected: number) => {
        test(`${Colors[color]} Pawn moves from row ${row}, column ${column}`, () => {
            // Setup
            const staringSquare: Square = new Square(row, column);
            const pawn: Pawn = new Pawn(staringSquare, color);

            const possibleMoves: Array<Square> = pawn.getPossibleMoves();

            // Test
            expect(possibleMoves.length).toBe(1);

            expect(possibleMoves[0].column).toBe(column);
            expect(possibleMoves[0].row).toBe(rowExpected);
        });
    });
    describe.each([
        [Colors.Black, 7, 1],
        [Colors.White, 0, 0]
    ])('Pawn shall return 0 possible moves', (color: Colors, row: number, column: number) => {
        test(`${Colors[color]} Pawn moves from row ${row}, column ${column}`, () => {
            // Setup
            const staringSquare: Square = new Square(row, column);
            const pawn: Pawn = new Pawn(staringSquare, color);

            const possibleMoves: Array<Square> = pawn.getPossibleMoves();

            // Test
            expect(possibleMoves.length).toBe(0);
        });
    });
});
