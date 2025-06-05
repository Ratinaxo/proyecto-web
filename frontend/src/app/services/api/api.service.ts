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

  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, userData);
  }
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
  modifyUser(userId: string, userData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${userId}`, userData);
  }
  login_user(credentials: { email: string, password: string}) {
    return this.http.post(`${this.apiUrl}/users/login`, credentials);
  }

  getMe() {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable(observer => {
        console.log('No token found in localStorage');
        throw new Error('No token found');
      }
    );

    }
    return this.http.get(`${this.apiUrl}/users/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
}
