import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewCarburantComponent } from './new-carburant.component';

describe('NewCarburantComponent', () => {
  let component: NewCarburantComponent;
  let fixture: ComponentFixture<NewCarburantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [NewCarburantComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
