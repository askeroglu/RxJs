import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state) => state.tasks
);

export const selectSearchResults = createSelector(
    selectTaskState,
    (state) => state?.searchResults || []
  );

export const selectTaskError = createSelector(
  selectTaskState,
  (state) => state.error
);
