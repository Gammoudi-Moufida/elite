import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoPagesComponent } from './promo-pages.component';

describe('PromoPagesComponent', () => {
  let component: PromoPagesComponent;
  let fixture: ComponentFixture<PromoPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PromoPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
