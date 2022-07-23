import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendedAgrementsComponent } from './sended-agrements.component';

describe('SendedAgrementsComponent', () => {
  let component: SendedAgrementsComponent;
  let fixture: ComponentFixture<SendedAgrementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendedAgrementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendedAgrementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
