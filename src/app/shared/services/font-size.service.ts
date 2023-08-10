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
      this.applyFontSize()
    }
  }

  decreaseFontSize(): void {
    if (this.currentFontSize > 12) {
    this.currentFontSize -= 2;
    this.applyFontSize()
    }
  }


  resetFontSize(): void {
    this.currentFontSize = this.defaultFontSize;
    this.applyFontSize()
  }


  private applyFontSize(): void {
    document.body.style.fontSize = `${this.currentFontSize}px`
  }

}
