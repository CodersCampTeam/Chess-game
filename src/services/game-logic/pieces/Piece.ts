import { PieceNames } from '../../../enums/PieceNames';
import { Square } from '../../../models/Square';

abstract class Piece {
    position: Square;
    name: PieceNames;

    constructor(startingPosition: Square) {
        this.position = startingPosition;
    }

    abstract getPossibleMoves(): void;
}

interface PieceConstructor {
    new (startingPosition: Square): Piece;
}

export { Piece, PieceConstructor };
