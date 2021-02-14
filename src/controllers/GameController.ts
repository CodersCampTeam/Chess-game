import { Colors, PieceNames } from '../enums';
import { Square } from '../models/Square';
import { GameEngine } from '../services/game-logic/GameEngine';
import { Piece } from '../services/game-logic/pieces/Piece';
import { BoardView } from '../views/BoardView';
import { SettingsControls } from '../views/SettingsControls';
import { OpeningView } from '../views/OpeningView';
import { Sound } from '../services/game-logic/Sound';
import { ModalView } from '../views/ModalView';
import { PawnPromotionView } from '../views/PawnPromotionView';

class GameController {
    boardView: BoardView;
    settingsView: SettingsControls;
    gameEngine: GameEngine;
    activeSquare: Square | null;
    currentPlayer: Colors;
    openingView: OpeningView;
    sound: Sound;
    soundOn = false;
    modal: ModalView | null;

    constructor() {
        this.activeSquare = null;
        this.modal = null;
        this.gameEngine = new GameEngine();
        this.boardView = new BoardView(this.handleUserClick);
        this.settingsView = new SettingsControls((soundOn) => (this.soundOn = soundOn));
        this.openingView = new OpeningView((soundOn) => (this.soundOn = soundOn));
        this.currentPlayer = Colors.WHITE;
        this.sound = new Sound();
        this.updateBoard();
    }

    handleUserClick = (square: Square): void => {
        const selectedPiece = this.gameEngine.board.getPiece(square);

        if (this.activeSquare) {
            const legalMoves = this.gameEngine.getLegalMoves(this.activeSquare);
            const isLegalMove = legalMoves.some((move) => square?.row === move.row && square?.column === move.column);

            if (isLegalMove) {
                this.playSound(this.activeSquare, square);
                this.gameEngine.movePiece(this.activeSquare, square, false);
                this.boardView.render(this.gameEngine.board);

                const isPromotionPossible = this.gameEngine.checkPawnPromotion(square);
                if (isPromotionPossible) {
                    this.createPawnPromotionModal(isPromotionPossible, square);
                } else {
                    this.changePlayer();
                }
            }
            this.activeSquare = null;
            this.boardView.deselectSquares();
        } else if (this.isCurrentPlayer(selectedPiece)) {
            const legalMoves = this.gameEngine.getLegalMoves(square);
            this.boardView.selectSquares(legalMoves);
            this.activeSquare = square;
        }
    };

    private playSound(location: Square, destination: Square): void {
        if (!this.soundOn) return;
        const locationPiece = this.gameEngine.board.getPiece(location);
        const destinationPiece = this.gameEngine.board.getPiece(destination);

        if (locationPiece && destinationPiece) {
            this.sound.playCapturingMoveSound();
        } else {
            this.sound.playNormalMoveSound();
        }
    }

    private createPawnPromotionModal(color: Colors, square: Square) {
        const pawnPromotionView = new PawnPromotionView(color, this.pickPawnToPromotion, square);
        this.modal = new ModalView(pawnPromotionView.content);
    }

    private pickPawnToPromotion = (square: Square, selectedPiece: PieceNames, color: Colors): void => {
        this.modal?.closeModal();
        this.gameEngine.changePawnAfterPromotion(square, selectedPiece, color);
        this.boardView.render(this.gameEngine.board);
        this.changePlayer();
    };

    private isCurrentPlayer(selectedPiece: Piece | null): boolean {
        return this.currentPlayer === selectedPiece?.color;
    }

    private changePlayer(): void {
        this.currentPlayer = this.currentPlayer === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
    }

    updateBoard(): void {
        this.boardView.render(this.gameEngine.board);
    }
}

export { GameController };
