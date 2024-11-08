import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepriseRecapPopupComponent } from './reprise-recap-popup.component';

describe('RepriseRecapPopupComponent', () => {
  let component: RepriseRecapPopupComponent;
  let fixture: ComponentFixture<RepriseRecapPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RepriseRecapPopupComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepriseRecapPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
