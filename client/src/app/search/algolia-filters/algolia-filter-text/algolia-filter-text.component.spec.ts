import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaFilterTextComponent } from './algolia-filter-text.component';

describe('AlgoliaFilterTextComponent', () => {
  let component: AlgoliaFilterTextComponent;
  let fixture: ComponentFixture<AlgoliaFilterTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AlgoliaFilterTextComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaFilterTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
