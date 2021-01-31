import { Sides } from '../../enums';
import { Square } from '../../models/Square';
import { Pawn } from './pieces/Pawn';
import { PieceConstructor } from './pieces/Piece';

class Board extends Array {
    constructor() {
        const size = 8;
        super(size);
        Object.setPrototypeOf(this, Board.prototype);

        for (let i = 0; i < this.length; i++) {
            this[i] = new Array(size);
        }
        this.setup();
    }

    public setup(): void {
        this.addPiece(Pawn, { x: 6, y: 0 }, Sides.WHITE);
        this.addPiece(Pawn, { x: 6, y: 1 }, Sides.WHITE);
    }

    private addPiece(Piece: PieceConstructor, position: Square, side: Sides) {
        this[position.x][position.y] = new Piece(position, side);
    }
}

export { Board };
