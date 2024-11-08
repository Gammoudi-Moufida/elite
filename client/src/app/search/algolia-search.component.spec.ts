import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaSearchComponent } from './algolia-search.component';

describe('AlgoliaSearchComponent', () => {
  let component: AlgoliaSearchComponent;
  let fixture: ComponentFixture<AlgoliaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [AlgoliaSearchComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
