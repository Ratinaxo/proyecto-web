import { Component } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/interfaces/book'; 
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage {
  query = '';
  filters = {
    title: '',
    author: '',
    genre: '',
    year: ''
  };
  books: Book[] = [];
  isLoading: boolean = false;
  searchPerformed: boolean = false;

  constructor(private bookService: BookService) {}

  onSearch() {
    this.isLoading = true;
    this.searchPerformed = true;
      this.bookService.searchBooks(this.query, this.filters).subscribe((results: Book[]) => {
        this.books = results;
    });
  }
}
