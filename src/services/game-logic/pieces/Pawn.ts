import { Move, Square } from '../../../models/Square';
import { Piece } from './piece';

class Pawn extends Piece {
    getPossibleMoves(): Move[] {
        throw new Error('Method not implemented.');
    }
}

export { Pawn };
