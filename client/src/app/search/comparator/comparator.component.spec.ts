import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComparatorComponent } from './comparator.component';

describe('ComparatorComponent', () => {
  let component: ComparatorComponent;
  let fixture: ComponentFixture<ComparatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ComparatorComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
