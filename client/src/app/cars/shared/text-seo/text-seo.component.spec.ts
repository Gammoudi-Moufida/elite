import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextSeoComponent } from './text-seo.component';

describe('TextSeoComponent', () => {
  let component: TextSeoComponent;
  let fixture: ComponentFixture<TextSeoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [TextSeoComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
