import { PieceNames } from '../../../enums/PieceNames';
import { Square } from '../../../models/Square';
import { Piece } from './piece';

class Pawn extends Piece {
    name = PieceNames.PAWN;
    getPossibleMoves(): void {
        throw new Error('Method not implemented.');
    }
}

export { Pawn };
