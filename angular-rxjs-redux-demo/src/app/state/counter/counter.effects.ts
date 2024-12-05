import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, delay } from 'rxjs/operators';
import * as CounterActions from './counter.actions';

@Injectable()
export class CounterEffects {
  constructor(private actions$: Actions, private store: Store) {}

  // Effect to simulate fetching the initial counter value from an API
  loadCounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.loadCounter), // Trigger when loadCounter action is dispatched
      delay(1000),
      mergeMap(() =>
        of(10).pipe(
          map((counterValue) => CounterActions.loadCounterSuccess({ value: counterValue })),
          catchError(() => of(CounterActions.loadCounterFailure()))
        )
      )
    )
  );
}
