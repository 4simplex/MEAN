import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCardComponent } from './change-card.component';

describe('ChangeCardComponent', () => {
  let component: ChangeCardComponent;
  let fixture: ComponentFixture<ChangeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
