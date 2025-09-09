import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alianza } from './alianza';

describe('Alianza', () => {
  let component: Alianza;
  let fixture: ComponentFixture<Alianza>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alianza]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Alianza);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
