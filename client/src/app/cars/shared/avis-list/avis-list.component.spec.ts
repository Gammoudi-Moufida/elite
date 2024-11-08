import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvisListComponent } from './avis-list.component';

describe('AvisListComponent', () => {
  let component: AvisListComponent;
  let fixture: ComponentFixture<AvisListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [AvisListComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
