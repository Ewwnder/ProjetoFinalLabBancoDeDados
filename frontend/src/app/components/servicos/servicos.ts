import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ServicosService } from '../../services/servicos.service';

import { ResponsavelResponse } from '../../../entity/responsavelResponse';
import { ResponsavelService } from '../../services/responsavel.service';
import { ServicoRequest } from '../../../entity/servicoRequest';
import { ServicoResponse } from '../../../entity/servicoResponse';

@Component({
  selector: 'app-servicos',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './servicos.html',
  styleUrls: ['./servicos.css'],
})
export class Servicos implements OnInit {
  servicos: ServicoResponse[] = [];
  servicoSelecionado: ServicoResponse | null = null;
  formGroupServico: FormGroup;
  isEditing = false;
  isAdding = false;
  servicoRequest: ServicoRequest | null = null;
  responsavel: ResponsavelResponse | null = null;
  filtro: FormGroup;

  constructor(private gerenciarServicos: ServicosService, private formBuilder: FormBuilder, private gerenciarResponsaveis: ResponsavelService) {
    this.formGroupServico = this.formBuilder.group({
      id: [''],
      nome: [''],
      categoria: [''],
      tipo: [''],
      valor: [''],
      custo: [''],
      responsavelNome: [''],
    });

    this.filtro = this.formBuilder.group({
      tipo: [''],
      busca: [''],
      categoria: [''],
      ordenarAZ: [false],
    });
  }

  ngOnInit(): void {
    this.loadServicos();
    this.filtro.valueChanges.subscribe(() => this.loadServicos());
  }

  trackById(index: number, item: ServicoResponse) {
    return item.id;
  }

  loadServicos() {
    const tipo = this.filtro.value.tipo;
    const categoria = this.filtro.value.categoria;
    const busca = this.filtro.value.busca;
    const ordenarAZ = this.filtro.value.ordenarAZ;

    this.gerenciarServicos
      .filtrarServico(tipo, busca, categoria, ordenarAZ)
      .subscribe({ next: (json) => (this.servicos = json) });
  }

  startAdding() {
    this.isAdding = true;
    this.formGroupServico.reset();
  }

  startEditing(servico: ServicoResponse) {
    this.isEditing = true;
    this.isAdding = false;
    this.servicoSelecionado = servico;
    this.formGroupServico.patchValue({
        id: servico.id,
        nome: servico.nome,
        categoria: servico.categoria,
        tipo: servico.tipo,
        valor: servico.valor,
        custo: servico.custo,
        responsavelNome: servico.responsavelNome
    });
  }

  save() {
  this.gerenciarResponsaveis.getByNome(this.formGroupServico.value.responsavelNome)
    .subscribe({
      next: (json: ResponsavelResponse) => {
        this.responsavel = json;

        this.buildRequest();

        if (!this.servicoRequest) return;

        this.gerenciarServicos.save(this.servicoRequest)
          .subscribe({
            next: () => {
              this.loadServicos();
              this.clear();
              this.servicoRequest = null;
            },
            error: ()=> alert("erro")
          });

      }
    });
}

  buildRequest(){
    if(!this.responsavel) return;
    this.servicoRequest = {
      nome: this.formGroupServico.value.nome,
      categoria: this.formGroupServico.value.categoria,
      tipo: this.formGroupServico.value.tipo,
      valor: this.formGroupServico.value.valor,
      custo: this.formGroupServico.value.custo,
      responsavelId: this.responsavel.id,
   
  }
}

  update() {
  this.gerenciarResponsaveis.getByNome(this.formGroupServico.value.responsavelNome).subscribe({
    next: (json) => {
      this.responsavel = json;

      this.buildRequest();
      if (!this.servicoRequest || !this.servicoSelecionado) return;

      this.gerenciarServicos.update(this.servicoRequest, this.servicoSelecionado.id)
        .subscribe(() => {
          this.loadServicos();
          this.clear();
          this.servicoRequest = null;
          this.servicoSelecionado = null;
        });
    }
  });
}

  delete(servico: ServicoResponse) {
    this.gerenciarServicos.delete(servico).subscribe({ next: () => this.loadServicos() });
  }

  clear() {
    this.isEditing = false;
    this.isAdding = false;
    this.formGroupServico.reset();
  }

  toggleOrdem() {
    const atual = this.filtro.get('ordenarAZ')?.value;
    this.filtro.get('ordenarAZ')?.setValue(!atual);
  }

  
}
