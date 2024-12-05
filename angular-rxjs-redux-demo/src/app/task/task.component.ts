import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  loadTasks,
  searchTasks,
} from '../state/task/task.actions';
import {
  selectAllTasks,
  selectSearchResults,
} from '../state/task/task.selectors';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})

export class TaskComponent implements OnInit {
  tasks$: Observable<any[]>;
  searchResults$: Observable<any[]>;
  searchQuery: string = '';

  constructor(private store: Store) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.searchResults$ = this.store.select(selectSearchResults).pipe(
      startWith([]) 
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks()); // Load all tasks on init
    this.searchResults$.subscribe(() => {
    });
  }

  onSearch(query: string): void {
    this.store.dispatch(searchTasks({ query })); // Dispatch search action

    this.searchResults$.subscribe((results) => {
      console.log('Search results:', results);
    });
  }
}
