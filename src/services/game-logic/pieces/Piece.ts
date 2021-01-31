import { PieceNames, Sides } from '../../../enums';
import { Move } from '../../../models/Move';
import { Square } from '../../../models/Square';
import { ColorsEnum } from '../ColorsEnum';

abstract class Piece {
    position: Square;
    name!: PieceNames;
    color: ColorsEnum;

    constructor(startingPosition: Square, color: ColorsEnum) {
        this.position = startingPosition;
        this.color = color;
    }

    move(destination: Square): void {
        this.position = destination;
    }

    abstract getPossibleMoves(): Move[];
}
