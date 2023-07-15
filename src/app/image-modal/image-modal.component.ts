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
  aspectRatio = 1; // You can set a default value.
  previewWidth = 200; // You can set a default value.
  constructor(private modalRef: NzModalRef, private sanitizer: DomSanitizer) {}

  submitForm(): void {
    this.modalRef.close(this.croppedImage);
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result); // This will print the base64 string to the console
      this.croppedImage = fileReader.result as string;
    };
    if (event.blob) {
      fileReader.readAsDataURL(event.blob);
    }
  }
}
