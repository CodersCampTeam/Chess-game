import { Square } from '../../models/Square';
import { Pawn } from './pieces/Pawn';
import { Piece, PieceConstructor } from './pieces/piece';

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
        this.addPiece(Pawn, { x: 0, y: 0 });
    }

    private addPiece(Piece: PieceConstructor, position: Square) {
        this[position.x][position.y] = new Piece(position);
    }
}

export { Board };
