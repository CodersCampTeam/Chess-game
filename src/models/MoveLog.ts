import { Colors } from '../enums';
import { Square } from './Square';

class MoveLog {
    constructor(public player: Colors, public startLocation: Square, public endLocation: Square) {}
}

export { MoveLog };
