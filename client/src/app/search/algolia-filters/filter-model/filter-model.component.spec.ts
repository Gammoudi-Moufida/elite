import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterModelComponent } from './filter-model.component';

describe('FilterModelComponent', () => {
  let component: FilterModelComponent;
  let fixture: ComponentFixture<FilterModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FilterModelComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
