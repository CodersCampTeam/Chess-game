import { Sides } from '../../enums';
import { Square } from '../../models/Square';
import { Pawn } from './pieces/Pawn';
import { Piece } from './pieces/Piece';

class Board {
    private state: Array<Array<Piece | null>>;

    constructor() {
        const size = 8;
        this.state = new Array(size);
        for (let i = 0; i < this.state.length; i++) {
            this.state[i] = new Array(size);
        }

        this.setup();
        console.log(this);
    }

    public getPiece({ x, y }: Square): Piece | null {
        return this.state[x][y];
    }

    public movePiece(location: Square, destination: Square): void {
        this.state[location.x][location.y]?.move(destination);
        this.state[destination.x][destination.y] = this.state[location.x][location.y];
        this.state[location.x][location.y] = null;
    }

    private setup(): void {
        this.addPiece(new Pawn({ x: 6, y: 0 }, Sides.WHITE));
        this.addPiece(new Pawn({ x: 6, y: 1 }, Sides.WHITE));
    }

    private addPiece(piece: Piece) {
        this.state[piece.position.x][piece.position.y] = piece;
    }
}

export { Board };
