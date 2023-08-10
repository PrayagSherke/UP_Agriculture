import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BilingualService } from '../../services/bilingual.service';
import { ThemeService } from '../../services/theme.service';
import { FontSizeService } from '../../services/font-size.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  supportedLanguages: string[] = [];
  displayLanguage: any = "";
  isSavedTheme: boolean;
  @ViewChild('main') myDivRef: ElementRef;
  constructor(
    public bilingualService: BilingualService,
    private themeService: ThemeService,
    private fontSizeService: FontSizeService

  ) { }

  toggleTheme(event: any) {
    if (event.target.checked) {
      this.themeService.toggleTheme(true)
    }
    else {
      this.themeService.toggleTheme(false)
    }
  }

  LocalStorageToggleTheme(theme: any) {
    this.themeService.toggleTheme(theme)
  }

  increaseFontSize() {
    this.fontSizeService.increaseFontSize();
  }

  decreaseFontSize() {
    this.fontSizeService.decreaseFontSize();
  }

  resetFontSize() {
    this.fontSizeService.resetFontSize();
  }

  scroll() {
    const mainContent = document.getElementById('main');
    mainContent ? window.scroll(0, 430) : window.scroll(0, 100);
  }
  ngOnInit(): void {
    let getLanguage = localStorage.getItem('selectedLanguage');
    this.displayLanguage = getLanguage == 'hi' ? 'English' : 'Hindi';
    this.bilingualService.init().then(() => {
      this.supportedLanguages = this.bilingualService.getSupportedLanguages();
    });

    let tempSavedTheme: any = localStorage.getItem('selectedTheme');
    this.isSavedTheme = JSON.parse(tempSavedTheme);
    this.LocalStorageToggleTheme(this.isSavedTheme)

    let tempSavedFontSize: any = localStorage.getItem('SETFONTSIZE');
    let convert2NumberFont: number = +tempSavedFontSize;
    if(convert2NumberFont==0) {
      convert2NumberFont = 14
    }
    this.fontSizeService.applyFontSize(convert2NumberFont);

  }

  changeLanguage(lang: any): void {
    this.displayLanguage = lang == 'hi' ? 'English' : 'Hindi';
    this.bilingualService.setLanguage(lang);
  }

}
