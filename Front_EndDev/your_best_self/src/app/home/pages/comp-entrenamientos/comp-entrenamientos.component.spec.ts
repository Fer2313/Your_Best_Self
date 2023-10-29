import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompEntrenamientosComponent } from './comp-entrenamientos.component';

describe('CompEntrenamientosComponent', () => {
  let component: CompEntrenamientosComponent;
  let fixture: ComponentFixture<CompEntrenamientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompEntrenamientosComponent]
    });
    fixture = TestBed.createComponent(CompEntrenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
