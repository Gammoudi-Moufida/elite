import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLeasingComponent } from './home-leasing.component';

describe('HomeLeasingComponent', () => {
  let component: HomeLeasingComponent;
  let fixture: ComponentFixture<HomeLeasingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [HomeLeasingComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLeasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
