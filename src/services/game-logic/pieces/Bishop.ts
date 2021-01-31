import { Move } from '../../../models/Square';
import { Piece } from './piece';

class Bishop extends Piece {
    getPossibleMoves(): Move[] {
        const positions: Move[] = [];
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                if (
                    Math.abs(this.position.x - i) === Math.abs(this.position.y - j) &&
                    this.position.x !== i &&
                    this.position.y !== j
                ) {
                    positions.push({
                        from: this.position,
                        to: {
                            x: i,
                            y: j
                        },
                        isSpecial: false
                    });
                }
            }
        }
        return positions;
    }
}

export { Bishop };
