import { Square } from '../../models/Square';
import { Colors } from '../../enums/Colors';
import { Bishop } from './pieces/Bishop';
import { Pawn } from './pieces/Pawn';
import { Rook } from './pieces/Rook';
import { Piece } from './pieces/Piece';
import { King } from './pieces/King';
import { Knight } from './pieces/Knight';
import { Queen } from './pieces/Queen';

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

    public isOccupiedBySameColorPiece = (square: Square, piece: Piece | null): boolean => {
        return this.getPiece(square)?.color === piece?.color;
    };

    private setup(): void {
        this.setupPawns();
        this.setupKing();
        this.setupRooks();
        this.setupBishop();
        this.setupKnights();
        this.setupQueens();
    }

    private addPiece(piece: Piece) {
        this.state[piece.position.row][piece.position.column] = piece;
    }

    private setupBishop(): void {
        this.addPiece(new Bishop({ row: 7, column: 2 }, Colors.WHITE));
        this.addPiece(new Bishop({ row: 7, column: 5 }, Colors.WHITE));
        this.addPiece(new Bishop({ row: 0, column: 2 }, Colors.BLACK));
        this.addPiece(new Bishop({ row: 0, column: 5 }, Colors.BLACK));
    }

    private setupPawns(): void {
        // Assume that white plays on bottom
        [
            { row: 1, color: Colors.BLACK },
            { row: 6, color: Colors.WHITE }
        ].forEach((obj) => {
            for (let column = 0; column < Board.BOARD_SIZE; ++column) {
                const pawn = new Pawn({ column: column, row: obj.row }, obj.color);
                this.addPiece(pawn);
            }
        });
    }

    private setupKing(): void {
        this.addPiece(new King({ row: 0, column: 4 }, Colors.BLACK));
        this.addPiece(new King({ row: 7, column: 4 }, Colors.WHITE));
    }

    private setupQueens(): void {
        this.addPiece(new Queen({ row: 7, column: 3 }, Colors.WHITE));
        this.addPiece(new Queen({ row: 0, column: 3 }, Colors.BLACK));
    }

    private setupRooks(): void {
        this.addPiece(new Rook({ column: 0, row: 0 }, Colors.BLACK));
        this.addPiece(new Rook({ column: 7, row: 0 }, Colors.BLACK));
        this.addPiece(new Rook({ column: 0, row: 7 }, Colors.WHITE));
        this.addPiece(new Rook({ column: 7, row: 7 }, Colors.WHITE));
    }

    private setupKnights(): void {
        this.addPiece(new Knight({ column: 1, row: 0 }, Colors.BLACK));
        this.addPiece(new Knight({ column: 6, row: 0 }, Colors.BLACK));
        this.addPiece(new Knight({ column: 1, row: 7 }, Colors.WHITE));
        this.addPiece(new Knight({ column: 6, row: 7 }, Colors.WHITE));
    }
}

export { Board };
