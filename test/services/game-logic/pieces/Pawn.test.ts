import { Pawn } from '../../../../src/services/game-logic/pieces/Pawn';
import { Square } from '../../../../src/models/Square';
import { Colors } from '../../../../src/enums/Colors';
import { Board } from '../../../../src/services/game-logic/Board';

describe('Testing Pawn.getPossibleMoves()', () => {
    describe.each([
        [Colors.BLACK, 1, 1, 2, 3],
        [Colors.WHITE, 6, 1, 5, 4]
    ])(
        'Pawn shall return 1 possible move',
        (color: Colors, row: number, column: number, rowExpected1: number, rowExpected2: number) => {
            test(`${Colors[color]} Pawn moves from row ${row}, column ${column}`, () => {
                // Setup
                const board = new Board();
                const staringSquare = new Square(row, column);
                const pawn = new Pawn(staringSquare, color);

                const possibleMoves: Array<Square> = pawn.getPossibleMoves(board);

                // Test
                expect(possibleMoves.length).toBe(2);

                expect(possibleMoves[0].column).toBe(column);
                expect(possibleMoves[0].row).toBe(rowExpected1);

                expect(possibleMoves[1].column).toBe(column);
                expect(possibleMoves[1].row).toBe(rowExpected2);
            });
        }
    );
    describe.each([
        [Colors.BLACK, 2, 1, 4],
        [Colors.WHITE, 5, 1, 3]
    ])('Pawn shall return 1 possible move', (color: Colors, row: number, column: number, rowExpected: number) => {
        test(`${Colors[color]} Pawn moves from row ${row}, column ${column}`, () => {
            // Setup
            const board = new Board();
            const startingSquare = new Square(row, column);
            const pawn = new Pawn(startingSquare, color);

            // Move pawn 1 square forward
            let possibleMoves: Array<Square> = pawn.getPossibleMoves(board);
            pawn.move(possibleMoves.find((move) => Math.abs(move.row - pawn.position.row) === 1));

            // Get moves
            possibleMoves = pawn.getPossibleMoves(board);

            // Test
            expect(possibleMoves.length).toBe(1);

            expect(possibleMoves[0].column).toBe(column);
            expect(possibleMoves[0].row).toBe(rowExpected);
        });
    });
    describe.each([
        [Colors.BLACK, 7, 1],
        [Colors.WHITE, 0, 0]
    ])('Pawn shall return 0 possible moves', (color: Colors, row: number, column: number) => {
        test(`${Colors[color]} Pawn moves from row ${row}, column ${column}`, () => {
            // Setup
            const board = new Board();
            const staringSquare = new Square(row, column);
            const pawn = new Pawn(staringSquare, color);
            pawn.hasMoved = true;

            const possibleMoves: Array<Square> = pawn.getPossibleMoves(board);

            // Test
            expect(possibleMoves.length).toBe(0);
        });
    });
});
