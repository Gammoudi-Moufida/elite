import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecompensesComponent } from './recompenses.component';

describe('RecompensesComponent', () => {
  let component: RecompensesComponent;
  let fixture: ComponentFixture<RecompensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RecompensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecompensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
