import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentFiltersLoyerComponent } from './current-filters-loyer.component';

describe('CurrentFiltersLoyerComponent', () => {
  let component: CurrentFiltersLoyerComponent;
  let fixture: ComponentFixture<CurrentFiltersLoyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CurrentFiltersLoyerComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentFiltersLoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
