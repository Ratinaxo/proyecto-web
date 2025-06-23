import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../interfaces/book';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5000/api/books/search';

  constructor(private http: HttpClient) {}

  searchBooks(query: string, filters: any): Observable<Book[]> {
    let params = new HttpParams().set('query', query || '');

    if (filters) {
      if (filters.title) params = params.set('title', filters.title);
      if (filters.genre) params = params.set('genre', filters.genre);
      if (filters.author) params = params.set('author', filters.author);
      if (filters.year) params = params.set('year', filters.year);
    }

    return this.http.get<Book[]>(this.apiUrl, { params });
  }
getBookById(id: number): Observable<Book> {
  return this.http.get<Book>(`http://localhost:5000/api/books/${id}`);
}

getBookReviews(id: number): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:5000/api/reviews/${id}`);
}

getBookDetails(id: number): Observable<Book> {
  return this.http.get<Book>(`http://localhost:5000/api/books/${id}`).pipe(
    switchMap(book => {
      const titleEncoded = encodeURIComponent(book.title);

      return this.http.get<any>(`https://openlibrary.org/search.json?title=${titleEncoded}`).pipe(
        switchMap((res: any) => {
          const match = res.docs?.find((doc: any) =>
            doc.author_name?.some((name: string) =>
              name.toLowerCase().includes(book.author.toLowerCase())
            )
          );

          // Asignar imagen si se encuentra
          book.cover_url = match?.cover_i
            ? `https://covers.openlibrary.org/b/id/${match.cover_i}-L.jpg`
            : 'assets/placeholder.jpg';

          // Si hay key del work, obtenemos la descripción real
          if (match?.key) {
            return this.http.get<any>(`https://openlibrary.org${match.key}.json`).pipe(
              map(workData => {
                const desc = workData.description;
                book.description = typeof desc === 'object' ? desc.value : (desc || 'No hay descripción disponible.');
                return book;
              }),
              catchError(err => {
                console.warn('Error trayendo descripción del work:', err);
                book.description = 'No hay descripción disponible.';
                return of(book);
              })
            );
          } else {
            book.description = 'No hay descripción disponible.';
            return of(book);
          }
        }),
        catchError(err => {
          console.error('Error al buscar en OpenLibrary:', err);
          book.cover_url = 'assets/placeholder.jpg';
          book.description = 'No hay descripción disponible.';
          return of(book);
        })
      );
    })
  );
}






}

