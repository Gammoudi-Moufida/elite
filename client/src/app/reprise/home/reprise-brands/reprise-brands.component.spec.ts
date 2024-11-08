import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepriseBrandsComponent } from './reprise-brands.component';

describe('RepriseBrandsComponent', () => {
  let component: RepriseBrandsComponent;
  let fixture: ComponentFixture<RepriseBrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepriseBrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepriseBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
