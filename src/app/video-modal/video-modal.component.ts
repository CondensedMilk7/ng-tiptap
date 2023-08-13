import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.less'],
})
export class VideoModalComponent {
  src!: string;

  constructor(private modalRef: NzModalRef) {}

  submitForm(): void {
    this.modalRef.close({ src: this.src });
  }
}
