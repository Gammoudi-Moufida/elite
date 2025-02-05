import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CarburantComponent } from './carburant.component';

describe('CarburantComponent', () => {
  let component: CarburantComponent;
  let fixture: ComponentFixture<CarburantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [CarburantComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
