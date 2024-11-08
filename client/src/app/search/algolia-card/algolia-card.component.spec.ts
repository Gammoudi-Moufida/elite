import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaCardComponent } from './algolia-card.component';

describe('AlgoliaCardComponent', () => {
  let component: AlgoliaCardComponent;
  let fixture: ComponentFixture<AlgoliaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AlgoliaCardComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
