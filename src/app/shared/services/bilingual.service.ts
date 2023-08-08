import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class BilingualService {
  private supportedLanguages = ['hi', 'en']; // Add more languages as needed

  constructor(private translate: TranslateService) {}

  init(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.translate.setDefaultLang('hi'); // Set default language
      this.translate.addLangs(this.supportedLanguages); // Add supported languages
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        // Save the selected language in local storage or cookies
        localStorage.setItem('selectedLanguage', event.lang);
      });
      this.useSavedLanguage();
      resolve();
    });
  }

  useSavedLanguage(): void {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
      this.translate.use(savedLanguage);
    } else {
      this.translate.use('hi'); // Default to English if no saved language found
    }
  }

  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }

  setLanguage(lang: string): void {
    if (this.supportedLanguages.includes(lang)) {
      this.translate.use(lang);
    }
  }
}
