import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaAutorizacionComponent } from './pantalla-autorizacion.component';

describe('PantallaAutorizacionComponent', () => {
  let component: PantallaAutorizacionComponent;
  let fixture: ComponentFixture<PantallaAutorizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallaAutorizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaAutorizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
