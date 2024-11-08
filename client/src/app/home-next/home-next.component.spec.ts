import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNextComponent } from './home-next.component';

describe('HomeNextComponent', () => {
  let component: HomeNextComponent;
  let fixture: ComponentFixture<HomeNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HomeNextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
