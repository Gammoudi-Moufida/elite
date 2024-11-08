import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwCommunityComponent } from './tw-community.component';

describe('TwCommunityComponent', () => {
  let component: TwCommunityComponent;
  let fixture: ComponentFixture<TwCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TwCommunityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
