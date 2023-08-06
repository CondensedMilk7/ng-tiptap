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
}
