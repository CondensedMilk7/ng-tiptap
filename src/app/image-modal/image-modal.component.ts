import { Component, Input } from '@angular/core';
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
  @Input() image!: string; // Change the name of the input property to match

  constructor(private modalRef: NzModalRef, private sanitizer: DomSanitizer) {
    const modalComponentParams = modalRef.getConfig().nzComponentParams;
    this.image = modalComponentParams?.['image'];
  }

  submitForm(): void {
    console.log(this.croppedImage); // Check this output
    this.modalRef.close(this.croppedImage);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.croppedImage = this.sanitizer.bypassSecurityTrustResourceUrl(
        fileReader.result as string
      );
    };
    if (event.blob) {
      fileReader.readAsDataURL(event.blob);
    }
  }

  ngOnInit() {
    const blob = this.dataURItoBlob(this.image);
    const blobUrl = URL.createObjectURL(blob);

    this.imageChangedEvent = {
      target: {
        files: [new File([blob], 'filename', { type: 'image/png' })],
      },
    };
    console.log(this.imageChangedEvent);
  }

  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  updateCropper(width: number) {
    this.previewWidth = width;
    this.resizeSettings = { width: this.previewWidth };
    this.forceCropperRerender(); // Added this line
  }

  // Added this function
  forceCropperRerender() {
    this.showCropper = false;
    setTimeout(() => (this.showCropper = true), 0);
  }
}
