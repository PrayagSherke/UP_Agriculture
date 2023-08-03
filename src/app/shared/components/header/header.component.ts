import { Component, OnInit } from '@angular/core';
import { BilingualService } from '../../services/bilingual.service';
import { ThemeService } from '../../services/theme.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  supportedLanguages: string[] = [];
  displayLanguage:any = ""

  constructor(
    public bilingualService: BilingualService,
    private themeService: ThemeService,

  ) { }

  toggleTheme(event: any) {
   this.themeService.toggleTheme(event.target.checked)
  }

  ngOnInit(): void {
    let getLanguage = localStorage.getItem('selectedLanguage');
    this.displayLanguage= getLanguage=='hi'?'English':'Hindi';
    this.bilingualService.init().then(() => {
      this.supportedLanguages = this.bilingualService.getSupportedLanguages();
    });
  }

  changeLanguage(lang: any): void {
    this.displayLanguage= lang=='hi'?'English':'Hindi';
    this.bilingualService.setLanguage(lang);
  }

}
