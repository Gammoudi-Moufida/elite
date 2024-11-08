import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaClearRefinementsComponent } from './algolia-clear-refinements.component';

describe('AlgoliaClearRefinementsComponent', () => {
  let component: AlgoliaClearRefinementsComponent;
  let fixture: ComponentFixture<AlgoliaClearRefinementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AlgoliaClearRefinementsComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaClearRefinementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
