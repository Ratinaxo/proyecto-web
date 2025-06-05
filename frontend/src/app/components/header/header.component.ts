import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent  implements OnInit {
  darkMode: boolean = false;
  constructor(private router:Router, private themeService: ThemeService, private changeDetector: ChangeDetectorRef) {
    this.themeService.darkModeSubject.subscribe((isDark: boolean) => {
      this.darkMode = isDark;
      this.changeDetector.markForCheck();
    });
  }
  goToHome(){
    this.router.navigate(['/home']);
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  
  goToAdmin(){
    this.router.navigate(['/admin']);
  }

  ngOnInit() {}

}

