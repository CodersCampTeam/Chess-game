import { Move, Square } from '../../../models/Square';

abstract class Piece {
    position: Square;

    constructor(startingPosition: Square) {
        this.position = startingPosition;
    }

    abstract getPossibleMoves(): Move[];
}

interface PieceConstructor {
    new (startingPosition: Square): Piece;
}

export { Piece, PieceConstructor };
