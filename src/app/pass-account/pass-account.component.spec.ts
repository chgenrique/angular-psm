import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassAccountComponent } from './pass-account.component';

describe('PassAccountComponent', () => {
  let component: PassAccountComponent;
  let fixture: ComponentFixture<PassAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
