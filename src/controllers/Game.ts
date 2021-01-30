import { GameEngine } from '../services/game-logic/GameEngine';
import { BoardView } from '../views/Board';

class GameController {
    boardView: BoardView;
    gameEngine: GameEngine;

    constructor() {
        this.gameEngine = new GameEngine();
        this.boardView = new BoardView();
        this.displayBoard();
    }

    displayBoard(): void {
        this.boardView.render();
    }
}

export { GameController };
