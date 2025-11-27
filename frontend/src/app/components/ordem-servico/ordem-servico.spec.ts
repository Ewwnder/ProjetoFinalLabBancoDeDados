import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemServico } from './ordem-servico';

describe('OrdemServico', () => {
  let component: OrdemServico;
  let fixture: ComponentFixture<OrdemServico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdemServico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdemServico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
