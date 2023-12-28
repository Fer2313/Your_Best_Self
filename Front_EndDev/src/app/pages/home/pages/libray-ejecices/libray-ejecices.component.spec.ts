import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrayEjecicesComponent } from './libray-ejecices.component';

describe('LibrayEjecicesComponent', () => {
  let component: LibrayEjecicesComponent;
  let fixture: ComponentFixture<LibrayEjecicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrayEjecicesComponent]
    });
    fixture = TestBed.createComponent(LibrayEjecicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
