import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectorRef,
  Renderer2,
  Inject,
} from '@angular/core';
import { CourseArticleConfig } from './custom-styles.model';
encapsulation: ViewEncapsulation.None;
import { DOCUMENT } from '@angular/common';
@Directive({
  selector: '[appCustomStyles]',
})
export class CustomStylesDirective implements OnChanges {
  @Input() config!: CourseArticleConfig | null;

  constructor(
    private hostElement: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngOnInit(): void {
    // Getting the saved styles from localstorage
    const savedStyles = localStorage.getItem('custom_styles');
    if(savedStyles) {
      this.config = JSON.parse(savedStyles);
      this.setStyles(this.config);
    }
  }

  ngAfterViewInit(): void {
    this.setStyles(this.config);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const config = changes['config'].currentValue as CourseArticleConfig | null;
    this.setStyles(config);
  }

  setStyles(config: CourseArticleConfig | null) {
    if (config) {
      // Get the existing style tag
      let style = this.document.head.querySelector('style#customStyles');

      // If it doesn't exist, create a new one
      if (!style) {
        style = this.document.createElement('style');
        style.id = 'customStyles';
        this.document.head.appendChild(style);
      }

      // Clear the previous styles
      style.textContent = '';

      Object.entries(config.elements).forEach(([tag, styles]) => {
        const elements = this.hostElement.nativeElement.querySelectorAll(tag);
        if (elements.length) {
          // This Line Fixed Most Of Our Issues :DDDD
          const className = `.ProseMirror ${tag}`;

          let css = '';
          Object.entries(styles).forEach(([prop, value]) => {
            if (prop === 'border') {
              const borderStyles = styles.border;
              if (borderStyles) {
                css += `
                  border-style: ${borderStyles.style || 'none'};
                  border-color: ${borderStyles.color || 'initial'} !important ;
                  border-top-width: ${borderStyles.top || '0px'};
                  border-right-width: ${borderStyles.right || '0px'};
                  border-bottom-width: ${borderStyles.bottom || '0px'};
                  border-left-width: ${borderStyles.left || '0px'};
                `;
              }
            } else {
              css += `${this.toCssNative(prop)}: ${value};`;
            }
          });

          const styleContent = `${className} { ${css} }`;
          style!.textContent += styleContent;
        } else {
        }
      });

      console.log(style.textContent);
    }
  }

  toCssNative(str: string) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
}
