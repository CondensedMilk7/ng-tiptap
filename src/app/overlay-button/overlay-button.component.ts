import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-overlay-button',
  templateUrl: './overlay-button.component.html',
  styleUrls: ['./overlay-button.component.less'],
})
export class OverlayButtonComponent {
  @Input() iconType!: string;
  @Input() nzTheme!: string;
  @Input() action!: string;
  @Input() iconClass?: string;
  @Output() onButtonClick = new EventEmitter<void>();

  buttonClicked(): void {
    this.onButtonClick.emit();
  }
}
