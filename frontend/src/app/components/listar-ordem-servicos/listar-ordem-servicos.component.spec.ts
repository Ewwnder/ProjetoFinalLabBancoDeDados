import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOrdemServicosComponent } from './listar-ordem-servicos.component';

describe('ListarOrdemServicosComponent', () => {
  let component: ListarOrdemServicosComponent;
  let fixture: ComponentFixture<ListarOrdemServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarOrdemServicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarOrdemServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
