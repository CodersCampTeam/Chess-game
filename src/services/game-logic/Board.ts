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

    public getPiece(square: Square): Piece | null {
        return this.state[square.row][square.column];
    }

    public movePiece(location: Square, destination: Square): void {
        this.state[location.row][location.column]?.move(destination);
        this.state[destination.row][destination.column] = this.state[location.row][location.column];
        this.state[location.row][location.column] = null;
    }

    public isOccupiedBySameColorPiece = (square: Square, piece: Piece | null): Boolean => {
        return this.getPiece(square)?.color === piece?.color;
    };

    public resetSquare(square: Square): void {
        this.state[square.row][square.column] = null;
    }

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
        this.addPiece(new Bishop(new Square(7, 2), Colors.WHITE));
        this.addPiece(new Bishop(new Square(7, 5), Colors.WHITE));
        this.addPiece(new Bishop(new Square(0, 2), Colors.BLACK));
        this.addPiece(new Bishop(new Square(0, 5), Colors.BLACK));
    }

    private setupPawns(): void {
        // Assume that white plays on bottom
        [
            { row: 1, color: Colors.BLACK },
            { row: 6, color: Colors.WHITE }
        ].forEach((obj) => {
            for (let column = 0; column < Board.BOARD_SIZE; ++column) {
                const pawn = new Pawn(new Square(obj.row, column), obj.color);
                this.addPiece(pawn);
            }
        });
    }

    private setupKing(): void {
        this.addPiece(new King(new Square(0, 4), Colors.BLACK));
        this.addPiece(new King(new Square(7, 4), Colors.WHITE));
    }

    private setupQueens(): void {
        this.addPiece(new Queen(new Square(7, 3), Colors.WHITE));
        this.addPiece(new Queen(new Square(0, 3), Colors.BLACK));
    }

    private setupRooks(): void {
        this.addPiece(new Rook(new Square(0, 0), Colors.BLACK));
        this.addPiece(new Rook(new Square(0, 7), Colors.BLACK));
        this.addPiece(new Rook(new Square(7, 0), Colors.WHITE));
        this.addPiece(new Rook(new Square(7, 7), Colors.WHITE));
    }

    private setupKnights(): void {
        this.addPiece(new Knight(new Square(0, 1), Colors.BLACK));
        this.addPiece(new Knight(new Square(0, 6), Colors.BLACK));
        this.addPiece(new Knight(new Square(7, 1), Colors.WHITE));
        this.addPiece(new Knight(new Square(7, 6), Colors.WHITE));
    }
}

export { Board };
