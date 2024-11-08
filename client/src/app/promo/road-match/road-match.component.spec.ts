import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadMatchComponent } from './road-match.component';

describe('RoadMatchComponent', () => {
  let component: RoadMatchComponent;
  let fixture: ComponentFixture<RoadMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RoadMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
