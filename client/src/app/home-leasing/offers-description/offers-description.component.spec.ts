import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersDescriptionComponent } from './offers-description.component';

describe('OffersDescriptionComponent', () => {
  let component: OffersDescriptionComponent;
  let fixture: ComponentFixture<OffersDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [OffersDescriptionComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
