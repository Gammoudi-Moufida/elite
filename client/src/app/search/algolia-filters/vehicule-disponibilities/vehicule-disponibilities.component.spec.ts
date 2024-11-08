import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeDisponibilitiesComponent } from './vehicule-disponibilities.component';

describe('VehiculeDisponibilitiesComponent', () => {
  let component: VehiculeDisponibilitiesComponent;
  let fixture: ComponentFixture<VehiculeDisponibilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VehiculeDisponibilitiesComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeDisponibilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
