import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import Paragraph from '@tiptap/extension-paragraph';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { CourseArticleConfig } from './custom-styles.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { lowlight } from 'lowlight/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';

lowlight.registerLanguage('javascript', javascript);
lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);

import hljs from 'highlight.js';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LinkmodalComponent } from './linkmodal/linkmodal.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnDestroy {
  // Imp: Define Editor Instance
  // Imp: Configuration Of Editor
  editor = new Editor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Paragraph.configure({}),
      Blockquote.configure({}),
      CodeBlockLowlight.configure({
        lowlight,
        languageClassPrefix: 'language-',
        HTMLAttributes: {
          class: 'code-block',
        },
      }),
      Image.configure({
        inline: true,
      }),
      Link.configure({
        openOnClick: true,

        HTMLAttributes: {
          target: '_blank',
        },
      }),
    ],
    content:
      '<P>I think where I am not, therefore I am where I do not think.</P>',
  });

  // Imp: Reference to the buttons
  @ViewChild('h1Button') h1Button!: ElementRef;
  @ViewChild('h2Button') h2Button!: ElementRef;
  @ViewChild('h3Button') h3Button!: ElementRef;
  @ViewChild('blockquoteButton') blockquoteButton!: ElementRef;
  @ViewChild('codeButton') codeButton!: ElementRef;
  @ViewChild('imageButton') imageButton!: ElementRef;
  @ViewChild('LinkButton') LinkButton!: ElementRef;

  //Imp:  Define Buttons Logic Here
  ngAfterViewInit(): void {
    this.h1Button.nativeElement.addEventListener('click', () => {
      this.editor.chain().focus().toggleHeading({ level: 1 }).run();
    });

    this.h2Button.nativeElement.addEventListener('click', () => {
      this.editor.chain().focus().toggleHeading({ level: 2 }).run();
    });

    this.h3Button.nativeElement.addEventListener('click', () => {
      this.editor.chain().focus().toggleHeading({ level: 3 }).run();
    });

    this.blockquoteButton.nativeElement.addEventListener('click', () => {
      this.editor.chain().focus().toggleBlockquote().run();
    });

    this.codeButton.nativeElement.addEventListener('click', () => {
      this.editor.chain().focus().toggleCodeBlock().run();
    });

    this.imageButton.nativeElement.addEventListener('click', () => {
      this.editor
        .chain()
        .focus()
        .setImage({ src: 'https://picsum.photos/200/300' })
        .run();
    });

    this.LinkButton.nativeElement.addEventListener('click', () => {
      const modal = this.modalService.create({
        nzContent: LinkmodalComponent,
        nzClosable: false,
        nzOnOk: (componentInstance) => componentInstance.submit(),
      });

      modal.afterClose.subscribe((url) => {
        if (url) {
          if (url.startsWith('http://') || url.startsWith('https://')) {
            this.editor.chain().focus().toggleLink({ href: url }).run();
          } else {
            this.message.create(
              'error',
              `Invalid URL: ${url}. Please include the protocol (http:// or https://)`
            );
          }
        }
      });
    });
  }

  switchTheme(theme: string) {
    switch (theme) {
      case 'neutral':
        this.setNeutralTheme();
        break;
      case 'dark':
        this.setDarkTheme();
        break;
      case 'pink':
        this.setPinkTheme();
        break;
      default:
        break;
    }
  }

  setNeutralTheme() {
    this.customStyles.patchValue({
      globalFontFamily: 'Arial',
      elements: {
        h1: {
          color: '#153243',
          fontFamily: 'Helvetica',
          fontSize: '2rem',
          textAlign: 'left',
          fontStyle: 'normal',
        },
        h2: {
          color: '#153243',
          fontFamily: 'Helvetica',
          textAlign: 'left',
          fontSize: '1.8rem',
          fontStyle: 'normal',
        },
        h3: {
          color: '#153243',
          fontFamily: 'Helvetica',
          fontSize: '1.6rem',
          textAlign: 'left',
          fontStyle: 'italic',
        },
        p: {
          color: '#153243',
          fontFamily: 'Helvetica',
          fontSize: '16px',
          textAlign: 'left',
          fontStyle: 'normal',
          letterSpacing: '1px',
        },
        blockquote: {
          color: '#153243',
          fontFamily: 'serif',
          fontSize: '1.2rem',
          fontStyle: 'normal',
          maxWidth: '100%',
          padding: '10px',
          margin: '0px',
          backgroundColor: '#e9e9e9',
          textAlign: 'left',
          borderRadius: '10px',
          border: {
            color: '#153243',
            style: 'dashed',
            radius: '10px',
            top: '2px',
            right: '0px',
            bottom: '2px',
            left: '10px',
          },
        },
        a: {
          color: '#153243',
          fontFamily: 'serif',
          fontSize: '1.2rem',
          fontStyle: 'normal',
        },
        '.ProseMirror': {
          backgroundColor: '#e9e9e9',
        },
        mark: {
          backgroundColor: '#ffdb00',
        },
        img: {
          maxWidth: '100%',
          padding: '10px',
          margin: '0px',
          borderRadius: '50%',
          border: {
            color: '#153243',
            style: 'dotted',
            radius: '50%',
            width: '5px',
            top: '5px',
            right: '5px',
            bottom: '5px',
            left: '5px',
          },
        },
      },
    });
    this.customStyles$.next(this.customStyles.getRawValue());
  }

  setDarkTheme() {
    this.customStyles.patchValue({
      globalFontFamily: 'Arial',
      elements: {
        h1: {
          color: 'white',
          fontFamily: 'Helvetica',
          fontSize: '2rem',
          textAlign: 'left',
          fontStyle: 'normal',
        },
        h2: {
          color: 'white',
          fontFamily: 'Helvetica',
          textAlign: 'left',
          fontSize: '1.8rem',
          fontStyle: 'normal',
        },
        h3: {
          color: 'white',
          fontFamily: 'Helvetica',
          fontSize: '1.6rem',
          textAlign: 'left',
          fontStyle: 'italic',
        },
        p: {
          color: 'white',
          fontFamily: 'Helvetica',
          fontSize: '16px',
          textAlign: 'left',
          fontStyle: 'normal',
          letterSpacing: '1px',
        },
        blockquote: {
          color: 'gray',
          fontFamily: 'serif',
          fontSize: '1.2rem',
          fontStyle: 'normal',
          maxWidth: '100%',
          padding: '10px',
          margin: '0px',
          backgroundColor: '#333',
          textAlign: 'left',
          borderRadius: '10px',
          border: {
            color: 'orange',
            style: 'dashed',
            radius: '10px',
            top: '2px',
            right: '0px',
            bottom: '2px',
            left: '10px',
          },
        },
        a: {
          color: 'blue',
          fontFamily: 'serif',
          fontSize: '1.2rem',
          fontStyle: 'normal',
        },
        '.ProseMirror': {
          backgroundColor: '#333',
        },
        mark: {
          backgroundColor: 'yellow',
        },
        img: {
          maxWidth: '100%',
          padding: '10px',
          margin: '0px',
          borderRadius: '50%',
          border: {
            color: 'red',
            style: 'dotted',
            radius: '50%',
            width: '5px',
            top: '5px',
            right: '5px',
            bottom: '5px',
            left: '5px',
          },
        },
      },
    });
    this.customStyles$.next(this.customStyles.getRawValue());
  }

  setPinkTheme() {
    this.customStyles.patchValue({
      globalFontFamily: 'Arial',
      elements: {
        h1: {
          color: '#ff66cc',
          fontFamily: 'Helvetica',
          fontSize: '2rem',
          textAlign: 'left',
          fontStyle: 'normal',
        },
        h2: {
          color: '#ff66cc',
          fontFamily: 'Helvetica',
          textAlign: 'left',
          fontSize: '1.8rem',
          fontStyle: 'normal',
        },
        h3: {
          color: '#ff66cc',
          fontFamily: 'Helvetica',
          fontSize: '1.6rem',
          textAlign: 'left',
          fontStyle: 'italic',
        },
        p: {
          color: '#ff66cc',
          fontFamily: 'Helvetica',
          fontSize: '16px',
          textAlign: 'left',
          fontStyle: 'normal',
          letterSpacing: '1px',
        },
        blockquote: {
          color: 'gray',
          fontFamily: 'serif',
          fontSize: '1.2rem',
          fontStyle: 'normal',
          maxWidth: '100%',
          padding: '10px',
          margin: '0px',
          backgroundColor: '#ffe6f2',
          textAlign: 'left',
          borderRadius: '10px',
          border: {
            color: '#ff66cc',
            style: 'dashed',
            radius: '10px',
            top: '2px',
            right: '0px',
            bottom: '2px',
            left: '10px',
          },
        },
        a: {
          color: '#ff66cc',
          fontFamily: 'serif',
          fontSize: '1.2rem',
          fontStyle: 'normal',
        },
        '.ProseMirror': {
          backgroundColor: '#ffe6f2',
        },
        mark: {
          backgroundColor: '#ffccff',
        },
        img: {
          maxWidth: '100%',
          padding: '10px',
          margin: '0px',
          borderRadius: '50%',
          border: {
            color: '#ff66cc',
            style: 'dotted',
            radius: '50%',
            width: '5px',
            top: '5px',
            right: '5px',
            bottom: '5px',
            left: '5px',
          },
        },
      },
    });
    this.customStyles$.next(this.customStyles.getRawValue());
  }

  // Unsorted Code

  quillContent$: Observable<string | null> = of(null);
  editorContent = '';
  quillStyle: object = {};
  viewMode: 'css' | 'json' = 'css';

  // ? Limitation Of Mark Color
  customBackgroundColorPalette: string[] = ['#cfcf'];
  quillInstance: any;

  quillModules = {};

  someConfig: CourseArticleConfig = {
    fontFamilies: ['Helvetica', 'Arial', 'Roboto'],
    globalFontFamily: 'Serif',
    elements: {
      h1: {
        color: 'purple',
        fontFamily: 'Helvetica',
        fontSize: '2.2rem',
      },
      blockquote: {
        border: {
          color: '#4ace',
          width: '4px',
          style: 'solid',
        },
      },
    },
  };

  // *  Drop Down Options

  // ? Text Align Options
  textAlignOptions = [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' },
    { label: 'Justify', value: 'justify' },
  ];
  // ? Border Style Options
  borderStyleOptions = [
    { label: 'Solid', value: 'solid' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Dotted', value: 'dotted' },
    { label: 'Double', value: 'double' },
    { label: 'Groove', value: 'groove' },
    { label: 'Ridge', value: 'ridge' },
    { label: 'Inset', value: 'inset' },
    { label: 'Outset', value: 'outset' },
    { label: 'None', value: 'none' },
    { label: 'Hidden', value: 'hidden' },
  ];
  // ? Font Style Options
  fontStyleOptions = [
    { label: 'Normal', value: 'normal' },
    { label: 'Italic', value: 'italic' },
    { label: 'Oblique', value: 'oblique' },
    // ? Add Bold
  ];
  // ? Return Icon Class
  getIconClass(value: string) {
    switch (value) {
      case 'left':
        return 'bi bi-text-left';
      case 'center':
        return 'bi bi-text-center';
      case 'right':
        return 'bi bi-text-right';
      case 'justify':
        return 'bi bi-justify';
      default:
        return '';
    }
  }
  //? Fonf Family Options
  defaultFontFamilies: string[] = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Lucida Console',
    'Roboto',
    'Open Sans',
    'Lato',
    'Oswald',
    'Slabo 27px',
    'Source Sans Pro',
    'Montserrat',
    'Raleway',
    'PT Sans',
    'Noto Sans',
    'Lora',
    'Ubuntu',
    'Droid Sans',
    'Roboto Condensed',
    'Merriweather',
    'Fira Sans',
    'PT Serif',
    'Poppins',
    'Playfair Display',
    'Nunito',
    'Muli',
    'Cabin',
    'Work Sans',
    'Quicksand',
    'Zilla Slab',
    'Comfortaa',
    'Roboto Mono',
    'Libre Baskerville',
    'Rubik',
    'Arvo',
    'PT Sans Narrow',
    'Inconsolata',
    'Karla',
    'Exo 2',
    'Abel',
    'Old Standard TT',
  ];

  // ? Custom Fonts loader
  // Called in NgOnInit to load fonts
  loadFont(fontName: string) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
      ' ',
      '+'
    )}&display=swap`;
    document.head.appendChild(link);
  }

  // ? FontSize Options
  sizes: number[] = [
    6, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 48, 60,
    72,
  ];

  //? Spacing && Line Height Options
  lineHeightOptions: number[] = [1, 1.15, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9];
  letterSpacingOptions: number[] = [0, 0.5, 1, 1.5, 2, 2.5, 3];
  constructor(
    private fb: NonNullableFormBuilder,
    private modalService: NzModalService,
    public message: NzMessageService
  ) {}
  // * Form Group
  customStyles = this.fb.group({
    fontFamilies: this.fb.array(['Helvetica', 'Serif']),
    globalFontFamily: 'Helvetica',
    elements: this.fb.group({
      h1: this.fb.group({
        color: 'red',
        fontFamily: 'Helvetica',
        fontSize: '2rem',
        textAlign: 'left',
        fontStyle: 'normal',
      }),

      h2: this.fb.group({
        color: 'black',
        fontFamily: 'Helvetica',
        textAlign: 'left',
        fontSize: '1.8rem',
        fontStyle: 'normal',
      }),

      h3: this.fb.group({
        color: 'black',
        fontFamily: 'Helvetica',
        fontSize: '1.6rem',
        textAlign: 'left',
        fontStyle: 'normal',
      }),

      p: this.fb.group({
        color: 'black',
        fontFamily: 'Helvetica',
        fontSize: '16px',
        textAlign: 'left',
        fontStyle: 'normal',
        letterSpacing: '0',
      }),
      blockquote: this.fb.group({
        color: 'gray',
        fontFamily: 'serif',
        fontSize: '1.2rem',
        fontStyle: 'normal',
        maxWidth: '100%',
        padding: '10px',
        margin: '0px',
        backgroundColor: 'white',
        textAlign: 'left',
        // ? Added here
        borderRadius: '0px',
        border: this.fb.group({
          color: 'orange',
          style: 'solid',
          // ! As I Know There is No Border Support Here
          radius: '0px',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '10px',
        }),
      }),

      a: this.fb.group({
        color: 'blue',
        fontFamily: 'serif',
        fontSize: '1.2rem',
        fontStyle: 'normal',
      }),
      '.ProseMirror': this.fb.group({
        backgroundColor: 'white',
      }),
      mark: this.fb.group({
        backgroundColor: 'yellow',
      }),
      img: this.fb.group({
        maxWidth: '100%',
        padding: '10px',
        margin: '0px',
        borderRadius: '0px',
        border: this.fb.group({
          color: 'red',
          style: 'solid',
          radius: '0px', // change this to borderRadius
          width: '25px',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        }),
      }),
    }),
  });

  customStyles$ = new BehaviorSubject<CourseArticleConfig>(
    (this.quillStyle = this.customStyles.getRawValue())
  );

  ngOnInit() {
    // load saved custom styles from local storage if it exists, or use initial value otherwise
    const savedCustomStyles = localStorage.getItem('custom_styles');
    if (savedCustomStyles) {
      this.customStyles.setValue(JSON.parse(savedCustomStyles));
    }

    this.customStyles.valueChanges.subscribe((value) => {
      this.customStyles$.next(this.customStyles.getRawValue());

      // save custom styles to local storage when it changes
      localStorage.setItem(
        'custom_styles',
        JSON.stringify(this.customStyles.getRawValue())
      );

      this.quillStyle = this.customStyles.getRawValue();
    });

    // Get The Value From Local Storage
    this.quillContent$ = of(localStorage.getItem('editor_content'));

    this.defaultFontFamilies.forEach((font) => this.loadFont(font));
  }

  onContentUpdated(newContent: string) {
    this.customStyles$ = new BehaviorSubject<CourseArticleConfig>(
      (this.quillStyle = this.customStyles.getRawValue())
    );

    this.editorContent = newContent;
    localStorage.setItem('editor_content', this.editorContent);
    this.quillContent$ = of(localStorage.getItem('editor_content'));
    console.log(this.editorContent);
  }

  // Modal Code
  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;

    // ?  Updating Values of the QuillStyle When Oppening Modal
    this.quillStyle = this.customStyles.getRawValue();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  // Imp: Destroys The Editors Instance
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  // Check For First Time Enter
}
