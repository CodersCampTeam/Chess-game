import { PieceNames, Sides } from '../../../enums';
import { Square } from '../../../models/Square';

abstract class Piece {
    position: Square;
    name!: PieceNames;
    side: Sides;

    constructor(startingPosition: Square, side: Sides) {
        this.position = startingPosition;
        this.side = side;
    }

    move(destination: Square): void {
        this.position = destination;
    }

    abstract getPossibleMoves(): Square[];
}
