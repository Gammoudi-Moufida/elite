import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MarkComponent } from './mark.component';

describe('MarkComponent', () => {
  let component: MarkComponent;
  let fixture: ComponentFixture<MarkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [MarkComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
