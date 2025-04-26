import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = false;
  public darkModeSubject = new BehaviorSubject<boolean>(this.darkMode);

  constructor(private storage: Storage) {
    this.storage.create();
    this.loadThemePreference();
  }

  async loadThemePreference() {
    try {
      const savedTheme = await this.storage.get('darkMode');
      if (savedTheme !== null) {
        this.applyTheme(savedTheme);
      } else {
        const systemDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        this.applyTheme(systemDark);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  }

  private applyTheme(isDark: boolean) {
    this.darkMode = isDark;
    this.darkModeSubject.next(isDark);

    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark-theme', isDark);

    htmlElement.style.setProperty(
      '--app-background',
      isDark ? '#181917' : '#ffffff'
    );
    htmlElement.style.setProperty(
      '--app-text-color',
      isDark ? '#f8f8f8' : '#000000'
    );

    this.storage
      .set('darkMode', isDark)
      .catch((err) => console.error('Error saving theme:', err));
  }

  toggleDarkMode() {
    this.applyTheme(!this.darkMode);
  }
}
