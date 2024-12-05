import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: any[];
  searchResults: any[];
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  searchResults: [],
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    error: null,
  })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TaskActions.searchTasksSuccess, (state, { results }) => ({
    ...state,
    searchResults: results,
    error: null,
  }))
);
