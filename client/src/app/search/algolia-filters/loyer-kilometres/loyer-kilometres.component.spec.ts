import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyerKilometresComponent } from './loyer-kilometres.component';

describe('LoyerKilometresComponent', () => {
  let component: LoyerKilometresComponent;
  let fixture: ComponentFixture<LoyerKilometresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LoyerKilometresComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyerKilometresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
