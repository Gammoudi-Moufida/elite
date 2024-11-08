import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvisComponent } from './avis.component';

describe('AvisComponent', () => {
  let component: AvisComponent;
  let fixture: ComponentFixture<AvisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [AvisComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
