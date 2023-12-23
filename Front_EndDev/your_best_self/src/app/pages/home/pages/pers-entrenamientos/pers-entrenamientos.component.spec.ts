import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersEntrenamientosComponent } from './pers-entrenamientos.component';

describe('PersEntrenamientosComponent', () => {
  let component: PersEntrenamientosComponent;
  let fixture: ComponentFixture<PersEntrenamientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersEntrenamientosComponent]
    });
    fixture = TestBed.createComponent(PersEntrenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
