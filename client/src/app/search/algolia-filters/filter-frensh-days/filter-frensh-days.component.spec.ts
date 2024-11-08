import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFrenshDaysComponent } from './filter-frensh-days.component';

describe('FilterFrenshDaysComponent', () => {
  let component: FilterFrenshDaysComponent;
  let fixture: ComponentFixture<FilterFrenshDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FilterFrenshDaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterFrenshDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
