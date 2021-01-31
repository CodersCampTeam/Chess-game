import { Pawn } from '../../../../src/services/game-logic/pieces/Pawn';
import { Square } from '../../../../src/models/Square';
import { ColorsEnum } from '../../../../src/services/game-logic/ColorsEnum';
import { Move } from '../../../../src/models/Move';

describe('Testing Pawn.getPossibleMoves()', () => {
    describe.each([
        [ColorsEnum.Black, 1, 1, 2],
        [ColorsEnum.White, 6, 1, 5]
    ])('Pawn shall return 1 possible move', (color: ColorsEnum, row: number, column: number, rowExpected: number) => {
        test(`${ColorsEnum[color]} Pawn moves from row ${row}, column ${column}`, () => {
            // Setup
            const staringSquare: Square = new Square(row, column);
            const pawn: Pawn = new Pawn(staringSquare, color);

            const possibleMoves: Array<Move> = pawn.getPossibleMoves();

            // Test
            expect(possibleMoves.length).toBe(1);
            expect(possibleMoves[0].from.column).toBe(column);
            expect(possibleMoves[0].from.row).toBe(row);

            expect(possibleMoves[0].to.column).toBe(column);
            expect(possibleMoves[0].to.row).toBe(rowExpected);
        });
    });
    describe.each([
        [ColorsEnum.Black, 7, 1],
        [ColorsEnum.White, 0, 0]
    ])('Pawn shall return 0 possible moves', (color: ColorsEnum, row: number, column: number) => {
        test(`${ColorsEnum[color]} Pawn moves from row ${row}, column ${column}`, () => {
            // Setup
            const staringSquare: Square = new Square(row, column);
            const pawn: Pawn = new Pawn(staringSquare, color);

            const possibleMoves: Array<Move> = pawn.getPossibleMoves();

            // Test
            expect(possibleMoves.length).toBe(0);
        });
    });
});
