import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  addBook(bookData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/books/`, bookData);
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/books/${bookId}`);
  }

  modifyBook(bookId: string, bookData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/books/${bookId}`, bookData);
  }
}