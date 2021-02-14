import { Colors } from '../../enums';
import { Square } from '../../models/Square';

class MoveLog {
    constructor(public player: Colors, public startLocation: Square, public endLocation: Square) {}
}

class HistoryService {
    color: Colors = Colors.WHITE;
    moveLogs: MoveLog[] = [];
    currentMoveIndex: number;
    constructor() {
        this.currentMoveIndex = 0;
    }

    log(start: Square, destination: Square, changePlayer = true): void {
        this.moveLogs.splice(this.currentMoveIndex);
        this.moveLogs.push(new MoveLog(this.color, start, destination));
        this.currentMoveIndex++;
        if (changePlayer) {
            this.changePlayer();
        }
    }

    private changePlayer() {
        this.color = this.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
    }
}

export { HistoryService, MoveLog };
