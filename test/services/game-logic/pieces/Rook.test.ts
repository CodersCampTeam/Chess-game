import { Rook } from '../../../../src/services/game-logic/pieces/Rook';
import { Square } from '../../../../src/models/Square';
import { Colors } from '../../../../src/enums/Colors';

describe('Testing Rook.getPossibleMoves()', () => {
    describe.each([
        [3, 3, Colors.WHITE],
        [0, 0, Colors.WHITE],
        [0, 7, Colors.BLACK],
        [3, 3, Colors.BLACK]
    ])(
        'Rook shall be able to move to each square in its row/column except for the occupied square',
        (row: number, column: number, color: Colors) => {
            test(`Rook moves from row ${row}, column ${column}`, () => {
                // Setup
                const startingSquare = new Square(row, column);
                const rook = new Rook(startingSquare, color);
                const possibleMoves = rook.getPossibleMoves();
                const movesRow = possibleMoves.filter((move) => move.row === row);
                const movesColumn = possibleMoves.filter((move) => move.column === column);
                const movesSelf = movesColumn.filter((move) => move.row === row);
                const expectedRows = [0, 1, 2, 3, 4, 5, 6, 7].filter((el) => el !== row);
                const possibleRows = movesColumn.map((m) => m.row);
                const expectedColumns = [0, 1, 2, 3, 4, 5, 6, 7].filter((el) => el !== column);
                const possibleColumns = movesRow.map((m) => m.column);
                // Test
                expect(possibleMoves.length).toBe(14);
                expect(movesRow.length).toBe(7);
                expect(movesColumn.length).toBe(7);
                expect(movesSelf.length).toBe(0);
                expect(expectedRows).toEqual(possibleRows);
                expect(expectedColumns).toEqual(possibleColumns);
            });
        }
    );
});
