import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DificultyRComponent } from './dificulty-r.component';

describe('DificultyRComponent', () => {
  let component: DificultyRComponent;
  let fixture: ComponentFixture<DificultyRComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DificultyRComponent]
    });
    fixture = TestBed.createComponent(DificultyRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
