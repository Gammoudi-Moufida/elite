import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaFiltersComponent } from './algolia-filters.component';

describe('AlgoliaFiltersComponent', () => {
  let component: AlgoliaFiltersComponent;
  let fixture: ComponentFixture<AlgoliaFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AlgoliaFiltersComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
