import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestViewAlgoComponent } from './guest-view-algo.component';

describe('GuestViewAlgoComponent', () => {
  let component: GuestViewAlgoComponent;
  let fixture: ComponentFixture<GuestViewAlgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestViewAlgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestViewAlgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
