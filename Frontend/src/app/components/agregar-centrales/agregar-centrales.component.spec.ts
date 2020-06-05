import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCentralesComponent } from './agregar-centrales.component';

describe('AgregarCentralesComponent', () => {
  let component: AgregarCentralesComponent;
  let fixture: ComponentFixture<AgregarCentralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCentralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCentralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
