import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinosPage } from './destinos.page';

describe('DestinosPage', () => {
  let component: DestinosPage;
  let fixture: ComponentFixture<DestinosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
