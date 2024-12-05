# RxJs
TicTacToe RxJs

![image](https://github.com/user-attachments/assets/56138c23-7d08-46ee-a9f8-d1a42e8c07e3)

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // Game state subjects
  private boardSubject = new BehaviorSubject<string[]>(Array(9).fill(null));
  private currentPlayerSubject = new BehaviorSubject<string>('X');
  private winnerSubject = new BehaviorSubject<string | null>(null);
  private isGameOverSubject = new BehaviorSubject<boolean>(false);

  // Exposing observables for components to subscribe to
  board$ = this.boardSubject.asObservable();
  currentPlayer$ = this.currentPlayerSubject.asObservable();
  winner$ = this.winnerSubject.asObservable();
  isGameOver$ = this.isGameOverSubject.asObservable();

  // All possible winning combinations
  private winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Handles a player's move
  playMove(index: number) {
    // Ignore if the game is over or the cell is already occupied
    if (this.isGameOverSubject.value || this.boardSubject.value[index]) return;

    // Update the board with the current player's symbol
    const currentBoard = [...this.boardSubject.value];
    currentBoard[index] = this.currentPlayerSubject.value;
    this.boardSubject.next(currentBoard);

    // Check for a win or draw, otherwise switch players
    if (this.checkWin(currentBoard, this.currentPlayerSubject.value)) {
      this.winnerSubject.next(this.currentPlayerSubject.value);
      this.isGameOverSubject.next(true);
    } else if (currentBoard.every(cell => cell)) {
      this.winnerSubject.next('Draw');
      this.isGameOverSubject.next(true);
    } else {
      this.switchPlayer();
    }
  }

  // Switches the current player
  private switchPlayer() {
    this.currentPlayerSubject.next(
      this.currentPlayerSubject.value === 'X' ? 'O' : 'X'
    );
  }

  // Checks if the given player has won
  private checkWin(board: string[], player: string): boolean {
    return this.winningCombos.some(combo =>
      combo.every(index => board[index] === player)
    );
  }

  // Resets the game state to the initial configuration
  resetGame() {
    this.boardSubject.next(Array(9).fill(null));
    this.currentPlayerSubject.next('X');
    this.winnerSubject.next(null);
    this.isGameOverSubject.next(false);
  }
}
