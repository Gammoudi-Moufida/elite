import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionOffersComponent } from './suggestion-offers.component';

describe('SuggestionOffersComponent', () => {
  let component: SuggestionOffersComponent;
  let fixture: ComponentFixture<SuggestionOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SuggestionOffersComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
