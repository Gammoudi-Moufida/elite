import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSalesComponent } from './private-sales.component';

describe('PrivateSalesComponent', () => {
  let component: PrivateSalesComponent;
  let fixture: ComponentFixture<PrivateSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PrivateSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
