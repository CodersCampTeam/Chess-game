import { Square } from '../../models/Square';
import { Board } from './Board';

class GameEngine {
    board: Board;

    constructor() {
        this.board = new Board();
    }

    getLegalMoves = (square: Square): Square[] => {
        const piece = this.board.getPiece(square);
        return piece?.getPossibleMoves() ?? [];
    };
}

export { GameEngine };
