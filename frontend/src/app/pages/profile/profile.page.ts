import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getProfile().subscribe(res => {
      this.user = res;
      this.description = res['description'] || '';
    });
    this.userService.getFavorites().subscribe(res => this.favoritos = res as any[]);
    this.userService.getReadBooks().subscribe(res => this.leidos = res as any[]);
  }

  updateDescription() {
    this.userService.updateProfile({ description: this.description }).subscribe(() => {
      alert('Descripción actualizada correctamente');
    });
  }
}
