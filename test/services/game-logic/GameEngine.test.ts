import { Square } from '../../../src/models/Square';
import { GameEngine } from '../../../src/services/game-logic/GameEngine';

describe('Testing GameEngine.getLegalMoves() while playing Pawn', () => {
    test(`Pawn shall return 2 capturing moves `, () => {
        // Setup
        const gameEngine = new GameEngine();
        const pawn = gameEngine.board.getPiece(new Square(1, 4));
        const targetSquare = new Square(5, 4);
        const expected = [new Square(6, 3), new Square(6, 5)];

        // Move pawn to enemy row and get moves
        gameEngine.movePiece(pawn.position, targetSquare);
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
        gameEngine.movePiece(pawnWhite.position, new Square(3, 3));
        gameEngine.movePiece(pawnBlack.position, new Square(3, 4));

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
        gameEngine.movePiece(pawnWhite.position, new Square(3, 3));
        gameEngine.movePiece(pawnBlack.position, new Square(3, 4));
        gameEngine.movePiece(pawnWhite.position, new Square(2, 4));

        const removedPiece = gameEngine.board.getPiece(new Square(3, 4));

        // Test
        expect(removedPiece).toBe(null);
    });
});
