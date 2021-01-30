<<<<<<< HEAD
import { PieceNames, Sides } from '../../../enums';
=======
>>>>>>> 2fbad26 (initial architecture)
import { Square } from '../../../models/Square';

abstract class Piece {
    position: Square;
<<<<<<< HEAD
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

export { Piece };
=======

    constructor(startingPosition: Square) {
        this.position = startingPosition;
    }

    abstract getPossibleMoves(): void;
}

interface PieceConstructor {
    new (startingPosition: Square): Piece;
}

export { Piece, PieceConstructor };
>>>>>>> 2fbad26 (initial architecture)
