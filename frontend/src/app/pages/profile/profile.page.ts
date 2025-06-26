import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { BookService } from 'src/app/services/book/book.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})

export class ProfilePage implements OnInit {
  user: any = {};
  description = '';
  favoritos: Book[] = [];
  leidos: Book[] = [];
  preferredGenresInput: string = '';
  favoriteAuthorsInput: string = '';
  activeTab: string = 'leidos';

  constructor(
    private userService: UserService,
    public alertController: AlertController,
    private router: Router,
    private bookService: BookService
  ) {}


  ngOnInit() {
    this.userService.getProfile().subscribe(res => {
      this.user = res;
      this.description = res['description'] || '';
    });
    this.userService.getFavorites().subscribe(res => this.favoritos = res as any[]);
    this.userService.getReadBooks().subscribe(res => this.leidos = res as any[]);
    this.loadPreferences();
    this.loadBookCovers();
  }

    switchTab(tab: string) {
    this.activeTab = tab;
  }

    goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

    viewBookDetails(libro: any) {
    // Navegar a la página de detalles del libro
    this.router.navigate(['/book-details', libro.id]);
  }

    getGenresList(): string[] {
    if (!this.user?.preferred_genre) return [];
    return this.user.preferred_genre.split(',')
  .map((g: string) => g.trim())
  .filter((g: string) => g.length > 0);
  }

 // Cargar portadas de libros usando el servicio
  loadBookCovers() {
    // Para libros leídos
    if (this.leidos && this.leidos.length > 0) {
      this.leidos.forEach(libro => {
        this.bookService.getBookDetails(libro.id).subscribe(
          (bookWithCover) => {
            libro.cover_url = bookWithCover.cover_url;
          },
          (error) => {
            console.error('Error cargando portada:', error);
            libro.cover_url = 'assets/placeholder.jpg';
          }
        );
      });
    }

    // Para libros favoritos/por leer
    if (this.favoritos && this.favoritos.length > 0) {
      this.favoritos.forEach(libro => {
        this.bookService.getBookDetails(libro.id).subscribe(
          (bookWithCover) => {
            libro.cover_url = bookWithCover.cover_url;
          },
          (error) => {
            console.error('Error cargando portada:', error);
            libro.cover_url = 'assets/placeholder.jpg';
          }
        );
      });
    }
  }



updateDescription() {
    this.userService.updateProfile({ description: this.description }).subscribe(() => {
      alert('Descripción actualizada correctamente');
    });
  }
loadPreferences() {
  this.userService.getUserPreferences().subscribe({
    next: (data: any) => {
      this.preferredGenresInput = data.preferred_genre.join(', ');
      this.favoriteAuthorsInput = data.favorite_authors.join(', ');
    },
    error: (err:any) => {
      console.error('❌ Error al obtener preferencias:', err);
      this.presentAlert('Error al cargar preferencias.');
    }
  });
  
}

  
async presentAlert(message: string) {
  const alert = await this.alertController.create({
    header: 'Información',
    message,
    buttons: ['OK']
  });
  await alert.present();
}

updatePreferences() {
  const genres = this.preferredGenresInput.split(',').map(s => s.trim());
  const authors = this.favoriteAuthorsInput.split(',').map(s => s.trim());

  this.userService.updateUserPreferences(genres, authors).subscribe({
    next: () => {
      this.presentAlert('✅ Preferencias actualizadas correctamente.');
    },
    error: (err:any) => {
      console.error('❌ Error al actualizar preferencias:', err);
      this.presentAlert('Error al actualizar preferencias.');
    }
  });
}

}

