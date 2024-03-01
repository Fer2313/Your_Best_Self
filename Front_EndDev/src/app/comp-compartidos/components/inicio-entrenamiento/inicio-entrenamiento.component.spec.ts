import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioEntrenamientoComponent } from './inicio-entrenamiento.component';

describe('InicioEntrenamientoComponent', () => {
  let component: InicioEntrenamientoComponent;
  let fixture: ComponentFixture<InicioEntrenamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioEntrenamientoComponent]
    });
    fixture = TestBed.createComponent(InicioEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
