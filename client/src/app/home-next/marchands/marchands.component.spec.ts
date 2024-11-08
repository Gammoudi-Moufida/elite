import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchandsComponent } from './marchands.component';

describe('MarchandsComponent', () => {
  let component: MarchandsComponent;
  let fixture: ComponentFixture<MarchandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MarchandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarchandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
