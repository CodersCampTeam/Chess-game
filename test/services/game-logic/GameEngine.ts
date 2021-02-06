import { SpecialMove } from '../../../src/enums';
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
        pawn.move(targetSquare);
        const legalMoves = gameEngine.getLegalMoves(targetSquare);

        // Test
        expect(legalMoves).toBe(expected);
    });
    test(`Extra En Passat move while playing white`, () => {
        // Setup
        const gameEngine = new GameEngine();
        const pawnBlack = gameEngine.board.getPiece(new Square(1, 4));
        const pawnWhite = gameEngine.board.getPiece(new Square(6, 3));
        const expected = [new Square(2, 3), new Square(2, 4, SpecialMove.EN_PASSAT)];

        // Move white and black pawn to trigger En Passat capture
        pawnWhite.move(new Square(3, 3));
        pawnBlack.move(new Square(3, 4));

        const legalMoves = gameEngine.getLegalMoves(pawnBlack.position);

        // Test
        expect(legalMoves).toEqual(expected);
    });
    test(`White En Passat removes Black Pawn`, () => {
        // Setup
        const gameEngine = new GameEngine();
        const pawnBlack = gameEngine.board.getPiece(new Square(1, 4));
        const pawnWhite = gameEngine.board.getPiece(new Square(6, 3));

        // Move white and black pawn to trigger En Passat capture
        pawnWhite.move(new Square(3, 3));
        pawnBlack.move(new Square(3, 4));
        pawnWhite.move(new Square(2, 4, SpecialMove.EN_PASSAT));

        const removedPiece = gameEngine.board.getPiece(new Square(3, 4));

        // Test
        expect(removedPiece).toBe(null);
    });
});
