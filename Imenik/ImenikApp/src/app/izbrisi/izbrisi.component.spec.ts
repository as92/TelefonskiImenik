/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IzbrisiComponent } from './izbrisi.component';

describe('IzbrisiComponent', () => {
  let component: IzbrisiComponent;
  let fixture: ComponentFixture<IzbrisiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzbrisiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzbrisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
