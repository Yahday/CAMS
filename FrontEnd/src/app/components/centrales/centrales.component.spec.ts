import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralesComponent } from './centrales.component';

describe('CentralesComponent', () => {
  let component: CentralesComponent;
  let fixture: ComponentFixture<CentralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
