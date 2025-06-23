import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/interfaces/book';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  forYouBooks: Book[] = [];
  popularBooks: Book[] = [];
  newBooks: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.loadForYou();
    this.loadPopular();
    this.loadNewBooks();
  }

  goToDetail(id: number) {
  this.router.navigate(['/book-details/', id]);
}

goToSearch() {
  this.router.navigate(['/search']);
}


  loadForYou() {
    this.bookService.getAllBooks().subscribe(libros => {
      const seleccionados = libros.slice(0, 6);
      forkJoin(seleccionados.map(b => this.bookService.getBookDetails(b.id)))
        .subscribe(result => this.forYouBooks = result);
    });
  }

  loadPopular() {
    this.bookService.getAllBooks().subscribe(libros => {
      const populares = libros.slice(6, 12); // puedes usar una lógica real luego
      forkJoin(populares.map(b => this.bookService.getBookDetails(b.id)))
        .subscribe(result => this.popularBooks = result);
    });
  }

  loadNewBooks() {
    this.bookService.getAllBooks().subscribe(libros => {
      const recientes = libros.slice(-6).reverse(); // últimos 6 agregados
      forkJoin(recientes.map(b => this.bookService.getBookDetails(b.id)))
        .subscribe(result => this.newBooks = result);
    });
  }
}
