import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { EditorButtonsService } from '../services/editor-buttons.service';
import { AngularNodeViewComponent } from 'ngx-tiptap';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NodeSelection } from 'prosemirror-state';

@Component({
  selector: 'app-image-component',
  styleUrls: ['./image.component.less'],
  templateUrl: './image.component.html',
})
export class ImageComponent extends AngularNodeViewComponent {
  constructor(
    private _buttonService: EditorButtonsService,
    private modalService: NzModalService
  ) {
    super();
  }

  showButtons = false;
  alignment = '';

  @Input() src!: string;

  @HostListener('click') onHostClick() {
    this.selectNode();
  }

  function() {
    this._buttonService.applyImage(this.editor, this.modalService);
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
