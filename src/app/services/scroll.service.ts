import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private _isScrolling = new BehaviorSubject<boolean>(false);

  isScrolling$ = this._isScrolling.asObservable();

  setScrolling(scrolling: boolean) {
    this._isScrolling.next(scrolling);
  }
}
