import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  SecurityContext,
} from '@angular/core';
import { EditorButtonsService } from '../services/editor-buttons.service';
import { AngularNodeViewComponent } from 'ngx-tiptap';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NodeSelection } from 'prosemirror-state';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-component',
  styleUrls: ['./image.component.less'],
  templateUrl: './image.component.html',
})
export class ImageComponent extends AngularNodeViewComponent {
  constructor(
    private _buttonService: EditorButtonsService,
    private modalService: NzModalService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  showButtons = false;
  alignment = '';

  @Input() src!: string;

  @HostListener('click', ['$event'])
  onHostClick(event: Event) {
    this.showButtons = true;
    this.selectNode();
    event.stopPropagation();
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.showButtons = false; // Hide the buttons when the user clicks anywhere outside the image
  }

  ngOnInit() {
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }
  edit() {
    const src = this.node.attrs['src'];
    const actualSrc = this.sanitizer.sanitize(SecurityContext.URL, src); // Unwrap the SafeValue

    if (actualSrc) {
      console.log(actualSrc);

      const modal = this.modalService.create({
        nzTitle: 'Edit Image',
        nzContent: ImageModalComponent,
        nzComponentParams: {
          image: actualSrc,
          caption: this.node.attrs['caption'],
        },
      });

      modal.afterClose.subscribe((result) => {
        if (result) {
          this.updateImageSrc(result.croppedImage, result.caption);
        }
      });
    }
  }

  updateImageSrc(newSrc: string, newCaption: string) {
    const { state, view } = this.editor;
    const { selection } = state;
    const nodePos = selection.$from.pos;
    const node = state.doc.nodeAt(nodePos);

    if (node && node.type.name === 'img') {
      const tr = state.tr.setNodeMarkup(nodePos, undefined, {
        ...node.attrs,
        src: newSrc,
        caption: newCaption,
      });

      view.dispatch(tr);
    }
  }

  setAlignment(alignment: string) {
    const { state, view } = this.editor;
    const nodePos = this.getPos();
    const node = state.doc.nodeAt(nodePos);

    if (node) {
      const newNode = node.type.create({ ...node.attrs, alignment });
      const tr = state.tr.setNodeMarkup(nodePos, undefined, newNode.attrs);
      view.dispatch(tr);
    }
  }

  isSelected(): boolean {
    const { from, to } = this.editor.state.selection;
    return (
      this.editor.state.selection instanceof NodeSelection &&
      from === this.getPos() &&
      to === this.getPos() + this.node.nodeSize
    );
  }

  selectNode() {
    const { tr } = this.editor.state;
    const { from } = tr.selection;
    const nodeSelection = NodeSelection.create(tr.doc, from);
    this.editor.view.dispatch(tr.setSelection(nodeSelection));
  }
}
