import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ResponsavelResponse } from '../../../entity/responsavelResponse';
import { ResponsavelService } from '../../services/responsavel.service';
import { ResponsavelRequest } from '../../../entity/responsavelRequest';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-responsavel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './responsavel.component.html',
  styleUrls: ['./responsavel.component.css'],
})
export class ResponsavelComponent implements OnInit {

  responsaveis: ResponsavelResponse[] = [];
  formulario: FormGroup;
  responsavelRequest: ResponsavelRequest | null = null;
  isEditando = false;
  isAdicionando = false;
  responsavelSelecionado: ResponsavelResponse | null = null;

  filtro: FormGroup;

  constructor(private servicoResponsavel: ResponsavelService, private formBuilder: FormBuilder) {

    this.formulario = this.formBuilder.group({
      id: [''],
      nome: [''],
      email: [''],
      telefone: [''],
      cargo: [''],
      especialidade: [''],
      salario: [''],
    });

    this.filtro = this.formBuilder.group({
      busca: [''],
      ordenarAZ: [false],
    });
  }

  ngOnInit(): void {
    this.carregarResponsaveis();
  }

  trackById(index: number, item: ResponsavelResponse) {
    return item.id;
  }

  carregarResponsaveis() {
    this.servicoResponsavel.listarTodos()
      .subscribe({
        next: (json: ResponsavelResponse[]) => {
          this.responsaveis = json;
        }
      });
  }

  iniciarAdicao() {
    this.isAdicionando = true;
    this.isEditando = false;
    this.formulario.reset();
  }

  iniciarEdicao(responsavel: ResponsavelResponse) {
    this.isEditando = true;
    this.isAdicionando = false;
    this.responsavelSelecionado = responsavel;

    this.formulario.patchValue({
      id: responsavel.id,
      nome: responsavel.nome,
      email: responsavel.email,
      telefone: responsavel.telefone,
      cargo: responsavel.cargo,
      especialidade: responsavel.especialidade,
      salario: responsavel.salario
    });
  }

  salvar() {
    this.buildRequest();
    if (!this.responsavelRequest) return;

    this.servicoResponsavel.salvar(this.responsavelRequest).subscribe({
      next: () => {
        this.carregarResponsaveis();
        this.limpar();
      }
    });

    this.responsavelRequest = null;
  }

  buildRequest() {
    this.responsavelRequest = {
      nome: this.formulario.value.nome,
      email: this.formulario.value.email,
      telefone: this.formulario.value.telefone,
      cargo: this.formulario.value.cargo,
      especialidade: this.formulario.value.especialidade,
      salario: this.formulario.value.salario,
    };
  }

  atualizar() {
    this.buildRequest();
    if (!this.responsavelRequest || !this.responsavelSelecionado) return;

    this.servicoResponsavel.atualizar(this.responsavelRequest, this.responsavelSelecionado.id).subscribe({
      next: () => {
        this.carregarResponsaveis();
        this.limpar();
        this.responsavelSelecionado = null;
      }
    });
  }

  excluir(responsavel: ResponsavelResponse) {
    this.servicoResponsavel.excluir(responsavel).subscribe({
      next: () => {
        this.carregarResponsaveis();
        this.limpar();
      }
    });
  }

  limpar() {
    this.isEditando = false;
    this.isAdicionando = false;
    this.formulario.reset();
  }

  alternarOrdem() {
    const atual = this.filtro.get('ordenarAZ')?.value;
    this.filtro.get('ordenarAZ')?.setValue(!atual);
  }
}
