import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRepriseComponent } from './home-reprise.component';

describe('HomeRepriseComponent', () => {
  let component: HomeRepriseComponent;
  let fixture: ComponentFixture<HomeRepriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
