import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.less'],
})
export class TableModalComponent {
  rows = 0;
  cols = 0;

  constructor(private modalRef: NzModalRef) {}

  submitForm(): void {
    this.modalRef.close({ rows: this.rows, cols: this.cols });
  }
}
