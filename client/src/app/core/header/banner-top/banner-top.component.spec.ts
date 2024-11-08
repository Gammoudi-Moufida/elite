import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BannerTopComponent } from './banner-top.component';

describe('BannerTopComponent', () => {
  let component: BannerTopComponent;
  let fixture: ComponentFixture<BannerTopComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [BannerTopComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
