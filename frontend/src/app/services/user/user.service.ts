import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiBase = 'http://localhost:5000/api/users'; 
  private apiBase2 = 'http://localhost:5000/api'; 

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiBase}/me`);
  }
    updateProfile(data: { description: string }) {
    return this.http.put(`${this.apiBase}/profile`, data);
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBase2}/lists/favoritos`);
  }

  getReadBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBase2}/lists/leidos`);
  }

  addFavorite(bookId: number): Observable<any> {
    return this.http.post(`${this.apiBase2}/lists/favoritos`, { book_id: bookId });
  }

  addReadBook(bookId: number): Observable<any> {
    return this.http.post(`${this.apiBase2}/lists/leidos`, { book_id: bookId });
  }

  // src/app/services/user/user.service.ts

getUserPreferences() {
  return this.http.get<any>(`${this.apiBase}/preferences`);
}

updateUserPreferences(preferredGenres: string[], favoriteAuthors: string[]) {
  const payload = {
    preferred_genre: preferredGenres,
    favorite_authors: favoriteAuthors
  };
  return this.http.put(`${this.apiBase}/preferences`, payload);
}



}
