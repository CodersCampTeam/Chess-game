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

interface PieceConstructor {
    new (startingPosition: Square, side: Sides): Piece;
}

export { Piece, PieceConstructor };
