import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMacDeviceComponent } from './set-mac-device.component';

describe('SetMacDeviceComponent', () => {
  let component: SetMacDeviceComponent;
  let fixture: ComponentFixture<SetMacDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetMacDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMacDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
