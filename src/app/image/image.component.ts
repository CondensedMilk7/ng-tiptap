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

@Component({
  selector: 'app-image-component',
  styleUrls: ['./image.component.less'],
  templateUrl: './image.component.html',
})
export class ImageComponent extends AngularNodeViewComponent {
  constructor(private _buttonService: EditorButtonsService, private modalService: NzModalService) {
    super();
  }

  showButtons = false;
  alignment = '';

  @Input() src!: string;


  @HostListener('click') onHostClick() {
    console.log('Host element clicked');
  }

  function(){
    this._buttonService.applyImage(this.editor, this.modalService);
  }
}
