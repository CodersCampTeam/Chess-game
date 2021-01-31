import { PieceNames, Sides } from '../../../enums';
import { Square } from '../../../models/Square';

abstract class Piece {
    position: Square;
    name: PieceNames;
    side: Sides;

    constructor(startingPosition: Square, side: Sides) {
        this.position = startingPosition;
        this.side = side;
    }

    abstract getPossibleMoves(): void;
}

export { Piece };
