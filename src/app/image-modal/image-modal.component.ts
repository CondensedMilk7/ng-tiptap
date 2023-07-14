import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.less'],
})
export class ImageModalComponent {
  imageUrl!: string;

  constructor(private modalRef: NzModalRef) {}

  submitForm(): void {
    if (this.imageUrl) {
      this.modalRef.close(this.imageUrl);
    }
  }
}
