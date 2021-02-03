import { Colors } from '../../../../src/enums';
import { Square } from '../../../../src/models/Square';
import { Knight } from '../../../../src/services/game-logic/pieces/Knight';

test.each([
    [
        Colors.White,
        7,
        5,
        [
            new Square(9, 6),
            new Square(8, 7),
            new Square(6, 7),
            new Square(5, 6),
            new Square(5, 4),
            new Square(6, 3),
            new Square(8, 3),
            new Square(9, 4)
        ]
    ],
    [
        Colors.BLACK,
        3,
        6,
        [
            new Square(5, 7),
            new Square(4, 8),
            new Square(2, 8),
            new Square(1, 7),
            new Square(1, 5),
            new Square(2, 4),
            new Square(4, 4),
            new Square(5, 5)
        ]
    ]
])(
    'should return knights possible moves',
    (color: Colors, row: number, column: number, expectedMoves: { row: number; column: number }[]) => {
        const knight = new Knight({ column: column, row: row }, color);
        expect(knight.getPossibleMoves()).toEqual(expectedMoves);
    }
);
