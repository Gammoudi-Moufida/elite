import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseCardsComponent } from './lease-cards.component';

describe('LeaseCardsComponent', () => {
  let component: LeaseCardsComponent;
  let fixture: ComponentFixture<LeaseCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [LeaseCardsComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
