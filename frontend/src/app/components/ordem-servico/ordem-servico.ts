import { Component, OnInit } from '@angular/core';
import { AgendamentoRequest } from '../../../entity/agendamentoRequest';
import { OrdemServicoService } from '../../services/ordem-servico.service';
import { Servico } from '../../../entity/servico';
import { ServicosService } from '../../services/servicos.service';
import { ClienteResponse } from '../../../entity/clienteResponse';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteRequest } from '../../../entity/clienteRequest';

@Component({
  standalone: true,
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.html',
  styleUrls: ['./ordem-servico.css'],
  imports: [FormsModule,
    CommonModule
  ]
})
export class OrdemServico implements OnInit {

  email: string = '';
  data: string = '';
  hora: string = '';
  cliente: ClienteResponse | null = null;
  servicoSelecionado: Servico | null = null;
  servicos: Servico[] = [];
  servicosSelecionados: Servico[] = [];
  valorTotalExibir: number = 0;

  constructor(
    private gerenciarOrdemServico: OrdemServicoService,
    private gerenciarClienteServico: ClienteService,
    private gerenciarServico: ServicosService
  ) {}

  ngOnInit(): void {
    this.gerenciarServico.getAll().subscribe(res => this.servicos = res);
  }

  pesquisarCliente() {
      if (!this.email) return;
      this.gerenciarClienteServico.buscarPeloEmail(this.email).subscribe({
        next: (res) => {
            this.cliente = res;
          },
        error: () => {
          alert("Não foi encontrado nenhum cliente com esse e-mail");
        }
      });
    }

  adicionarServico() {
    if (!this.servicoSelecionado) return;
    const existe = this.servicosSelecionados.find(s => s.id === this.servicoSelecionado!.id);
    if(existe){
      alert("Serviço já foi adicionado");
      return;
    }
    this.servicosSelecionados.push(this.servicoSelecionado);
    this.valorTotalExibir += this.servicoSelecionado.valor;
    this.servicoSelecionado = null;
  }

  removerServico(index: number) {
    this.servicosSelecionados.splice(index, 1);
    this.valorTotalExibir = this.servicosSelecionados.reduce((sum, s) => sum + s.valor, 0);
  }

  realizarAgendamento() {
    if (!this.cliente ) return alert("Selecione um cliente!");
    if(this.servicosSelecionados.length==0) return alert("Selecione algum serviço antes de realizar o agendamento");
    
    const dataHora = new Date(`${this.data}T${this.hora}:00`);
    const request: AgendamentoRequest = {
      dataHora,
      clienteId: this.cliente.id,
      servicosId: this.servicosSelecionados.map(s => s.id)
    };
    this.gerenciarOrdemServico.salvar(request).subscribe({
      next: () => {
          alert("Agendamento realizado!");
          this.limparFormulario();
      }
    })
       
  }

  limparFormulario() {
    this.email = '';
    this.data = '';
    this.hora = '';
    this.cliente = null;
    this.servicoSelecionado = null;
    this.servicosSelecionados = [];
    this.valorTotalExibir = 0;
  }

}
