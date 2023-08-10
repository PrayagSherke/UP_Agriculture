import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontSizeService {

  private defaultFontSize = 14;
  private currentFontSize: number = this.defaultFontSize;

  constructor() { }

  increaseFontSize(): void {
    if (this.currentFontSize == 14 || this.currentFontSize == 12) {
      this.currentFontSize += 2;
      this.applyFontSize(this.currentFontSize)
    }
  }

  decreaseFontSize(): void {
    if (this.currentFontSize > 12) {
    this.currentFontSize -= 2;
    this.applyFontSize(this.currentFontSize)
    }
  }


  resetFontSize(): void {
    this.currentFontSize = this.defaultFontSize;
    this.applyFontSize(this.currentFontSize)
  }


  public applyFontSize(currentFontSize:any): void {
    localStorage.setItem('SETFONTSIZE',JSON.stringify(currentFontSize))
    document.body.style.fontSize = `${currentFontSize}px`
  }

}
