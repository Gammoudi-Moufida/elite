import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalSliderComponent } from './interval-slider.component';

describe('IntervalSliderComponent', () => {
  let component: IntervalSliderComponent;
  let fixture: ComponentFixture<IntervalSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IntervalSliderComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
