import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaPaginationComponent } from './algolia-pagination.component';

describe('AlgoliaPaginationComponent', () => {
  let component: AlgoliaPaginationComponent;
  let fixture: ComponentFixture<AlgoliaPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AlgoliaPaginationComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
