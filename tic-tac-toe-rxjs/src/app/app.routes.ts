// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { RxjsReduxPageComponent } from './rxjs-redux-page/rxjs-redux-page.component';

export const routes: Routes = [
  { path: '', component: BoardComponent },
  { path: 'rxjs-redux', component: RxjsReduxPageComponent }
];
