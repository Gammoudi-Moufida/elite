import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRepriseComponent } from './contact-reprise.component';

describe('ContactRepriseComponent', () => {
  let component: ContactRepriseComponent;
  let fixture: ComponentFixture<ContactRepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ContactRepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactRepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
