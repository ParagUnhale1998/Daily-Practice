import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective implements OnInit {
  @Input() lazyLoadSrc: string = ''; // Provide a default value

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // console.log('LazyLoadDirective initialized');

    this.showLoadingSkeleton(); // Display loading skeleton initially
    this.lazyLoadImage();
  }

  private showLoadingSkeleton(): void {
    // Apply a blur effect to the image while it's loading.
    this.renderer.setStyle(this.el.nativeElement, 'backdrop-filter', 'blur(10px)');

    // Create a loading skeleton div.
    const skeletonDiv = this.renderer.createElement('div');
    this.renderer.addClass(skeletonDiv, 'loading-skeleton');
    this.renderer.appendChild(this.el.nativeElement, skeletonDiv);
  }

  private lazyLoadImage(): void {
    // console.log('LazyLoadDirective is lazy loading image');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.loadImage();
        observer.disconnect();
      }
    }, options);

    observer.observe(this.el.nativeElement);
  }

  private loadImage(): void {
    // console.log('LazyLoadDirective is loading the image');

    // Remove the blur effect and loading skeleton when the actual image is loaded.
    this.renderer.removeStyle(this.el.nativeElement, 'backdrop-filter');
    this.renderer.removeChild(this.el.nativeElement, this.el.nativeElement.querySelector('.loading-skeleton'));

    // Create a new Image element to load the actual image.
    const image = new Image();
    image.src = this.lazyLoadSrc; // Use the provided value, which is guaranteed to be a string.

    // When the actual image is loaded, update the 'src' attribute.
    image.onload = () => {
      this.renderer.setAttribute(this.el.nativeElement, 'src', this.lazyLoadSrc);
    };

    // If there's an error loading the image, you can handle it by setting a different placeholder or taking appropriate action.
    image.onerror = (error) => {
      // console.error('Error loading image:', error);
      // Set a placeholder or error state.
      const errorPlaceholderSrc = 'path-to-error-placeholder-image'; // Replace with your error placeholder image URL
      this.renderer.setAttribute(this.el.nativeElement, 'src', errorPlaceholderSrc);
    };
  }
}
