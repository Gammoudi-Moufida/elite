import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopModelsComponent } from './top-models.component';

describe('TopModelsComponent', () => {
  let component: TopModelsComponent;
  let fixture: ComponentFixture<TopModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [TopModelsComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
