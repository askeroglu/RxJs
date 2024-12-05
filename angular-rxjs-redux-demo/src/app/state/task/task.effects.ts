import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import * as TaskActions from './task.actions';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions) {}

  // Simulate an API call to fetch all tasks
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() =>
        of([
          { id: 1, title: 'Task 1' },
          { id: 2, title: 'Task 2' },
          { id: 3, title: 'Task 3' },
        ]).pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error) =>
            of(TaskActions.loadTasksFailure({ error: 'Failed to load tasks' }))
          )
        )
      )
    )
  );

  searchTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.searchTasks),
      debounceTime(300), // Debounce user input
      switchMap(({ query }) =>
        of([
          { id: 1, title: 'Task 1' },
          { id: 2, title: 'Task 2' },
          { id: 3, title: 'Task 3' },
        ])
          .pipe(
            map((tasks) =>
              tasks.filter((task) =>
                task.title.toLowerCase().includes(query.toLowerCase())
              )
            ),
            map((results) => TaskActions.searchTasksSuccess({ results })),
            catchError((error) =>
              of(TaskActions.loadTasksFailure({ error: 'Search failed' }))
            )
          )
      )
    )
  );
}
