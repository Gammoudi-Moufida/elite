import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMarkComponent } from './text-mark.component';

describe('TextMarkComponent', () => {
  let component: TextMarkComponent;
  let fixture: ComponentFixture<TextMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TextMarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
