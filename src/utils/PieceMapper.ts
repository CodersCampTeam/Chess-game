import { PieceNames } from '../enums/PieceNames';

export class PieceMapper {
    private static readonly getIconTemplate = (name: string): string =>
        `<div class="piece__${name}"><i class="fas fa-chess-${name}"></i></div>`;

    static getIcon(name: PieceNames): string {
        return this.getIconTemplate(name.valueOf());
    }
}
