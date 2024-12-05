# RxJs
TicTacToe RxJs

![image](https://github.com/user-attachments/assets/56138c23-7d08-46ee-a9f8-d1a42e8c07e3)


1. Service Declaration
typescript
Copy code
@Injectable({
  providedIn: 'root'
})
export class GameService {
@Injectable with { providedIn: 'root' } means this service is a singleton and can be injected anywhere in the app without additional configuration.
2. Subjects and Observables
The service uses RxJS BehaviorSubject for reactive programming. This makes the game state reactive and allows components to subscribe and respond to changes.

Subjects
typescript
Copy code
private boardSubject = new BehaviorSubject<string[]>(Array(9).fill(null));
private currentPlayerSubject = new BehaviorSubject<string>('X');
private winnerSubject = new BehaviorSubject<string | null>(null);
private isGameOverSubject = new BehaviorSubject<boolean>(false);
boardSubject: Tracks the game board as an array of 9 cells (string[]), initialized with null values (empty cells).
currentPlayerSubject: Tracks whose turn it is ('X' or 'O'), initialized to 'X'.
winnerSubject: Tracks the winner ('X', 'O', or 'Draw') or null if the game is ongoing.
isGameOverSubject: Boolean to indicate whether the game is over, initialized to false.
Observables
typescript
Copy code
board$ = this.boardSubject.asObservable();
currentPlayer$ = this.currentPlayerSubject.asObservable();
winner$ = this.winnerSubject.asObservable();
isGameOver$ = this.isGameOverSubject.asObservable();
Each Subject is exposed as an Observable, allowing other parts of the app to subscribe and react to changes.
3. Winning Combinations
typescript
Copy code
private winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];
Represents all possible winning combinations of indexes on the board.
4. Play a Move
typescript
Copy code
playMove(index: number) {
  if (this.isGameOverSubject.value || this.boardSubject.value[index]) return;

  const currentBoard = [...this.boardSubject.value];
  currentBoard[index] = this.currentPlayerSubject.value;
  this.boardSubject.next(currentBoard);
Pre-checks:
Does nothing if the game is over or the selected cell is already occupied.
Update Board: Makes a copy of the current board, updates the cell at the given index with the current player's symbol, and publishes the updated board state.
Check Win/Draw
typescript
Copy code
if (this.checkWin(currentBoard, this.currentPlayerSubject.value)) {
  this.winnerSubject.next(this.currentPlayerSubject.value);
  this.isGameOverSubject.next(true);
} else if (currentBoard.every(cell => cell)) {
  this.winnerSubject.next('Draw');
  this.isGameOverSubject.next(true);
} else {
  this.switchPlayer();
}
Win Condition: Calls checkWin to see if the current player has won. If yes, updates the winner and marks the game as over.
Draw Condition: If the board is full and no one has won, declares a draw.
Switch Player: If no win or draw, switches to the other player.
5. Switch Player
typescript
Copy code
private switchPlayer() {
  this.currentPlayerSubject.next(this.currentPlayerSubject.value === 'X' ? 'O' : 'X');
}
Toggles the currentPlayerSubject between 'X' and 'O'.
6. Check Win
typescript
Copy code
private checkWin(board: string[], player: string): boolean {
  return this.winningCombos.some(combo => 
    combo.every(index => board[index] === player)
  );
}
Checks if any winning combination is fully occupied by the given player ('X' or 'O').
7. Reset Game
typescript
Copy code
resetGame() {
  this.boardSubject.next(Array(9).fill(null));
  this.currentPlayerSubject.next('X');
  this.winnerSubject.next(null);
  this.isGameOverSubject.next(false);
}
Resets the game to its initial state:
Clears the board.
Sets the current player to 'X'.
Resets the winner and game over status.
Usage
This service is the game logic layer. Components can use it to:

Subscribe to the game state (e.g., board, current player, winner).
Call methods like playMove to make a move or resetGame to restart.
By leveraging reactive programming, UI updates automatically when the state changes.
