import { PieceNames } from '../../../enums';
import { Square } from '../../../models/Square';
import { Colors } from '../../../enums/Colors';

abstract class Piece {
    position: Square;
    name!: PieceNames;
    color: Colors;

    constructor(startingPosition: Square, color: Colors) {
        this.position = startingPosition;
        this.color = color;
    }

    move(destination: Square): void {
        this.position = destination;
    }

    abstract getPossibleMoves(): Square[];
}

export { Piece };
