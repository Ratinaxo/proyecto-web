import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  user: any = {};
  description = '';
  favoritos: any[] = [];
  leidos: any[] = [];
  preferredGenresInput: string = '';
  favoriteAuthorsInput: string = '';

  constructor(
    private userService: UserService,
    public alertController: AlertController
  ) {}


  ngOnInit() {
    this.userService.getProfile().subscribe(res => {
      this.user = res;
      this.description = res['description'] || '';
    });
    this.userService.getFavorites().subscribe(res => this.favoritos = res as any[]);
    this.userService.getReadBooks().subscribe(res => this.leidos = res as any[]);
    this.loadPreferences();
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
