import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SearchComponent } from './search/search.component';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './state/counter/counter.reducer';
import { CounterEffects } from './state/counter/counter.effects';
import { CounterComponent } from './counter/counter.component';
import { CommonModule } from '@angular/common';
import { taskReducer } from './state/task/task.reducer';
import { TaskEffects } from './state/task/task.effects';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), SearchComponent, CounterComponent, CommonModule,
      provideStore({ counter: counterReducer, tasks: taskReducer} ), // Reducers
      provideEffects([CounterEffects, TaskEffects]), // Effects
      provideStoreDevtools(), // Enable Redux devtools
    ]
};

