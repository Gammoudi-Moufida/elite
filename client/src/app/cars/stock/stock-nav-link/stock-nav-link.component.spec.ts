import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNavLinkComponent } from './stock-nav-link.component';

describe('StockNavLinkComponent', () => {
  let component: StockNavLinkComponent;
  let fixture: ComponentFixture<StockNavLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ StockNavLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
