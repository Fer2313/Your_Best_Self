import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PContentComponent } from './pcontent.component';

describe('PContentComponent', () => {
  let component: PContentComponent;
  let fixture: ComponentFixture<PContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PContentComponent]
    });
    fixture = TestBed.createComponent(PContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
