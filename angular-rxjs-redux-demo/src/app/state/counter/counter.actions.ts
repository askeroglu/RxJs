import { createAction, props } from '@ngrx/store';

// Increment, Decrement, and Reset actions
export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');

// Actions for loading the counter from an API
export const loadCounter = createAction('[Counter] Load Counter');
export const loadCounterSuccess = createAction(
  '[Counter] Load Counter Success',
  props<{ value: number }>()
);
export const loadCounterFailure = createAction('[Counter] Load Counter Failure');

