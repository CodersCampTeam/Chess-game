import { Square } from '../../../models/Square';
import { Piece } from './Piece';
import { PieceNames } from '../../../enums/PieceNames';

class Queen extends Piece {
    name = PieceNames.QUEEN;

    getPossibleMoves(): Square[] {
        const possibleMoves: Square[] = [];
        for (let x = 0; x <= 7; x++) {
            for (let y = 0; y <= 7; y++) {
                if (
                    !this.isQueenPosition(x, y) &&
                    (this.isDiagonal(x, y) || this.isHorizonalMove(y) || this.isVerticalMove(x))
                ) {
                    possibleMoves.push({
                        row: x,
                        column: y
                    });
                }
            }
        }
        return possibleMoves;
    }

    private isHorizonalMove(column: number): boolean {
        return this.position.column === column;
    }
    private isVerticalMove(row: number): boolean {
        return this.position.row === row;
    }

    private isDiagonal(row: number, column: number): boolean {
        return Math.abs(this.position.row - row) === Math.abs(this.position.column - column);
    }
    private isQueenPosition(row: number, column: number): boolean {
        return this.position.row === row && this.position.column === column;
    }
}

export { Queen };
