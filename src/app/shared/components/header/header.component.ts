import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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
  displayLanguage: any = "Hindi";
  isSavedTheme: boolean;
  getLanguage: any;
  @ViewChild('main') myDivRef: ElementRef;

  @Input() isMenu: boolean = false;

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

    this.bilingualService.init().then(() => {
      this.supportedLanguages = this.bilingualService.getSupportedLanguages();
    });

    let tempSavedTheme: any = localStorage.getItem('selectedTheme');
    this.isSavedTheme = JSON.parse(tempSavedTheme);
    this.LocalStorageToggleTheme(this.isSavedTheme)

    let tempSavedFontSize: any = localStorage.getItem('SETFONTSIZE');
    let convert2NumberFont: number = +tempSavedFontSize;
    if (convert2NumberFont == 0) {
      convert2NumberFont = 14
    }
    this.fontSizeService.applyFontSize(convert2NumberFont);

    this.getLanguage = localStorage.getItem('selectedLanguage');
    this.displayLanguage = this.getLanguage == 'hi' ? 'English' : 'Hindi';

  }

  ngAfterViewInit(): void {
    if (this.isMenu) this.hindFontSize(this.getLanguage)
  }

  changeLanguage(lang: any): void {
    this.displayLanguage = lang == 'hi' ? 'English' : 'Hindi';
    if (this.isMenu) this.hindFontSize(lang)
    this.bilingualService.setLanguage(lang);
  }

  hindFontSize(lang: any) {
    let navbar: any = document.getElementById("navbar");
    if (lang == 'hi') {
      navbar.classList.add('HINDI')
    }
    else {
      navbar.classList.remove('HINDI')
    }
  }

}
