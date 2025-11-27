import { Component, OnInit } from '@angular/core';
import { Servico } from '../../../entity/servico';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicosService } from '../../services/servicos.service';

@Component({
  selector: 'app-servicos',
  imports: [],
  templateUrl: './servicos.html',
  styleUrl: './servicos.css',
})
export class Servicos {
  Servico: Servico[] = [];
  formGroupServico: FormGroup;
  isEditing: boolean = false;
  filtro: FormGroup;

  constructor(private gerenciarServicos: ServicosService, private formBuilder: FormBuilder) {
    this.formGroupServico = this.formBuilder.group({
      id: [''],
      nome: [''],
      categoria: [''],
      tipo: [''],
      valor: [''],
      custo: [''],
      responsavel: ['']
    })

    this.filtro = this.formBuilder.group({
      tipo: [''],
      busca: [''],
      categoria: [''],
      ordenarAZ: [false]
    });
  }

  ngOnInit(): void {
    this.loadServicos();

    this.filtro.valueChanges.subscribe(() => {
      this.loadServicos();
    });
  }

  loadServicos() {
    const tipo = this.filtro.get('tipo')?.value;
    const busca = this.filtro.get('busca')?.value;
    const categoria = this.filtro.get('categoria')?.value;
    const ordenarAZ = this.filtro.get('ordenarAZ')?.value;

    this.gerenciarServicos.filtrarServico(tipo, busca, categoria, ordenarAZ).subscribe({
      next: json => this.Servico = json
    });
  }

  delete(servico: Servico) {
    this.gerenciarServicos.delete(servico).subscribe({
      next: () => this.loadServicos
    });
  }

  onClickUpdate(servico: Servico) {
    this.isEditing = true;
    this.formGroupServico.setValue(servico);
  }

  update() {
    this.gerenciarServicos.update(this.formGroupServico.value).subscribe({
      next: () => {
        this.loadServicos();
        this.clear();
      }
    });
  }

  clear() {
    this.isEditing = false;
    this.formGroupServico.reset();
  }

  toggleOrdem(): void {
    const atual = this.filtro.get('ordenarAZ')?.value;
    this.filtro.get('ordenarAZ')?.setValue(!atual);
  }

  get filtrarServicos(): Servico[] {
    const tipo = this.filtro.get('tipo')?.value;
    const categoria = this.filtro.get('categoria')?.value;

    return this.Servico.filter(servico => {
      const tipoMatch = tipo ? servico.tipo === tipo : true;
      const categoriaMatch = categoria ? servico.categoria === categoria : true;
      return tipoMatch && categoriaMatch;
    });
  }
}
