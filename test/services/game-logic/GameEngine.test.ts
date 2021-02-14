import { Square } from '../../../src/models/Square';
import { GameEngine } from '../../../src/services/game-logic/GameEngine';
import { Colors } from '../../../src/enums';
import { Board } from '../../../src/services/game-logic/Board';
import { King } from '../../../src/services/game-logic/pieces/King';

const gameEngine = new GameEngine();

describe('Testing GameEngine.getLegalMoves() while playing Pawn', () => {
    test(`Pawn shall return 2 capturing moves `, () => {
        // Setup
        const gameEngine = new GameEngine();
        const pawn = gameEngine.board.getPiece(new Square(1, 4));
        const targetSquare = new Square(5, 4);
        const expected = [new Square(6, 3), new Square(6, 5)];

        // Move pawn to enemy row and get moves
        gameEngine.movePiece(pawn.position, targetSquare, false);
        const legalMoves = gameEngine.getLegalMoves(targetSquare);

        // Test
        expect(legalMoves).toEqual(expected);
    });

    test(`Extra En Passat move while playing white`, () => {
        // Setup
        const gameEngine = new GameEngine();
        const pawnBlack = gameEngine.board.getPiece(new Square(1, 4));
        const pawnWhite = gameEngine.board.getPiece(new Square(6, 3));
        const expected = [new Square(2, 3), new Square(2, 4)];

        // Move white and black pawn to trigger En Passat capture
        gameEngine.movePiece(pawnWhite.position, new Square(3, 3), false);
        gameEngine.movePiece(pawnBlack.position, new Square(3, 4), false);

        const legalMoves = gameEngine.getLegalMoves(pawnWhite.position);

        // Test
        expect(legalMoves).toEqual(expected);
    });

    test(`White En Passat removes Black Pawn`, () => {
        // Setup
        const gameEngine = new GameEngine();
        const pawnBlack = gameEngine.board.getPiece(new Square(1, 4));
        const pawnWhite = gameEngine.board.getPiece(new Square(6, 3));

        // Move white and black pawn to trigger En Passat capture
        gameEngine.movePiece(pawnWhite.position, new Square(3, 3), false);
        gameEngine.movePiece(pawnBlack.position, new Square(3, 4), false);
        gameEngine.movePiece(pawnWhite.position, new Square(2, 4), false);

        const removedPiece = gameEngine.board.getPiece(new Square(3, 4));

        // Test
        expect(removedPiece).toBe(null);
    });
});

test(`should target king`, () => {
    const piece = gameEngine.board.getPiece(new Square(1, 4));
    const king = gameEngine.getKingForCheck(piece);
    const expected = new Square(0, 4);

    expect(king instanceof King).toBe(true);
    expect(king.position).toStrictEqual(expected);
});

test(`should return true when check`, () => {
    const color = Colors.BLACK;
    const piece = new King({ column: 7, row: 3 }, Colors.WHITE);

    const isKingChecked = gameEngine.isKingUnderCheck(color, piece.position);

    expect(isKingChecked).toBe(true);
});

test(`should verify if oponent move result with check`, () => {
    const board = new Board();
    const square = { row: 6, column: 3 };
    const move = new Square(4, 3);
    const piece = board.getPiece(square);

    const notCheck = gameEngine.moveNotResultWithCheck(move, piece, square);

    expect(notCheck).toBe(true);
});
