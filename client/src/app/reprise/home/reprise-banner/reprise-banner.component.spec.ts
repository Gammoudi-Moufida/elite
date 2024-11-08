import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepriseBannerComponent } from './reprise-banner.component';

describe('RepriseBannerComponent', () => {
  let component: RepriseBannerComponent;
  let fixture: ComponentFixture<RepriseBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepriseBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepriseBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
