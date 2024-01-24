import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltersEComponent } from './modal-filters-e.component';

describe('ModalFiltersEComponent', () => {
  let component: ModalFiltersEComponent;
  let fixture: ComponentFixture<ModalFiltersEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFiltersEComponent]
    });
    fixture = TestBed.createComponent(ModalFiltersEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
