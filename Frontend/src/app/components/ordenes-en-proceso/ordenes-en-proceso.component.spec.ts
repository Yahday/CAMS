import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesEnProcesoComponent } from './ordenes-en-proceso.component';

describe('OrdenesEnProcesoComponent', () => {
  let component: OrdenesEnProcesoComponent;
  let fixture: ComponentFixture<OrdenesEnProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesEnProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesEnProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
