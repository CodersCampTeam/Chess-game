import { Square } from '../../../src/models/Square';
import { GameEngine } from '../../../src/services/game-logic/GameEngine';

describe('Testing GameEngine.getLegalMoves() while playing Pawn', () => {
    test(`Pawn shall return 2 capturing moves `, () => {
        // Setup
        const gameEngine = new GameEngine();
        const pawn = gameEngine.board.getPiece({ row: 1, column: 4 });
        const targetSquare = new Square(5, 4);
        const expected = [new Square(6, 3), new Square(6, 5)];

        // Move pawn to enemy row and get moves
        pawn.move(targetSquare);
        const legalMoves = gameEngine.getLegalMoves(targetSquare);

        // Test
        expect(legalMoves).toBe(expected);
    });
});
