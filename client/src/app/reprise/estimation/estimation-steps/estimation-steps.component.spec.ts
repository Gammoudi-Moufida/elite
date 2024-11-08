import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationStepsComponent } from './estimation-steps.component';

describe('EstimationStepsComponent', () => {
  let component: EstimationStepsComponent;
  let fixture: ComponentFixture<EstimationStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EstimationStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
