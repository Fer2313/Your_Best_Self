import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HPComponent } from './hp.component';

describe('HPComponent', () => {
  let component: HPComponent;
  let fixture: ComponentFixture<HPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HPComponent]
    });
    fixture = TestBed.createComponent(HPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
