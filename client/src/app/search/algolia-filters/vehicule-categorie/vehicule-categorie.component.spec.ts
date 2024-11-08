import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeCategorieComponent } from './vehicule-categorie.component';

describe('VehiculeCategorieComponent', () => {
  let component: VehiculeCategorieComponent;
  let fixture: ComponentFixture<VehiculeCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VehiculeCategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculeCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
