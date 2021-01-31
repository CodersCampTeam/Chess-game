import { PieceNames } from '../../../enums';
import { Piece } from './Piece';

class Pawn extends Piece {
    name = PieceNames.PAWN;
    getPossibleMoves(): void {
        throw new Error('Method not implemented.');
    }
}

export { Pawn };
