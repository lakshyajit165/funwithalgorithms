import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAlgoComponent } from './single-algo.component';

describe('SingleAlgoComponent', () => {
  let component: SingleAlgoComponent;
  let fixture: ComponentFixture<SingleAlgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAlgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAlgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
