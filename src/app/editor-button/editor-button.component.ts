import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-editor-button',
  templateUrl: './editor-button.component.html',
  styleUrls: ['./editor-button.component.less'],
})
export class EditorButtonComponent {
  @Input() label!: string;
  @Input() iconClass?: string;
  @Input() imagePath?: string;
  @Input() iconColor: string = '#000000';
  @Output() onClick = new EventEmitter<void>();

  clickHandler(): void {
    this.onClick.emit();
  }
}
