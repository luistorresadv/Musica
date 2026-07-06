import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artista } from './artista';

describe('Artista', () => {
  let component: Artista;
  let fixture: ComponentFixture<Artista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Artista],
    }).compileComponents();

    fixture = TestBed.createComponent(Artista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
