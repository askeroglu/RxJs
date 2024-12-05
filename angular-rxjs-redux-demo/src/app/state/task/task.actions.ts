import { createAction, props } from '@ngrx/store';

export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: any[] }>()
);
export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: string }>()
);

export const searchTasks = createAction(
  '[Task] Search Tasks',
  props<{ query: string }>()
);
export const searchTasksSuccess = createAction(
  '[Task] Search Tasks Success',
  props<{ results: any[] }>()
);
