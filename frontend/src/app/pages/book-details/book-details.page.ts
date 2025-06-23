import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../../services/book/book.service';
import { forkJoin, of } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
  standalone: false,
})
export class BookDetailsPage implements OnInit {
  book: Book | null = null;
  reviews: any[] = [];
  recommendations: Book[] = [];

  newReviewText: string = '';
  bookId!: number;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private bookService: BookService,
    private router: Router,
    private userService: UserService,
    private alertController: AlertController
  ) {}
  

ngOnInit() {
  const id = +this.route.snapshot.paramMap.get('id')!;
  this.bookId = id;

  this.bookService.getBookDetails(id).subscribe(b => {
    console.log('📘 Book recibido:', b);
    this.book = b;
    this.loadRecommendations(b.genre);  // ahora tienes el género disponible
  });

  this.loadReviews();
}

goToBook(id: number) {
  this.router.navigate(['/book-details', id]);
}

  loadBook() {
    this.http.get<Book>(`http://localhost:5000/api/books/${this.bookId}`).subscribe(data => {
      this.book = data;
      this.loadRecommendations(data.genre);
    });
  }

  loadReviews() {
    this.http.get<any[]>(`http://localhost:5000/api/reviews/${this.bookId}`).subscribe(data => {
      this.reviews = data;
    });
  }

loadRecommendations(genre: string) {
  this.http.get<Book[]>(`http://localhost:5000/api/books/search?genre=${genre}`).subscribe(data => {
    const filteredBooks = data.filter(book => book.id !== this.bookId).slice(0, 4);
    
    const requests = filteredBooks.map(book =>
      this.bookService.getBookDetails(book.id)
    );

    forkJoin(requests).subscribe(results => {
      this.recommendations = results;
      console.log('✅ Recomendaciones completas:', results);
    });
  });
}



  newRating: number = 5;

  setRating(star: number) {
  this.newRating = star;
}
submitReview() {
  if (!this.newReviewText.trim()) return;

  const reviewPayload = {
    user_id: 1, // en futuro, debe venir del usuario autenticado
    book_id: this.bookId,
    rating: this.newRating,
    comment: this.newReviewText
  };

  this.http.post(`http://localhost:5000/api/reviews`, reviewPayload).subscribe({
    next: () => {
      this.newReviewText = '';
      this.newRating = 5;
      this.loadReviews();
    },
    error: err => {
      alert(err.error?.error || 'Error al guardar reseña');
    }
  });
  }

async presentAlert(message: string, header = 'Información') {
  const alert = await this.alertController.create({
    header,
    message,
    buttons: ['OK'],
  });
  await alert.present();
}

addToFavoritos(bookId: number) {
  this.userService.addFavorite(bookId).subscribe({
    next: () => this.presentAlert('Libro añadido a Favoritos ❤️', 'Éxito'),
    error: (err) => {
      console.error(err);
      this.presentAlert('Error al añadir a Favoritos', 'Error');
    }
  });
}

addToLeidos(bookId: number) {
  this.userService.addReadBook(bookId).subscribe({
    next: () => this.presentAlert('Libro marcado como Leído ✅', 'Éxito'),
    error: (err) => {
      console.error(err);
      this.presentAlert('Error al marcar como Leído', 'Error');
    }
  });
}

}
