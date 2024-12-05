// import { Component } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { increment, decrement, reset } from '../state/counter/counter.actions';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-counter',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './counter.component.html',
//   styleUrl: './counter.component.scss'
// })
// export class CounterComponent {

//   counter$: Observable<number>;
//   constructor(private store: Store<{ counter: number }>) {
//     // Select the counter state from the store
//     this.counter$ = this.store.select((state) => state.counter);
//   }

//   increment() {
//     this.store.dispatch(increment());
//   }

//   decrement() {
//     this.store.dispatch(decrement());
//   }

//   reset() {
//     this.store.dispatch(reset());
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset, loadCounter } from '../state/counter/counter.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  imports: [CommonModule],
})
export class CounterComponent implements OnInit {
  counter$: Observable<number>;

  constructor(private store: Store<{ counter: number }>) {
    this.counter$ = this.store.select((state) => state.counter);
  }

  ngOnInit() {
    this.store.dispatch(loadCounter()); // Dispatch action to load counter value
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
