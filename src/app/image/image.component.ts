import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-component',
  styleUrls: ['./image.component.less'],
  templateUrl: './image.component.html',
})
export class ImageComponent {
  @Input() src!: string;
  @Output() action1 = new EventEmitter<void>();
  @Output() action2 = new EventEmitter<void>();
  @Output() action3 = new EventEmitter<void>();

  onAction1() {
    console.log('Action 1 clicked');
    this.action1.emit();
  }

  onAction2() {
    console.log('Action 2 clicked');
    this.action2.emit();
  }

  onAction3() {
    console.log('Action 3 clicked');
    this.action3.emit();
  }
}
