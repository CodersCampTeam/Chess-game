import { Rook } from '../../../../src/services/game-logic/pieces/Rook';
import { Square } from '../../../../src/models/Square';
import { Colors } from '../../../../src/enums/Colors';

describe('Testing Rook.getPossibleMoves()', () => {
    describe.each([
        [3, 3, Colors.White],
        [0, 0, Colors.White],
        [0, 7, Colors.Black],
        [3, 3, Colors.Black],
    ])('Rook shall be able to move to each square in its row/column except for the occupied square', 
    (row: number, column: number, color: Colors) => {
        test(`Rook moves from row ${row}, column ${column}`, () => {
            // Setup
            const staringSquare: Square = new Square(row, column);
            const rook: Rook = new Rook(staringSquare, color);
            const possibleMoves: Array<Square> = rook.getPossibleMoves();
            const movesRow: Array<Square> = possibleMoves.filter(move => move.row===row)
            const movesColumn: Array<Square> = possibleMoves.filter(move => move.column===column)
            const movesSelf: Array<Square> = movesColumn.filter(move => move.row===row)
            const expectedRows: Array<number> = [0,1,2,3,4,5,6,7].filter(el => el !== row)
            const possibleRows: Array<number> = movesColumn.map(m => m.row)
            const expectedColumns: Array<number> = [0,1,2,3,4,5,6,7].filter(el => el !== column)
            const possibleColumns: Array<number> = movesRow.map(m => m.column)
            // Test
            expect(possibleMoves.length).toBe(14);
            expect(movesRow.length).toBe(7);
            expect(movesColumn.length).toBe(7);
            expect(movesSelf.length).toBe(0);
            expect(expectedRows).toEqual(possibleRows);
            expect(expectedColumns).toEqual(possibleColumns);
        });
    });
});
