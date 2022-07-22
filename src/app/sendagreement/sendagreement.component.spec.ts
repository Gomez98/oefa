import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendagreementComponent } from './sendagreement.component';

describe('SendagreementComponent', () => {
  let component: SendagreementComponent;
  let fixture: ComponentFixture<SendagreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendagreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendagreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
