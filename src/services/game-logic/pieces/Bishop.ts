import { PieceNames } from '../../../enums';
import { Square } from '../../../models/Square';
import { Piece } from './piece';

class Bishop extends Piece {
    name = PieceNames.BISHOP;
    getPossibleMoves(): Square[] {
        const positions: Square[] = [];
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                if (
                    Math.abs(this.position.x - i) === Math.abs(this.position.y - j) &&
                    this.position.x !== i &&
                    this.position.y !== j
                ) {
                    positions.push({
                        x: i,
                        y: j
                    });
                }
            }
        }
        return positions;
    }
}

export { Bishop };
