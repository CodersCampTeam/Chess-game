import { PieceNames } from '../enums/PieceNames';

export class PieceMapper {
    private static readonly getIconTemplate = (name: string): string => `<i class="fas fa-chess-${name}"></i>`;

    static getIcon(name: PieceNames): string {
        switch (name) {
            case PieceNames.PAWN:
                return this.getIconTemplate('pawn');
            case PieceNames.KNIGHT:
                return this.getIconTemplate('knight');
            case PieceNames.KING:
                return this.getIconTemplate('king');
            case PieceNames.QUEEN:
                return this.getIconTemplate('queen');
            case PieceNames.ROOK:
                return this.getIconTemplate('rook');
            case PieceNames.BISHOP:
                return this.getIconTemplate('bishop');
        }
    }
}
