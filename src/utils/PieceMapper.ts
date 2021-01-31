import { PieceNames } from '../enums/PieceNames';

export class PieceMapper {
    private static readonly getIconTemplate = (name: string): string => `<i class="fas fa-chess-${name}"></i>`;

    static getIcon(name: PieceNames): string {
        return this.getIconTemplate(name.valueOf());
    }
}
