import { Component, OnInit } from '@angular/core';
import { AgendamentoResponse } from '../../../entity/agendamentoResponse';
import { Servico } from '../../../entity/servico';
import { ServicosService } from '../../services/servicos.service';
import { OrdemServicoService } from '../../services/ordem-servico.service';
import { NgIf, NgFor } from '@angular/common';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-ordem-servicos',
  imports: [NgFor, NgIf, RouterLink],
  standalone: true,
  templateUrl: './listar-ordem-servicos.component.html',
  styleUrl: './listar-ordem-servicos.component.css'
})
export class ListarOrdemServicosComponent implements OnInit{
  agendamentos: AgendamentoResponse[] = [];
  agendamentosFiltrados: AgendamentoResponse[] = [];
  agendamentoSelecionado: AgendamentoResponse | null = null;
  servicosDaOS: Servico[] = [];

  constructor(private servicoService: ServicosService, private ordemServicoService: OrdemServicoService) {}

  ngOnInit(): void {
    this.ordemServicoService.listarTodos().subscribe(res => {
      this.agendamentos = res;
    })
  }

  trackByData(index: number, item: AgendamentoResponse) {
    return item.dataHora;
  }

  trackByServico(index: number, item: Servico) {
    return item.id;
  }

  verDetalhes(ag: AgendamentoResponse) {
    let listaServicos = ag.servicosId;
    this.servicosDaOS = [];
    this.agendamentoSelecionado = ag;
    const requests = ag.servicosId.map(id => this.servicoService.getById(id));

    forkJoin(requests).subscribe(res => {
      this.servicosDaOS = res; 
    });
  }

  excluirOrdemServico(ag: AgendamentoResponse){
    if(!confirm("Deseja realmente excluir o agendamento selecionado?")) return;

    this.ordemServicoService.deletar(ag.id).subscribe({
      next: () => {
          alert("Agendamento excluído com sucesso");
          this.agendamentos = this.agendamentos.filter(item => item.id !== ag.id);
      },
      error: () => {
        alert("não deu certo")
      }
    })

    
  }

  fecharDetalhes() {
    this.servicosDaOS = [];
    this.agendamentoSelecionado = null;
  }

  removerServico(ag: AgendamentoResponse, s: Servico){
    if(!confirm("Deseja remover o serviço do seu agendamento?")) return;

    this.ordemServicoService.deletarServico(ag.id, s.id).subscribe({
      next: () => {
        alert("Serviço removido com sucesso!");
        if(this.agendamentoSelecionado){
            this.agendamentoSelecionado.servicosId = this.agendamentoSelecionado.servicosId.filter(id => id !==s.id);
        }
       
        this.servicosDaOS = this.servicosDaOS.filter(item => item.id !== s.id);
      }
    })
  }
}
