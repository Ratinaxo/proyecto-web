import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/book'; // Importa la interfaz book

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage implements OnInit {
  searchQuery = '';
  searchResults: Book[] = []; // Usando la interfaz
  loading = false;
  searched = false;

  private books: Book[] = [
    {
      id: 1,
      title: 'El Señor de los Anillos',
      author: 'J.R.R. Tolkien',
      description: 'Trilogía épica de fantasía...',
      publicationYear: 1954,
      genre: 'Fantasía'
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      description: 'Novela distópica clásica...',
      publicationYear: 1949,
      genre: 'Ciencia ficción'
    },
    // ... más libros
  ];

  constructor() { }

  searchBooks(event: any) {
    if (!this.searchQuery.trim()) {
      this.searched = false;
      return;
    }
  
    this.loading = true;
    this.searched = true;
  
    // Filtra los libros simulados
    this.searchResults = this.books.filter(book => 
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
  viewBookDetails(book: Book) {
    console.log('Viewing details for book:', book);
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.searchQuery = '';
    this.searchResults = [];
    this.loading = false;
    this.searched = false;
  }
  
}
