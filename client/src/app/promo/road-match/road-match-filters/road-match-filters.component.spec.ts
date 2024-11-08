import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadMatchFiltersComponent } from './road-match-filters.component';

describe('RoadMatchFiltersComponent', () => {
  let component: RoadMatchFiltersComponent;
  let fixture: ComponentFixture<RoadMatchFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RoadMatchFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadMatchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
