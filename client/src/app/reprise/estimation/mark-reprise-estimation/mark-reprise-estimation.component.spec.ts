import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkRepriseEstimationComponent } from './mark-reprise-estimation.component';

describe('MarkRepriseEstimationComponent', () => {
  let component: MarkRepriseEstimationComponent;
  let fixture: ComponentFixture<MarkRepriseEstimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MarkRepriseEstimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkRepriseEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
