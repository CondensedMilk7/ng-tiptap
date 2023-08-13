import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Editor } from '@tiptap/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditorButtonsService } from '../services/editor-buttons.service';
import { ScrollService } from '../services/scroll.service';
import { Subscription, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { ShareStylesService } from '../services/share-styles.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less'],
})
export class ToolbarComponent {
  @Input() editor!: Editor;
  isScrolling: boolean = false;
  scrollCheckInterval!: Subscription;
  lastScrollPosition: number = 0;
  scrollStopTimerId!: any;
  HEX: { [key: string]: string } = {};
  constructor(
    public editorButtonService: EditorButtonsService,
    public modalService: NzModalService,
    public message: NzMessageService,
    private scrollService: ScrollService,
    public sharedStyles: ShareStylesService
  ) {
    // // Subscribe to the service
    // this.scrollService.isScrolling$.subscribe((scrolling) => {
    //   this.isScrolling = scrolling;
    // });

    this.HEX = this.sharedStyles.getAllHexParameters();
    console.log(this.HEX);
  }

  // ngOnInit() {
  //   //! This Was Going Into Infinity Loop Had To add some Complexity
  //   //? All values here can be configured
  //   this.scrollCheckInterval = fromEvent(window, 'scroll')
  //     .pipe(throttleTime(100))
  //     .subscribe(() => {
  //       const tolerance = 50;
  //       const isCurrentlyScrolling =
  //         Math.abs(window.scrollY - this.lastScrollPosition) < tolerance;

  //       if (isCurrentlyScrolling !== this.isScrolling) {
  //         clearTimeout(this.scrollStopTimerId);

  //         this.scrollStopTimerId = setTimeout(() => {
  //           this.scrollService.setScrolling(window.scrollY > 90);
  //         }, 150);
  //       }

  //       this.lastScrollPosition = window.scrollY;
  //     });
  // }

  // ngOnDestroy() {
  //   if (this.scrollCheckInterval) {
  //     this.scrollCheckInterval.unsubscribe();
  //   }
  //   if (this.scrollStopTimerId) {
  //     clearTimeout(this.scrollStopTimerId);
  //   }
  // }
  private lastUsedMark: string = 'mark'; // Default to the standard mark
  private lastUsedMarkColor: string = '#000'; // Default color for last used mark

  applyLastUsedMark() {
    switch (this.lastUsedMark) {
      case 'mark':
        this.editorButtonService.addMark(this.editor);
        break;
      case 'mark1':
        this.editorButtonService.addCustoMark(this.editor);
        break;
      case 'mark2':
        this.editorButtonService.addCustoMark2(this.editor);
        break;
    }
  }

  applyMark() {
    this.editorButtonService.addMark(this.editor);
    this.lastUsedMark = 'mark';
    this.lastUsedMarkColor =
      this.sharedStyles.getHexParameter('mark') || '#000';
  }

  applyCustoMark() {
    this.editorButtonService.addCustoMark(this.editor);
    this.lastUsedMark = 'mark1';
    this.lastUsedMarkColor =
      this.sharedStyles.getHexParameter('.mark1') || '#000';
  }

  applyCustoMark2() {
    this.editorButtonService.addCustoMark2(this.editor);
    this.lastUsedMark = 'mark2';
    this.lastUsedMarkColor =
      this.sharedStyles.getHexParameter('.mark2') || '#000';
  }

  // Method to retrieve the last used mark color for binding
  getLastUsedMarkColor() {
    return this.lastUsedMarkColor;
  }
}
