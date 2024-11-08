import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeTypeComponent } from './vehicule-type.component';

describe('VehiculeTypeComponent', () => {
  let component: VehiculeTypeComponent;
  let fixture: ComponentFixture<VehiculeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VehiculeTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
