import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayButtonComponent } from './overlay-button.component';

describe('OverlayButtonComponent', () => {
  let component: OverlayButtonComponent;
  let fixture: ComponentFixture<OverlayButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverlayButtonComponent]
    });
    fixture = TestBed.createComponent(OverlayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
