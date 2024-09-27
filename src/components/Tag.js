const NUM_ROWS = 4;
const NUM_COLS = 4;
const NUM_TILES = NUM_ROWS * NUM_COLS;
const EMPTY_INDEX = NUM_TILES - 1;
const SHUFFLE_MOVES_RANGE = [60, 80];
const MOVE_DIRECTIONS = ['up', 'down', 'left', 'right'];

function rand (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export default class Tag {
  static instance = null;
  static solvedBoard = Tag.getNewBoard();

  static getInstance () {
    if (!Tag.instance) Tag.instance = new Tag();
    return Tag.instance;
  }

  static getNewBoard(){
    return Array(NUM_TILES).fill(0).map((a,i) => [
      Math.floor(i/NUM_ROWS),
      i % NUM_COLS
    ]);
  }

  constructor(){
    this.startNewGame();
  }

  shuffle(){
    this.shuffling = true;
    let shuffleMoves = rand(...SHUFFLE_MOVES_RANGE);
    while (shuffleMoves --> 0) 
      this.moveInDirection (MOVE_DIRECTIONS[rand(0,3)]);
    this.shuffling = false;
  }

  startNewGame()
  {
    this.moves = 0;
    this.board = Tag.getNewBoard();
    this.stack = [];
    this.seconds = 0;
    this.shuffle();
  }


  canMoveTile (index) {
    if (index < 0 || index >= NUM_TILES) return false;

    const tilePos = this.board[index];
    const emptyPos = this.board[EMPTY_INDEX];

    if (tilePos[0] === emptyPos[0])
      return Math.abs(tilePos[1] - emptyPos[1]) === 1;

    else if (tilePos[1] === emptyPos[1])
      return Math.abs(tilePos[0] - emptyPos[0]) === 1;

    else return false;
  }

  moveTile (index) {
    if (!this.shuffling && this.isSolved()) return false;

    if (!this.canMoveTile(index)) return false;

    const emptyPosition = [...this.board[EMPTY_INDEX]];
    const tilePosition = [...this.board[index]];
    let boardAfterMove = [...this.board];    
    boardAfterMove[EMPTY_INDEX] = tilePosition;
    boardAfterMove[index] = emptyPosition;

    if (!this.shuffling) this.stack.push(this.board);

    this.board = boardAfterMove;
    
    if (!this.shuffling) this.moves += 1;

    return true;
  }

  isSolved () {
    for (let i=0; i<NUM_TILES; i++) {
      if (this.board[i][0] !== Tag.solvedBoard[i][0] 
          || this.board[i][1] !== Tag.solvedBoard[i][1]) 
        return false;
    }
    return true;
  }

  moveInDirection (dir) {
    const epos = this.board[EMPTY_INDEX];
    const posToMove = 
      dir === 'up' ? [epos[0]+1, epos[1]]
      : dir === 'down' ? [epos[0]-1, epos[1]]
      : dir === 'left' ? [epos[0], epos[1]+1]
      : dir === 'right' ? [epos[0], epos[1]-1]
      : epos;

    let tileToMove = EMPTY_INDEX;
    for (let i=0; i < NUM_TILES; i++) {
      if (this.board[i][0] === posToMove[0] && this.board[i][1] === posToMove[1]) {
        tileToMove = i;
        break;
      }
    }

    this.moveTile(tileToMove);
  }

  undo () {
    if (this.stack.length === 0) return false;
    this.board = this.stack.pop();
    this.moves -= 1;
  }

  getState () {  
    const self = this;
    return {
      board: self.board,
      moves: self.moves,
      solved: self.isSolved(),
      seconds: self.seconds
    };
  }
}