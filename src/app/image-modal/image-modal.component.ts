import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { SecurityContext } from '@angular/core';

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
    const sanitizedSrc = this.image;
    const actualSrc =
      this.sanitizer.sanitize(SecurityContext.URL, sanitizedSrc) || '';
    const blob = this.dataURItoBlob(actualSrc);
    const blobUrl = URL.createObjectURL(blob);

    // Create an image object to get the dimensions
    const img = new Image();
    img.onload = () => {
      // Use the width of the image
      this.previewWidth = img.width;

      // Set the resize settings
      this.resizeSettings = { width: this.previewWidth };

      // You may also want to force a rerender of the cropper
      this.forceCropperRerender();
    };
    img.src = blobUrl;

    this.imageChangedEvent = {
      target: {
        files: [new File([blob], 'filename', { type: 'image/png' })],
      },
    };
  }

  dataURItoBlob(dataURI: any) {
    // Unwrap the safe value
    const actualDataURI =
      this.sanitizer.sanitize(SecurityContext.URL, dataURI) || '';

    console.log('actualDataURI before split:', actualDataURI); // Log the unwrapped dataURI

    const parts = actualDataURI.split(',');
    if (parts.length !== 2) {
      throw new Error('Invalid data URI');
    }
    console.log('Base64 part:', parts[1]);

    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(':')[1].split(';')[0];

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
