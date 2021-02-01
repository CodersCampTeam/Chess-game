import { Square } from '../../models/Square';
import { Colors } from '../../enums/Colors';
import { Bishop } from './pieces/Bishop';
import { Pawn } from './pieces/Pawn';
import { Rook } from './pieces/Rook';
import { Piece } from './pieces/Piece';
import { Knight } from './pieces/Knight';

class Board {
    public static BOARD_SIZE = 8;

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
        this.setupRooks();
        this.addPiece(new Bishop({ row: 7, column: 2 }, Colors.White));
        this.addPiece(new Bishop({ row: 7, column: 5 }, Colors.White));
        this.addPiece(new Bishop({ row: 0, column: 2 }, Colors.Black));
        this.addPiece(new Bishop({ row: 0, column: 5 }, Colors.Black));
        this.setupKnights();
    }

    private addPiece(piece: Piece) {
        this.state[piece.position.row][piece.position.column] = piece;
    }

    private setupPawns(): void {
        // Assume that white plays on bottom
        [
            { row: 1, color: Colors.Black },
            { row: 6, color: Colors.White }
        ].forEach((obj) => {
            for (let column = 0; column < Board.BOARD_SIZE; ++column) {
                const pawn = new Pawn({ column: column, row: obj.row }, obj.color);
                this.addPiece(pawn);
            }
        });
    }

    private setupRooks(): void {
        this.addPiece(new Rook({ column: 0, row: 0 }, Colors.Black));
        this.addPiece(new Rook({ column: 7, row: 0 }, Colors.Black));
        this.addPiece(new Rook({ column: 0, row: 7 }, Colors.White));
        this.addPiece(new Rook({ column: 7, row: 7 }, Colors.White));
    }

    private setupKnights(): void {
        this.addPiece(new Knight({ column: 1, row: 0 }, Colors.Black));
        this.addPiece(new Knight({ column: 5, row: 0 }, Colors.Black));
        this.addPiece(new Knight({ column: 1, row: 7 }, Colors.White));
        this.addPiece(new Knight({ column: 5, row: 7 }, Colors.White));
    }
}

export { Board };
