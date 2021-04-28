import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlgoComponent } from './add-algo.component';

describe('AddAlgoComponent', () => {
  let component: AddAlgoComponent;
  let fixture: ComponentFixture<AddAlgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
