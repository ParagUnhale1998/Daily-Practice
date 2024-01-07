// preload-image.directive.ts

import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPreloadImage]',
})
export class PreloadImageDirective {
  @Input() appPreloadImage!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.preloadImage(this.appPreloadImage);
  }

  preloadImage(src: string): void {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      this.renderer.setStyle(this.el.nativeElement, 'background-image', `url(${src})`);
    };
  }
}
