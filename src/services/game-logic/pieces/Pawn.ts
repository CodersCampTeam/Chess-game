import { PieceNames } from '../../../enums';
import { Square } from '../../../models/Square';
import { Piece } from './Piece';

class Pawn extends Piece {
    name = PieceNames.PAWN;

    getPossibleMoves(): Square[] {
        return [{ x: this.position.x - 1, y: this.position.y }];
    }
}

export { Pawn };
