import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMarqueComponent } from './filter-marque.component';

describe('FilterMarqueComponent', () => {
  let component: FilterMarqueComponent;
  let fixture: ComponentFixture<FilterMarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FilterMarqueComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
