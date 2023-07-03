import { Component } from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-linkmodal',
  templateUrl: './linkmodal.component.html',
  styleUrls: ['./linkmodal.component.less']
})
export class LinkmodalComponent {
  url = ''; // property to bind to input

  constructor(private modalRef: NzModalRef) {}

  cancel(): void {
    this.modalRef.triggerCancel();
  }

  submit(): void {
    this.modalRef.close(this.url); // when modal is closed, return url
  }


}
