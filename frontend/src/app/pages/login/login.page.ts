import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private router: Router, private apiService: ApiService, private alertController: AlertController) { }
  
  goToRegister(){
    this.router.navigate(['/register']);
  }
  
  async login() {
  if (!this.email || !this.password) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor, completa todos los campos.',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }
  this.apiService.login_user({ email: this.email, password: this.password }).subscribe({
    next: async (res: any) => {
      localStorage.setItem('token', res.access_token);
      // Fetch user info using the token
      this.apiService.getMe().subscribe({
        next: async (user: any) => {
          localStorage.setItem('user', JSON.stringify(user));

          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Inicio de sesión exitoso.',
            buttons: ['OK']
          });
          await alert.present();
          this.router.navigate(['/home']);
        },
        error: async () => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No se pudo obtener la información del usuario.',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
    },
    error: async (error) => {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }});
  }
}
