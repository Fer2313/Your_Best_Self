import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCronometroComponent } from './modal-cronometro.component';

describe('ModalCronometroComponent', () => {
  let component: ModalCronometroComponent;
  let fixture: ComponentFixture<ModalCronometroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCronometroComponent]
    });
    fixture = TestBed.createComponent(ModalCronometroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
