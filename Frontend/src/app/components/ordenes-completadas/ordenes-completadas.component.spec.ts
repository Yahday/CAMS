import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesCompletadasComponent } from './ordenes-completadas.component';

describe('OrdenesCompletadasComponent', () => {
  let component: OrdenesCompletadasComponent;
  let fixture: ComponentFixture<OrdenesCompletadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesCompletadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesCompletadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
