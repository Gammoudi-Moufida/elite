import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepriseInformationsComponent } from './reprise-informations.component';

describe('RepriseInformationsComponent', () => {
  let component: RepriseInformationsComponent;
  let fixture: ComponentFixture<RepriseInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepriseInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepriseInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
