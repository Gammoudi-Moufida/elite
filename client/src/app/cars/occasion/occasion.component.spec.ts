import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OccasionComponent } from './occasion.component';

describe('OccasionComponent', () => {
  let component: OccasionComponent;
  let fixture: ComponentFixture<OccasionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [OccasionComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
