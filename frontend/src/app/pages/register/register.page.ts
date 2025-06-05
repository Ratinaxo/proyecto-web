import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  rut = '';
  region = '';
  commune = '';

  constructor(
    private alertController: AlertController,
    private apiService: ApiService
  ) {}

  async register() {
    if (this.password !== this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    if (!this.name || !this.email || !this.password || !this.rut || !this.region || !this.commune) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      rut: this.rut,
      region: this.region,
      commune: this.commune
    };

    this.apiService.addUser(data).subscribe({
      next: async () => {
        const successAlert = await this.alertController.create({
          header: 'Éxito',
          message: 'Usuario registrado correctamente.',
          buttons: ['OK']
        });
        await successAlert.present();
      },
      error: async (error) => {
        const errorAlert = await this.alertController.create({
          header: 'Error',
          message: `Error al registrar el usuario: ${error.message}`,
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    });
  }
}
