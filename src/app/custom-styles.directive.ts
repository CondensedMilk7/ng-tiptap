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
import { CourseArticleConfig, ElementName } from './custom-styles.model';
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
    if (savedStyles) {
      setTimeout(() => {
        this.config = JSON.parse(savedStyles);
        this.setStyles(this.config);
      }, 500);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setStyles(this.config);
    }, 500);
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
          const className = `.ProseMirror ${tag}`;

          let css = '';
          Object.entries(styles).forEach(([prop, value]) => {
            if (prop === 'border') {
              const borderStyles = styles.border;
              if (borderStyles) {
                let borderWidth = borderStyles.width || '0px';

                // Apply border width to all sides if the tag is an img
                if (tag === 'img') {
                  borderStyles.top = borderWidth;
                  borderStyles.right = borderWidth;
                  borderStyles.bottom = borderWidth;
                  borderStyles.left = borderWidth;
                }

                css += `
            border-style: ${borderStyles.style || 'none'};
            border-color: ${borderStyles.color || 'initial'} !important;
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
          //...
        }
      });

      if (config.elements['.ProseMirror']) {
        const proseMirrorStyles = config.elements['.ProseMirror'];
        if (proseMirrorStyles.backgroundColor) {
          const proseMirrorClassName = '.ProseMirror';
          const proseMirrorCss = `-color: ${proseMirrorStyles.backgroundColor};`;
          const proseMirrorStyleContent = `${proseMirrorClassName} { ${proseMirrorCss} }`;
          style!.textContent += proseMirrorStyleContent;
        }
      }
      if (config.elements['blockquote']) {
        const blockquoteStyles = config.elements['blockquote'];

        // First, find the blockquote element in the host element
        const blockquote =
          this.hostElement.nativeElement.querySelector('blockquote');

        if (blockquote) {
          const children = blockquote.querySelectorAll('*');

          children.forEach((child: any) => {
            const tagName = child.tagName.toLowerCase();

            const tagStyles = config.elements[tagName as ElementName];

            if (tagStyles) {
              let css = '';
              Object.entries(tagStyles).forEach(([prop, value]) => {
                if (prop === 'border') {
                  const borderStyles = tagStyles.border;
                  if (borderStyles) {
                    let borderWidth = borderStyles.width || '0px';
                    borderStyles.top = borderWidth;
                    borderStyles.right = borderWidth;
                    borderStyles.bottom = borderWidth;
                    borderStyles.left = borderWidth;

                    css += `
          border-style: ${borderStyles.style || 'none'};
          border-color: ${borderStyles.color || 'initial'} !important;
          border-top-width: ${borderStyles.top || '0px'};
          border-right-width: ${borderStyles.right || '0px'};
          border-bottom-width: ${borderStyles.bottom || '0px'};
          border-left-width: ${borderStyles.left || '0px'};
        `;
                  }
                } else if (prop === 'color' || prop === 'backgroundColor') {
                  // If the property is 'color' or 'backgroundColor'
                  let color = blockquoteStyles?.color || 'red';
                  css += `${this.toCssNative('color')}: ${color};`; // Add the color to the css
                } else {
                }
              });

              // Apply the styles to the style element in the document head
              const styleContent = `.ProseMirror blockquote ${tagName} { ${css} }`;
              style!.textContent += styleContent;
            }
          });
        }
      }

      console.log(style.textContent);
    }
  }

  toCssNative(str: string) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
}
