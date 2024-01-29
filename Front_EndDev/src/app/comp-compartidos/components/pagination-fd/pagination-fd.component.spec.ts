import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationFDComponent } from './pagination-fd.component';

describe('PaginationFDComponent', () => {
  let component: PaginationFDComponent;
  let fixture: ComponentFixture<PaginationFDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationFDComponent]
    });
    fixture = TestBed.createComponent(PaginationFDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
