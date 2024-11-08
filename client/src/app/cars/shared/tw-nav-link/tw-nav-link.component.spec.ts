import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwNavLinkComponent } from './tw-nav-link.component';

describe('TwNavLinkComponent', () => {
  let component: TwNavLinkComponent;
  let fixture: ComponentFixture<TwNavLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TwNavLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
