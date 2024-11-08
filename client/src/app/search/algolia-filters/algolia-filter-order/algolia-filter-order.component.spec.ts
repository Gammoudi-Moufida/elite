import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaFilterOrderComponent } from './algolia-filter-order.component';

describe('AlgoliaFilterOrderComponent', () => {
  let component: AlgoliaFilterOrderComponent;
  let fixture: ComponentFixture<AlgoliaFilterOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AlgoliaFilterOrderComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaFilterOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
