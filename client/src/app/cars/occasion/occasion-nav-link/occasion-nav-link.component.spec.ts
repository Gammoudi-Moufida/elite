import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OccasionNavLinkComponent } from './occasion-nav-link.component';

describe('OccasionNavLinkComponent', () => {
  let component: OccasionNavLinkComponent;
  let fixture: ComponentFixture<OccasionNavLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [OccasionNavLinkComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccasionNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
