import { TestBed } from '@angular/core/testing';

import { PlatilloPedidoService } from './platillo-pedido.service';

describe('PlatilloPedidoService', () => {
  let service: PlatilloPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatilloPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
