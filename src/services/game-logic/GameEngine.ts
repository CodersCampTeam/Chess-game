import { isMainThread } from 'worker_threads';
import { PieceNames } from '../../enums';
import { Square } from '../../models/Square';
import { Board } from './Board';
import { Piece } from './pieces/Piece';

class GameEngine {
    board: Board;

    constructor() {
        this.board = new Board();
    }

    getLegalMoves = (square: Square): Square[] => {
        const piece = this.board.getPiece(square);
        let pieceMoves = piece!.getPossibleMoves(this.board);
        const colis = this.detectAllCollisions(square);
    
        const removeRooksHighlight = this.removeHighlighted(square);
        let pieceMoves2 = pieceMoves.filter(this.isOnBoard).filter((square) => !this.isOccupiedBySameColor(square, piece));
   

        if ( (piece?.name === PieceNames.ROOK) || piece?.name === PieceNames.QUEEN ) {
        let rook = pieceMoves2
       .filter((square) => !((square.row < removeRooksHighlight[0]) && (square.column === piece.position.column) ))
       .filter((square) => !((square.row > removeRooksHighlight[1]) && (square.column === piece.position.column)))
       .filter((square) => !((square.column < removeRooksHighlight[2]) && (square.row === piece.position.row)))
       .filter((square) => !((square.column > removeRooksHighlight[3]) && (square.row === piece.position.row)) )
       .filter((square) => !((square.row < removeRooksHighlight[4]) && square.column < piece.position.column) )
        .filter((square) => !((square.row > removeRooksHighlight[5]) && square.column < piece.position.column))
        .filter((square) => !((square.row < removeRooksHighlight[6]) && square.column > piece.position.column))
        .filter((square) => !((square.row > removeRooksHighlight[7]) && square.column > piece.position.column))
       return rook
        } else if ( (piece?.name === PieceNames.BISHOP) ){
         let bishop = pieceMoves2.filter((square) => !((square.row < removeRooksHighlight[4]) && square.column < piece.position.column) )
        .filter((square) => !((square.row > removeRooksHighlight[5]) && square.column < piece.position.column))
        .filter((square) => !((square.row < removeRooksHighlight[6]) && square.column > piece.position.column))
        .filter((square) => !((square.row > removeRooksHighlight[7]) && square.column > piece.position.column))
        
         return bishop
        }  
 
       else
         return pieceMoves2
 
        
    };
    private detectAllCollisions = (square: Square)  =>{  
        const pieces = this.board.getPiece(square)?.getPossibleMoves(this.board).flat();
        
             
        const piecesPositionsOnBoard = this.board.state
        .map(e => Object.entries(e)
        .map(([x, y]) => y?.position))
        .flat();

        var uniqueResultOne = piecesPositionsOnBoard.filter(function(obj) {
            return pieces?.some(function(obj2) {
                return obj?.column == obj2?.column && obj?.row == obj2?.row
                
            });     
        });
 
        return uniqueResultOne;
             
}

private removeHighlighted = (square: Square)  =>{
    const directions: {}[] = [];
    let [up, down, left, rigth, diagonallyUpLeft, diagonallyDownLeft, diagonallyUpRight, diagonallyDownRight] = directions;
    const collisions = this.detectAllCollisions(square);
    const piecePosition = this.board.getPiece(square)?.position

    const removeHighlightedUp = collisions.filter(function(obj){       
        return (obj!.row < piecePosition!.row ) && (obj!.column === piecePosition!.column)
    }) 
    up = Math.max.apply(Math, removeHighlightedUp.map(function(o) { return o!.row; }))
    directions.push(up);

    const removeHighlightedDown = collisions.filter(function(obj){     
           return (obj!.row > piecePosition!.row ) && ((obj?.column === piecePosition?.column) )
    }) 
    down = Math.min.apply(Math, removeHighlightedDown.map(function(o) { return o!.row; }))
    directions.push(down);

    const removeHighlightedLeft = collisions.filter(function(obj){      
        return obj!.column < piecePosition!.column  && ((obj?.row === piecePosition?.row) )
    }) 
    left = Math.max.apply(Math, removeHighlightedLeft.map(function(o) { return o!.column; }))
    directions.push(left);


    const removeHighlightedRight = collisions.filter(function(obj){
           
        return obj!.column > piecePosition!.column && (obj?.row === piecePosition?.row)
    }) 
    rigth = Math.min.apply(Math, removeHighlightedRight.map(function(o) { return ( o!.column); }))
    directions.push(rigth);



    const removeHighlightedDiagonalUpLeft = collisions.filter(function(obj){
           
        return (obj!.row < piecePosition!.row ) && (obj!.row - obj!.column) === (piecePosition!.row - piecePosition!.column)
    }) 
   
    diagonallyUpLeft = Math.max.apply(Math, removeHighlightedDiagonalUpLeft.map(function(o) { return o!.row; }))
    
    directions.push(diagonallyUpLeft);

    const removeHighlightedDiagonalDownLeft = collisions.filter(function(obj){
           
        return (obj!.row > piecePosition!.row ) && (obj!.row + obj!.column) === (piecePosition!.row + piecePosition!.column)
    }) 
   
    diagonallyDownLeft = Math.min.apply(Math, removeHighlightedDiagonalDownLeft.map(function(o) { return o!.row; }))
  
    directions.push(diagonallyDownLeft);



    const removeHighlightedDiagonalUpRight = collisions.filter(function(obj){
           
        return (obj!.row < piecePosition!.row ) && (obj!.row + obj!.column) === (piecePosition!.row + piecePosition!.column)
    }) 
   
    diagonallyUpRight = Math.max.apply(Math, removeHighlightedDiagonalUpRight.map(function(o) { return o!.row; }))
    
    directions.push(diagonallyUpRight);

    const removeHighlightedDiagonalDownRight = collisions.filter(function(obj){
           
        return (obj!.row > piecePosition!.row ) && (obj!.row - obj!.column) === (piecePosition!.row - piecePosition!.column)
    }) 
   
    diagonallyDownRight = Math.min.apply(Math, removeHighlightedDiagonalDownRight.map(function(o) { return o!.row; }))
  
    directions.push(diagonallyDownRight);




     return directions
     

}

    private isOnBoard = (square: Square): Boolean => {
        // here or in knight.ts (for now knights can get outside the board)
        return square.row >= 0 && square.row < 8 && square.column >= 0 && square.column < 8;
    };

    private isOccupiedBySameColor = (square: Square, piece: Piece | null): Boolean =>
        this.board.getPiece(square)?.color === piece?.color;
    
}

export { GameEngine };
