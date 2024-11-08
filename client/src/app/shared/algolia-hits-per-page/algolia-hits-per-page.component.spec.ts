import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaHitsPerPageComponent } from './algolia-hits-per-page.component';

describe('AlgoliaHitsPerPageComponent', () => {
  let component: AlgoliaHitsPerPageComponent;
  let fixture: ComponentFixture<AlgoliaHitsPerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AlgoliaHitsPerPageComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaHitsPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
