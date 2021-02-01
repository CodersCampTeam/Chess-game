import { Square } from '../../models/Square';
import { Colors } from '../../enums/Colors';
import { Pawn } from './pieces/Pawn';
import { Piece } from './pieces/Piece';
import { King } from './pieces/King';

class Board {
    public static BOARD_SIZE: number = 8;

    private state: Array<Array<Piece | null>>;

    constructor() {
        this.state = new Array(Board.BOARD_SIZE);
        for (let row = 0; row < Board.BOARD_SIZE; ++row) {
            this.state[row] = new Array(Board.BOARD_SIZE);
        }

        this.setup();
    }

    public getPiece({ row, column }: Square): Piece | null {
        return this.state[row][column];
    }

    public movePiece(location: Square, destination: Square): void {
        this.state[location.row][location.column]?.move(destination);
        this.state[destination.row][destination.column] = this.state[location.row][location.column];
        this.state[location.row][location.column] = null;
    }

    private setup(): void {
        this.setupPawns();
        this.setupKing();
    }

    private addPiece(piece: Piece) {
        this.state[piece.position.row][piece.position.column] = piece;
    }

    /** @method
     * @name setupPawns
     * @description Setups both white and black Pawn pieces on Board
     * @returns void
     */
    private setupPawns(): void {
        // Assume that white plays on bottom
        [
            { row: 1, color: Colors.Black },
            { row: 6, color: Colors.White }
        ].forEach((obj) => {
            for (let column = 0; column < Board.BOARD_SIZE; ++column) {
                let pawn = new Pawn({ column: column, row: obj.row }, obj.color);
                this.addPiece(pawn);
            }
        });
    }

    private setupKing(): void {
        this.addPiece(new King({ row: 0, column: 4 }, Colors.Black));
        this.addPiece(new King({ row: 7, column: 4 }, Colors.White));

    }
}

export { Board };
