import { TestBed } from '@angular/core/testing';

import { OrdemServicoService } from '../services/ordem-servico.service';

describe('OrdemServicoService', () => {
  let service: OrdemServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdemServicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
