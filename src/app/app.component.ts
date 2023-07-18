import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import Paragraph from '@tiptap/extension-paragraph';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { HostListener } from '@angular/core';

import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

import { FormArray, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { CourseArticleConfig, IThemeStyles } from './custom-styles.model';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { lowlight } from 'lowlight/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import { THEMES } from './custom-styles.model';
import { textAlignIcons, textAlignOptions } from './data/text-align-options';
import { borderStyleOptions } from './data/border-style.options';
import {
  fontSizes,
  letterSpacingOptions,
  lineHeightOptions,
} from './data/text-options';
lowlight.registerLanguage('javascript', javascript);
lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);

import hljs from 'highlight.js';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LinkmodalComponent } from './linkmodal/linkmodal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { fontStyleOptions } from './data/font-style-options';
import { defaultFontFamilies, loadFont } from './data/font-family.options';
import { EditorButtonsService } from './services/editor-buttons.service';
import Youtube from '@tiptap/extension-youtube';
import Highlight from '@tiptap/extension-highlight';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnDestroy {
  // Imp: Define Editor Instance
  // Imp: Configuration Of Editor
  isEditorEnabled = true;
  toggleEditorMode(isEditorEnabled: boolean): void {
    // store the current mode in local storage
    localStorage.setItem('editorMode', isEditorEnabled ? 'editor' : 'static');

    location.reload();
  }

  displayTableSettings = false;

  themes = Object.keys(THEMES);
  currentTheme!: string;

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
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Youtube.configure({}),
      Highlight.configure({}),
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
  @ViewChild('boldButton') boldButton!: ElementRef;
  @ViewChild('italicButton') italicButton!: ElementRef;
  @ViewChild('underlineButton') underlineButton!: ElementRef;
  @ViewChild('strikeButton') strikeButton!: ElementRef;
  @ViewChild('orderedListButton') orderedListButton!: ElementRef;
  @ViewChild('unorderedListButton') unorderedListButton!: ElementRef;

  // Table Buttons
  @ViewChild('tableButton') tableButton!: ElementRef;
  @ViewChild('tableDeleteTableButton') tableDeleteTableButton!: ElementRef;
  @ViewChild('tableDeleteRowButton') tableDeleteRowButton!: ElementRef;
  @ViewChild('tableDeleteColumnButton') tableDeleteColumnButton!: ElementRef;
  @ViewChild('tableAddRowButton') tableAddRowButton!: ElementRef;
  @ViewChild('tableAddColumnButton') tableAddColumnButton!: ElementRef;
  @ViewChild('videoButton') videoButton!: ElementRef;
  @ViewChild('CustomButton') CustomButton!: ElementRef;
  @ViewChild('markButton') markButton!: ElementRef;

  //Imp:  Define Buttons Logic Here
  ngAfterViewInit(): void {
    this.h1Button.nativeElement.addEventListener('click', () => {
      this.editorButtonService.applyHeading(this.editor, 1);
    });

    this.h2Button.nativeElement.addEventListener('click', () => {
      this.editorButtonService.applyHeading(this.editor, 2);
    });

    this.h3Button.nativeElement.addEventListener('click', () => {
      this.editorButtonService.applyHeading(this.editor, 3);
    });

    this.blockquoteButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.applyBlockquote(this.editor);
    });

    this.codeButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.applyCodeBlock(this.editor);
    });

    this.imageButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.applyImage(this.editor, this.modalService);
    });

    this.boldButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.applyBold(this.editor);
    });

    this.italicButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.applyItalic(this.editor);
    });

    this.unorderedListButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.applyBulletList(this.editor);
    });

    this.orderedListButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.applyOrderedList(this.editor);
    });

    this.tableButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.applyTable(
        this.editor,
        this.modalService,
        this.message
      );
    });

    this.LinkButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.applyLink(
        this.editor,
        this.modalService,
        this.message
      );
    });

    this.tableDeleteTableButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.deleteTable(this.editor);
    });

    this.tableDeleteRowButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.deleteRow(this.editor);
    });

    this.tableDeleteColumnButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.deleteColumn(this.editor);
    });

    this.tableAddRowButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.addRowAfter(this.editor);
    });

    this.tableAddColumnButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.addColumnAfter(this.editor);
    });

    this.videoButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.addVideo(this.editor, this.modalService);
    });

    this.markButton.nativeElement.addEventListener('click', () => {
      this.editorButtonService.addMark(this.editor);
    });
  }

  @ViewChild('overlay', { static: false }) overlay!: ElementRef;

  @ViewChild('tiptapEditor', { static: false }) tiptapEditor!: ElementRef;
  private hideOverlayTimeout: any;

  editorContentMouseover(event: MouseEvent) {
    clearTimeout(this.hideOverlayTimeout);

    const target = event.target as HTMLElement;
    const tableWrapper = document.querySelector('.tableWrapper');

    if (
      target.nodeName === 'TABLE' ||
      (tableWrapper && tableWrapper.contains(target))
    ) {
      const table =
        target.nodeName === 'TABLE' ? target : target.closest('table');
      const rect = table?.getBoundingClientRect();
      const overlay = this.overlay.nativeElement;

      const tableLeft = rect!.left + window.pageXOffset;
      const tableTop = rect!.top + window.pageYOffset + rect!.height;

      overlay.style.left = `${tableLeft}px`;
      overlay.style.top = `${tableTop}px`;
      overlay.style.display = 'block';
    }
  }

  editorContentMouseleave(event: MouseEvent) {
    this.hideOverlayTimeout = setTimeout(() => {
      this.overlay.nativeElement.style.display = 'none';
    }, 100);
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (this.overlay.nativeElement.contains(target)) {
      clearTimeout(this.hideOverlayTimeout); // Clear hideOverlayTimeout if we're hovering over the overlay
    }
  }

  onOverlayMouseLeave(event: MouseEvent) {
    this.hideOverlayTimeout = setTimeout(() => {
      this.overlay.nativeElement.style.display = 'none';
    }, 100); // 100ms delay before hiding the overlay
  }

  deleteTable(editor: Editor): void {
    editor.chain().focus().deleteTable().run();
  }

  addRowAfter(editor: Editor): void {
    editor.chain().focus().addRowAfter().run();
  }

  deleteRow(editor: Editor): void {
    editor.chain().focus().deleteRow().run();
  }

  addColumnAfter(editor: Editor): void {
    editor.chain().focus().addColumnAfter().run();
  }

  deleteColumn(editor: Editor): void {
    editor.chain().focus().deleteColumn().run();
  }

  switchTheme(theme: string) {
    this.currentTheme = theme;
    const themeStyles = this.createThemeStyles(THEMES[theme]);

    this.customStyles.patchValue(themeStyles);
    this.customStyles$.next(themeStyles);

    localStorage.setItem('custom_styles', JSON.stringify(themeStyles));
  }

  createThemeStyles(theme: IThemeStyles): CourseArticleConfig {
    return {
      fontFamilies: ['Arial', 'Helvetica', 'serif'],
      globalFontFamily: 'Arial',
      elements: {
        h1: {
          color: theme.color,
          fontFamily: 'Helvetica',
          fontSize: '2rem',
          textAlign: 'left',
          fontStyle: 'normal',
        },
        h2: {
          color: theme.color,
          fontFamily: 'Helvetica',
          fontSize: '1.8rem',
          textAlign: 'left',
          fontStyle: 'normal',
        },
        h3: {
          color: theme.color,
          fontFamily: 'Helvetica',
          fontSize: '1.6rem',
          textAlign: 'left',
          fontStyle: 'italic',
        },
        p: {
          color: theme.color,
          fontFamily: 'Helvetica',
          fontSize: '16px',
          textAlign: 'left',
          fontStyle: 'normal',
          letterSpacing: '1px',
        },
        blockquote: {
          color: theme.blockquoteColor,
          fontFamily: 'serif',
          fontSize: '1.2rem',
          fontStyle: 'normal',
          maxWidth: '250px',
          padding: '10px',
          margin: '0px',
          backgroundColor: theme.backgroundColor,
          textAlign: 'left',
          borderRadius: '0px',
          border: {
            color: theme.borderColor,
            style: 'solid',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '10px',
          },
        },
        a: {
          color: theme.aColor,
          fontFamily: 'serif',
          fontSize: '1.2rem',
          fontStyle: 'normal',
        },
        '.ProseMirror': {
          backgroundColor: theme.backgroundColor,
        },
        mark: {
          backgroundColor: theme.backgroundColor,
        },
        img: {
          maxWidth: '100%',
          padding: '10px',
          margin: '0px',
          borderRadius: '50%',
          border: {
            color: theme.borderColor,
            style: 'dotted',
            width: '5px',
            top: '5px',
            right: '5px',
            bottom: '5px',
            left: '5px',
          },
        },
      },
    };
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
  textAlignOptions = textAlignOptions;
  borderStyleOptions = borderStyleOptions;
  fontStyleOptions = fontStyleOptions;
  getIconClass(value: string): string {
    return textAlignIcons[value] || '';
  }

  defaultFontFamilies = defaultFontFamilies;

  // ? FontSize Options
  sizes = fontSizes;
  lineHeightOptions = lineHeightOptions;
  letterSpacingOptions = letterSpacingOptions;

  constructor(
    private fb: NonNullableFormBuilder,
    private modalService: NzModalService,
    public message: NzMessageService,
    public editorButtonService: EditorButtonsService
  ) {}
  // * Form Group
  customStyles = this.fb.group({
    fontFamilies: this.fb.array(['Helvetica', 'Serif']),
    globalFontFamily: 'Helvetica',
    elements: this.fb.group({
      h1: this.fb.group({
        color: 'black',
        fontFamily: 'Helvetica',
        fontSize: '2em',
        textAlign: 'left',
        fontStyle: 'normal',
      }),

      h2: this.fb.group({
        color: 'black',
        fontFamily: 'Helvetica',
        textAlign: 'left',
        fontSize: '1.5em',
        fontStyle: 'normal',
      }),

      h3: this.fb.group({
        color: 'black',
        fontFamily: 'Helvetica',
        fontSize: '1.17em',
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

    this.defaultFontFamilies.forEach(loadFont);

    const storedMode = localStorage.getItem('editorMode');
    this.isEditorEnabled = storedMode === 'editor';
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
}
