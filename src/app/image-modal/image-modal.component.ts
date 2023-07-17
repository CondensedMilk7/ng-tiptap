import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.less'],
})
export class ImageModalComponent {
  imageUrl!: string;
  aspectRatio = 1;
  previewWidth = 200;
  resizeSettings = { width: this.previewWidth };
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = true; // Added this line

  constructor(private modalRef: NzModalRef, private sanitizer: DomSanitizer) {}

  submitForm(): void {
    this.modalRef.close(this.croppedImage);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.croppedImage = fileReader.result as string;
    };
    if (event.blob) {
      fileReader.readAsDataURL(event.blob);
    }
  }

  updateCropper(width: number) {
    this.previewWidth = width;
    this.resizeSettings = { width: this.previewWidth };
    this.forceCropperRerender(); // Added this line
  }

  // Added this function
  forceCropperRerender() {
    this.showCropper = false;
    setTimeout(() => this.showCropper = true, 0);
  }
}
