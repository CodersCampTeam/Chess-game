import { Square } from '../../../models/Square';
import { Piece } from './piece';

class Pawn extends Piece {
    getPossibleMoves(): void {
        throw new Error('Method not implemented.');
    }
}

export { Pawn };
