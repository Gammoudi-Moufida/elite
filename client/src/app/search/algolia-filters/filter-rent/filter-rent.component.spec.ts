import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRentComponent } from './filter-rent.component';

describe('FilterRentComponent', () => {
  let component: FilterRentComponent;
  let fixture: ComponentFixture<FilterRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FilterRentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
