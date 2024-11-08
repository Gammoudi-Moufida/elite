import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkMoteurComponent } from './mark-moteur.component';

describe('MarkMoteurComponent', () => {
  let component: MarkMoteurComponent;
  let fixture: ComponentFixture<MarkMoteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MarkMoteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkMoteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
