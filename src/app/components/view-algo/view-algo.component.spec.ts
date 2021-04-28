import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAlgoComponent } from './view-algo.component';

describe('ViewAlgoComponent', () => {
  let component: ViewAlgoComponent;
  let fixture: ComponentFixture<ViewAlgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAlgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAlgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
