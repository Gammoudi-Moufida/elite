import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsLeasingComponent } from './brands-leasing.component';

describe('BrandsLeasingComponent', () => {
  let component: BrandsLeasingComponent;
  let fixture: ComponentFixture<BrandsLeasingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BrandsLeasingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsLeasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
