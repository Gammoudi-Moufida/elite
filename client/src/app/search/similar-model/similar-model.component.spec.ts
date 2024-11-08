import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimilarModelComponent } from './similar-model.component';

describe('SimilarModelComponent', () => {
  let component: SimilarModelComponent;
  let fixture: ComponentFixture<SimilarModelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [SimilarModelComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
