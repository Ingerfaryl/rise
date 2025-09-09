import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mge } from './mge';

describe('Mge', () => {
  let component: Mge;
  let fixture: ComponentFixture<Mge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
