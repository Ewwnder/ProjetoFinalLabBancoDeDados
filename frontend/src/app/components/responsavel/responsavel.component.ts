import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Responsavel } from '../../../entity/responsavel';
import { ResponsavelService } from '../../services/responsavel.service';

@Component({
  selector: 'app-responsavel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './responsavel.component.html',
  styleUrls: ['./responsavel.component.css'],
})
export class ResponsavelComponent implements OnInit {

  responsaveis: Responsavel[] = [];
  formulario: FormGroup;

  isEditando = false;
  isAdicionando = false;

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
    this.filtro.valueChanges.subscribe(() => this.carregarResponsaveis());
  }

  trackById(index: number, item: Responsavel) {
    return item.id;
  }

  carregarResponsaveis() {
    const busca = this.filtro.get('busca')?.value;
    const ordenarAZ = this.filtro.get('ordenarAZ')?.value;

    this.servicoResponsavel.filtrar(busca, ordenarAZ)
      .subscribe({
        next: (json: Responsavel[]) => {
          this.responsaveis = json;
        }
      });
  }

  iniciarAdicao() {
    this.isAdicionando = true;
    this.formulario.reset();
  }

  iniciarEdicao(responsavel: Responsavel) {
    this.isEditando = true;
    this.isAdicionando = false;
    this.formulario.setValue(responsavel);
  }

  salvar() {
    this.servicoResponsavel.salvar(this.formulario.value).subscribe({
      next: () => {
        this.carregarResponsaveis();
        this.limpar();
      }
    });
  }

  atualizar() {
    this.servicoResponsavel.atualizar(this.formulario.value).subscribe({
      next: () => {
        this.carregarResponsaveis();
        this.limpar();
      }
    });
  }

  excluir(responsavel: Responsavel) {
    this.servicoResponsavel.excluir(responsavel).subscribe({
      next: () => this.carregarResponsaveis()
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

  get listaFiltrada(): Responsavel[] {
    const busca = this.filtro.get('busca')?.value?.toLowerCase() || '';
    const ordenarAZ = this.filtro.get('ordenarAZ')?.value;

    let lista = this.responsaveis.filter((r) =>
      r.nome.toLowerCase().includes(busca) ||
      r.email.toLowerCase().includes(busca)
    );

    if (ordenarAZ) {
      lista = lista.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    return lista;
  }
}
