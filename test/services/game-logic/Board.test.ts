import { Board } from '../../../src/services/game-logic/Board';
import { Colors } from '../../../src/enums/Colors';
import { Pawn } from '../../../src/services/game-logic/pieces/Pawn';

describe('Testing Board.setup()', () => {
    describe.each([
        [Colors.BLACK, 6],
        [Colors.WHITE, 1]
    ])('Pawn shall return 1 possible move', (color: Colors, row: number) => {
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

test(`should run function on all squares`, () => {
    let arr = [];
    const board = new Board();

    board.checkAllSquares((square) => {
        arr.push(square);
    });

    expect(arr.length).toBe(32);
});
