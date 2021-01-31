export class Helpers {
    static useNestedForLoop(callBack: (i: number, j: number) => void, size = 8): void {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                callBack(i, j);
            }
        }
    }
}
