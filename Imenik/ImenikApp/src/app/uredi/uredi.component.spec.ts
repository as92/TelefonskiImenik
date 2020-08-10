/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UrediComponent } from './uredi.component';

describe('UrediComponent', () => {
  let component: UrediComponent;
  let fixture: ComponentFixture<UrediComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrediComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
