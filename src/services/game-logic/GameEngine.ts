import { Board } from './Board';

class GameEngine {
    board: Board;

    constructor() {
        this.board = new Board();
    }

    getGameState(): Board {
        return this.board;
    }
}

export { GameEngine };
