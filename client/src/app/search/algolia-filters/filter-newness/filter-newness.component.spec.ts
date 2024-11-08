import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterNewnessComponent } from './filter-newness.component';

describe('FilterNewnessComponent', () => {
  let component: FilterNewnessComponent;
  let fixture: ComponentFixture<FilterNewnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FilterNewnessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterNewnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
