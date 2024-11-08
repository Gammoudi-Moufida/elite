import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepriseDefectComponent } from './reprise-defect.component';

describe('RepriseDefectComponent', () => {
  let component: RepriseDefectComponent;
  let fixture: ComponentFixture<RepriseDefectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RepriseDefectComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepriseDefectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
