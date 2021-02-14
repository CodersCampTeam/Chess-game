import { MoveLog } from '../services/HistoryService/HistoryService';

class GameLogView {
    logBox: HTMLDivElement;
    moveLogs: MoveLog[];
    constructor(moveLogs: MoveLog[]) {
        this.moveLogs = moveLogs;
        this.logBox = this.generateLogBox();
    }

    private generateLogBox(): HTMLDivElement {
        const logBox = document.createElement('div');
        logBox.classList.add('logbox');
        const board = document.querySelector('#board');
        board?.appendChild(logBox);
        return logBox;
    }

    private mapToLetter(column: number): string {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        return letters[column];
    }

    private mapToNumber(row: number): number {
        const max = 8;
        return Math.abs(max - row);
    }

    private clearLogBox() {
        const child = this.logBox.firstChild;
        if (child) {
            this.logBox.removeChild(child);
        }
    }

    updateGameLog(): void {
        this.clearLogBox();
        const div = document.createElement('div');
        [...this.moveLogs].reverse().forEach((move) => {
            const p = document.createElement('p');
            p.textContent = `${move.player} ${this.mapToLetter(move.startLocation.column)}${this.mapToNumber(
                move.startLocation.row
            )} => 
                ${this.mapToLetter(move.endLocation.column)}${this.mapToNumber(move.endLocation.row)}`;
            div.appendChild(p);
        });
        this.logBox.appendChild(div);
    }
}

export { GameLogView };
