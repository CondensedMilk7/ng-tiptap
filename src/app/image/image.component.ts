import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EditorButtonsService } from '../services/editor-buttons.service';

@Component({
  selector: 'app-image-component',
  styleUrls: ['./image.component.less'],
  templateUrl: './image.component.html',
})
export class ImageComponent {
  constructor(private _buttonService: EditorButtonsService) {}

  @Input() src!: string;
  @Output() action1 = new EventEmitter<void>();
  @Output() action2 = new EventEmitter<void>();
  @Output() action3 = new EventEmitter<void>();

  imgClass = '';

  onAction1() {
    this._buttonService.testing();
  }

  onAction2() {
    this._buttonService.testing();
  }

  onAction3() {
    this._buttonService.testing();
  }
}
