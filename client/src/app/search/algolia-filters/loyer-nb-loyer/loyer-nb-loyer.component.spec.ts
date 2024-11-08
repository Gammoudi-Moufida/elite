import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyerNbLoyerComponent } from './loyer-nb-loyer.component';

describe('LoyerNbLoyerComponent', () => {
  let component: LoyerNbLoyerComponent;
  let fixture: ComponentFixture<LoyerNbLoyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LoyerNbLoyerComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyerNbLoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
