/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OplataComponent } from './oplata.component';

describe('OplataComponent', () => {
  let component: OplataComponent;
  let fixture: ComponentFixture<OplataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OplataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OplataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
