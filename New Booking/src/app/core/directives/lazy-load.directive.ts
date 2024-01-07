import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective {
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.createObserver();
    this.observeImage();
  }

  private createObserver() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage();
          this.observer.unobserve(this.el.nativeElement);
        }
      });
    });
  }
  private observeImage() {
    this.observer.observe(this.el.nativeElement);
  }

  private loadImage() {
    const imageSource = this.el.nativeElement.getAttribute('data-src');
    if (imageSource) {
      this.renderer.setAttribute(this.el.nativeElement, 'src', imageSource);
    }
  }
}
