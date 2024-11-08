import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterColorsComponent } from './filter-colors.component';

describe('FilterColorsComponent', () => {
  let component: FilterColorsComponent;
  let fixture: ComponentFixture<FilterColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FilterColorsComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
