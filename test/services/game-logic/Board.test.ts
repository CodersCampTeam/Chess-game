import { Board } from '../../../src/services/game-logic/Board';
import { ColorsEnum } from '../../../src/services/game-logic/ColorsEnum';
import { Pawn } from '../../../src/services/game-logic/pieces/Pawn';

describe('Testing Board.setup()', () => {
    describe.each([
        [ColorsEnum.Black, 6],
        [ColorsEnum.White, 1]
    ])('Pawn shall return 1 possible move', (color: ColorsEnum, row: number) => {
        test(`${color} Pawn shall be initialized at row ${row}, column`, () => {
            // Setup
            const board: Board = new Board();

            // Test
            for (let column: number = 0; column < Board.BOARD_SIZE; ++column) {
                expect(board.getPiece({ row, column }) instanceof Pawn).toBeTruthy();
            }
        });
    });
});
