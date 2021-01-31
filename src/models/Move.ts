import { Square } from './Square';

class Move {
    from: Square;
    to: Square;
    isSpecial: boolean;

    constructor() {
        this.from = new Square(-1, -1);
        this.to = new Square(-1, -1);
        this.isSpecial = false;
    }
}

export { Move };
