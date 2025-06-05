import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book/book.service'; // Asegúrate de importar tu servicio
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage implements OnInit, OnDestroy {
  searchQuery = '';
  searchResults: Book[] = [];
  loading = false;
  searched = false;

  private searchSub?: Subscription;

  constructor(private bookService: BookService) {}

  searchBooks() {
    const query = this.searchQuery.trim();
    if (!query) {
      this.searched = false;
      return;
    }

    this.loading = true;
    this.searched = true;

    this.searchSub?.unsubscribe(); // Cancela búsquedas anteriores si existen
    this.searchSub = this.bookService.searchBooksQuery(query).subscribe({
      next: (res: any) => {
        // Mapear resultados a tu interfaz "Book"
        this.searchResults = res.docs.map((doc: any, i: number) => ({
          id: i,
          title: doc.title,
          author: doc.author_name?.join(', ') || 'Autor desconocido',
          description: doc.first_sentence || 'Sin descripción',
          publicationYear: parseInt(doc.first_publish_year) || 0,
          genre: doc.subject?.[0] || 'Desconocido'
        }));
      },
      error: (err) => {
        console.error('Error al buscar libros:', err);
        this.searchResults = [];
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  viewBookDetails(book: Book) {
    console.log('Viewing details for book:', book);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.searchQuery = '';
    this.searchResults = [];
    this.loading = false;
    this.searched = false;
    this.searchSub?.unsubscribe();
  }
}
