import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterLabelComponent } from './filter-label.component';

describe('FilterLabelComponent', () => {
  let component: FilterLabelComponent;
  let fixture: ComponentFixture<FilterLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FilterLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
