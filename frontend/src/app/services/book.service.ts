import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = "https://openlibrary.org/search.json"
  constructor(private http: HttpClient) { }
  
  searchBooksQuery(query: string) {
    return this.http.get(this.apiUrl, {params: { q: query }});
  }
}
