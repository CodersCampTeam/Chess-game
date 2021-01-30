import { Board } from './Board';

class GameEngine {
    board: Board;

    constructor() {
        this.board = new Board();

        console.log(this);
    }
}

export { GameEngine };
