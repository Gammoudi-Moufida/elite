import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaCurrentRefinementsComponent } from './algolia-current-refinements.component';

describe('AlgoliaCurrentRefinementsComponent', () => {
  let component: AlgoliaCurrentRefinementsComponent;
  let fixture: ComponentFixture<AlgoliaCurrentRefinementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AlgoliaCurrentRefinementsComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaCurrentRefinementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
