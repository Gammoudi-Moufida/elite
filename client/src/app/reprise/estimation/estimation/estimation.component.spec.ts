import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualEstimationComponent } from './estimation.component';

describe('ManualEstimationComponent', () => {
  let component: ManualEstimationComponent;
  let fixture: ComponentFixture<ManualEstimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ManualEstimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
