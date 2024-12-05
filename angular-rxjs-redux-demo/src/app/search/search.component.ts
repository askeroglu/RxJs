import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  private searchTerms = new Subject<string>();
  results: string[] = []

  constructor() {
    this.searchTerms
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(),
        switchMap((term) => this.fakeApiCall(term)),  // Switch to a new observable
        catchError(() => of([]))
      )
      .subscribe((data) => (this.results = data));
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerms.next(term);
  }

  fakeApiCall(query: string) {
    const data = ['apple', 'banana', 'grape', 'orange', 'pineapple'];
    return of(data.filter((item) => item.toLowerCase().includes(query.toLowerCase())));
  }
}
