import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaResultsComponent } from './algolia-results.component';

describe('AlgoliaResultsComponent', () => {
  let component: AlgoliaResultsComponent;
  let fixture: ComponentFixture<AlgoliaResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AlgoliaResultsComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
