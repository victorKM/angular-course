import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-reactive-search',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './reactive-search.component.html',
  styleUrl: './reactive-search.component.scss',
})
export class ReactiveSearchComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any>;
  total: number;
  readonly FIELDS = 'name,description,version,homepage';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.results$ = this.queryField.valueChanges.pipe(
      map((value) => value.trim()),
      filter((value) => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      //tap((value) => console.log(value)),
      switchMap((value) =>
        this.http.get(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS,
          },
        })
      ),
      tap((res: any) => (this.total = res.total)),
      map((res: any) => res.results)
    );
  }

  onSearch() {
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {
      // pode usar esta forma
      const params_ = {
        search: value,
        fields: this.FIELDS,
      };

      // ou esta forma
      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', this.FIELDS);

      this.results$ = this.http.get(this.SEARCH_URL, { params }).pipe(
        tap((res: any) => (this.total = res.total)),
        map((res: any) => res.results)
      );
    }
  }
}
