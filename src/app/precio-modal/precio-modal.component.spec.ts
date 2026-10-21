import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioModalComponent } from './precio-modal.component';

describe('PrecioModalComponent', () => {
  let component: PrecioModalComponent;
  let fixture: ComponentFixture<PrecioModalComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
