import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepriseEstimationPopupComponent } from './reprise-estimation-popup.component';

describe('RepriseEstimationPopupComponent', () => {
  let component: RepriseEstimationPopupComponent;
  let fixture: ComponentFixture<RepriseEstimationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RepriseEstimationPopupComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepriseEstimationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
