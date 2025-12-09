import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormsModule} from '@angular/forms';
import { OrdemServicoRequest } from '../../../entity/ordemServicoRequest';
import { OrdemServicoService } from '../../services/ordem-servico.service';
import { Responsavel } from '../../../entity/responsavel';
import { retry } from 'rxjs';
import { ResponsavelService } from '../../services/responsavel.service';
import { Servico } from '../../../entity/servico';
import { ServicosService } from '../../services/servicos.service';


@Component({
  standalone: true,
  selector: 'app-ordem-servico',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './ordem-servico.html',
  styleUrl: './ordem-servico.css',
})
export class OrdemServico implements OnInit{

  formsOrdemServico!: FormGroup;
  ordemServicoRequest?: OrdemServicoRequest;
  servicoSelecionado?: Servico | null = null;
  responsavel: Responsavel | null = null;
  servicos: Servico[] = [];
  servicosSelecionados: Servico[] = [];
  valorTotalExibir: number = 0;

   constructor(
    private gerenciarOrdemServico: OrdemServicoService, 
    private gerenciarResponsavelServico: ResponsavelService, 
    private formBuilder: FormBuilder,
    private gerenciarServico: ServicosService){}

  ngOnInit(): void {
    this.formsOrdemServico = this.formBuilder.group({
      data: [''],
      hora: [''],
      servicosIds: [[]]
    })

   this.gerenciarServico.getAll().subscribe({
      next: (res: any) => this.servicos = res
   });
  }
  
  pesquisarResponsavel(email: string){
      this.gerenciarResponsavelServico.buscarPeloEmail(email).subscribe({
        next: (res: Responsavel) => this.responsavel = res
      });
  }

  adicionarServico(){
    if(!this.servicoSelecionado) return;

    this.servicosSelecionados.push(this.servicoSelecionado);

    this.formsOrdemServico.patchValue({
      servicosIds: this.servicosSelecionados
    });
    this.valorTotalExibir = this.valorTotalExibir + this.servicoSelecionado.valor;
  
    this.servicoSelecionado = null;
  }

  realizarAgendamento(){
    
    const data = this.formsOrdemServico.get('data')?.value;
    const hora = this.formsOrdemServico.get('horario')?.value;
    const dataHora = new Date(`${data}T${hora}:00`); //formato do localdate time 
    const request: OrdemServicoRequest = {
      dataHora: dataHora,
      responsavelId: this.responsavel?.id ?? '',
      servicosId: this.servicosSelecionados.map(s => s.id)
    }

    this.gerenciarOrdemServico.salvar(request).subscribe({
      next: (res: void) => {
        alert("Cadastrado com sucesso!")
      }
    });
  }


  } 

  


