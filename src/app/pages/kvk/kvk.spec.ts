import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kvk } from './kvk';

describe('Kvk', () => {
  let component: Kvk;
  let fixture: ComponentFixture<Kvk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kvk]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kvk);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
