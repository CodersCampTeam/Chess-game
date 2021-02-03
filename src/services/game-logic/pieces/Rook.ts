import { PieceNames } from '../../../enums';
import { Piece } from '../pieces/Piece';
import { Square } from '../../../models/Square';

class Rook extends Piece {
    name = PieceNames.ROOK;

    getPossibleMoves() {
        let possibleMoves: Square[] = [];

        for (let i = 0; i < 8; i++) {
            if (this.position.column !== i) possibleMoves.push(new Square(this.position.row, i));
            if (this.position.row !== i) possibleMoves.push(new Square(i, this.position.column));
        }
        return possibleMoves;
    }
}

export { Rook };
