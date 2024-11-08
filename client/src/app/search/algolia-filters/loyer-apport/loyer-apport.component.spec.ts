import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyerApportComponent } from './loyer-apport.component';

describe('LoyerApportComponent', () => {
  let component: LoyerApportComponent;
  let fixture: ComponentFixture<LoyerApportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LoyerApportComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyerApportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
