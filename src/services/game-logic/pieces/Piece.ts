<<<<<<< HEAD
<<<<<<< HEAD
import { PieceNames, Sides } from '../../../enums';
=======
>>>>>>> 2fbad26 (initial architecture)
=======
import { PieceNames } from '../../../enums/PieceNames';
>>>>>>> 2149da9 (visible piece)
import { Square } from '../../../models/Square';

abstract class Piece {
    position: Square;
<<<<<<< HEAD
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
=======
    name: PieceNames;
>>>>>>> 2149da9 (visible piece)

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
