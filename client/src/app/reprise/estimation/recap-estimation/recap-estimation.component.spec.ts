import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapEstimationComponent } from './recap-estimation.component';

describe('RecapEstimationComponent', () => {
  let component: RecapEstimationComponent;
  let fixture: ComponentFixture<RecapEstimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RecapEstimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecapEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
