import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private renderer: Renderer2;
  private currentTheme: 'dark' | 'light' = 'light'
  private dynamicLink: HTMLLinkElement;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null)
  }

  toggleTheme(event: boolean) {
    if (this.dynamicLink && this.dynamicLink.parentNode === document.head) {
      this.renderer.removeChild(document.head, this.dynamicLink);
    }
    this.dynamicLink = this.renderer.createElement('link');
    this.dynamicLink.rel = 'stylesheet';
    if (event) {
      this.dynamicLink.href = 'assets/css/dark.css';
    }
    else {
      this.dynamicLink.href = 'assets/css/light.css';
    }
    this.renderer.appendChild(document.head, this.dynamicLink);
  }

}
