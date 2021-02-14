import { Colors, PieceNames } from '../enums';
import { Square } from '../models/Square';
import { PieceMapper } from '../utils/PieceMapper';

class PawnPromotionView {
    content: HTMLElement;
    constructor(
        private color: Colors,
        private selectPiece: (square: Square, selectedPiece: PieceNames, color: Colors) => void,
        private square: Square
    ) {
        this.content = this.generateContent(this.color);
    }

    generateContent = (color: Colors): HTMLElement => {
        const container = document.createElement('div');
        container.classList.add('pawn-promotion-container');
        const header = document.createElement('h1');
        header.textContent = 'Choose piece to promotion';
        container.appendChild(header);
        const pawnsContainer = document.createElement('div');
        pawnsContainer.classList.add('pawns-container');

        [PieceNames.BISHOP, PieceNames.KNIGHT, PieceNames.QUEEN, PieceNames.ROOK].forEach((type) => {
            const piece = document.createElement('div');
            piece.addEventListener('click', () => this.selectPiece(this.square, type, color));
            piece.innerHTML = PieceMapper.getIcon(type);
            piece.classList.add('pawn-promotion-piece', color.toLowerCase());
            pawnsContainer.appendChild(piece);
        });
        container.appendChild(pawnsContainer);
        return container;
    };
}

export { PawnPromotionView };
