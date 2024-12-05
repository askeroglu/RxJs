import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private boardSubject = new BehaviorSubject<string[]>(Array(9).fill(null));
  private currentPlayerSubject = new BehaviorSubject<string>('X');
  private winnerSubject = new BehaviorSubject<string | null>(null);
  private isGameOverSubject = new BehaviorSubject<boolean>(false);

  board$ = this.boardSubject.asObservable();
  currentPlayer$ = this.currentPlayerSubject.asObservable();
  winner$ = this.winnerSubject.asObservable();
  isGameOver$ = this.isGameOverSubject.asObservable();

  private winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  playMove(index: number) {
    if (this.isGameOverSubject.value || this.boardSubject.value[index]) return;

    const currentBoard = [...this.boardSubject.value];
    currentBoard[index] = this.currentPlayerSubject.value;
    this.boardSubject.next(currentBoard);

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

  private switchPlayer() {
    this.currentPlayerSubject.next(this.currentPlayerSubject.value === 'X' ? 'O' : 'X');
  }

  private checkWin(board: string[], player: string): boolean {
    return this.winningConditions.some(combo => 
      combo.every(index => board[index] === player)
    );
  }

  resetGame() {
    this.boardSubject.next(Array(9).fill(null));
    this.currentPlayerSubject.next('X');
    this.winnerSubject.next(null);
    this.isGameOverSubject.next(false);
  }
}
