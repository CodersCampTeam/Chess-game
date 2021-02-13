import { PieceNames } from '../../../enums';
import { Square } from '../../../models/Square';
import { Colors } from '../../../enums/Colors';
import { Board } from '../Board';

abstract class Piece {
    position: Square;
    name!: PieceNames;
    color: Colors;
    hasMoved = false;

    constructor(startingPosition: Square, color: Colors) {
        this.position = startingPosition;
        this.color = color;
    }

    move(destination: Square): void {
        this.position = destination;
        this.hasMoved = true;
    }

    getMoveDirection(): number {
        // Assume that white plays on bottom
        // row = 0, column = 0 means left upper corner
        return this.color === Colors.WHITE ? -1 : 1;
    }

    abstract getPossibleMoves(board: Board): Square[];
}

export { Piece };
