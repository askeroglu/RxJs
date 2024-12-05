import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/gameservice.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  board$ = this.gameService.board$;
  currentPlayer$ = this.gameService.currentPlayer$;
  winner$ = this.gameService.winner$;
  isGameOver$ = this.gameService.isGameOver$;

  constructor(private gameService: GameService) {}

  playMove(index: number) {
    this.gameService.playMove(index);
  }

  resetGame() {
    this.gameService.resetGame();
  }
}
