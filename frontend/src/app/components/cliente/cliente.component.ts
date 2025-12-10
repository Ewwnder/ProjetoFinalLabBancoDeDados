import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../../entity/cliente'; 
import { ClienteService } from '../../services/cliente.service'; 
import { ClienteRequest } from '../../../entity/clienteRequest';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], 
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = []; 
  formularioCliente: FormGroup; 

  isEditando = false;
  isAdicionando = false;

  filtro: FormGroup; 

  constructor(private servicoCliente: ClienteService, private formBuilder: FormBuilder) {

    this.formularioCliente = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      sexo: [''], 
      cpf: [''],
      data_nascimento: [''],
      informacoes: [''],
    });

    this.filtro = this.formBuilder.group({
      busca: [''],
      ordenarAZ: [false],
    });
  }

  ngOnInit(): void {
    this.carregarClientes();
    this.filtro.valueChanges.subscribe(() => this.carregarClientes());
  }

  trackById(index: number, item: Cliente) {
    return item.id;
  }

  carregarClientes() {
    const busca = this.filtro.get('busca')?.value;
    const ordenarAZ = this.filtro.get('ordenarAZ')?.value;

    this.servicoCliente.filtrar(busca, ordenarAZ)
      .subscribe({
        next: (json: Cliente[]) => {
          this.clientes = json;
        }
      });
  }
  
  get listaFiltrada(): Cliente[] {
    const busca = this.filtro.get('busca')?.value?.toLowerCase() || '';
    const ordenarAZ = this.filtro.get('ordenarAZ')?.value;

    let lista = this.clientes.filter((c) =>
      c.nome.toLowerCase().includes(busca) ||
      c.email.toLowerCase().includes(busca) ||
      c.cpf?.toLowerCase().includes(busca) 
    );

    if (ordenarAZ) {
      lista = lista.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    return lista;
  }

  iniciarAdicao() {
    this.isAdicionando = true;
    this.isEditando = false;
    this.formularioCliente.reset();
  }

  iniciarEdicao(cliente: Cliente) {
    this.isEditando = true;
    this.isAdicionando = false;
    this.formularioCliente.setValue(cliente); 
  }

  salvarCliente() {
    if (this.formularioCliente.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const clienteRequest: ClienteRequest = {
        nome: this.formularioCliente.value.nome,
        email: this.formularioCliente.value.email,
        telefone: this.formularioCliente.value.telefone,
        sexo: this.formularioCliente.value.sexo,
        cpf: this.formularioCliente.value.cpf,
        data_nascimento: this.formularioCliente.value.data_nascimento,
        informacoes: this.formularioCliente.value.informacoes
    }
    
    if (this.isAdicionando) {
        this.servicoCliente.salvar(clienteRequest).subscribe({
          next: () => {
            alert('Cliente cadastrado com sucesso!');
            this.carregarClientes();
            this.limpar();
          },
          error: (err) => console.error('Erro ao salvar:', err)
        });
        /*
    } else if (this.isEditando) {
        this.servicoCliente.atualizar(clienteParaSalvar).subscribe({
            next: () => {
                alert('Cliente atualizado com sucesso!');
                this.carregarClientes();
                this.limpar();
            },
            error: (err) => console.error('Erro ao atualizar:', err)
        });*/
    }
  }
  atualizar() {
    this.salvarCliente(); 
  }
  salvar() {
      this.salvarCliente();
  }


  excluir(cliente: Cliente) {
    if (confirm(`Tem certeza que deseja excluir o cliente ${cliente.nome}?`)) {
        this.servicoCliente.excluir(cliente).subscribe({
            next: () => {
                alert('Cliente excluído!');
                this.carregarClientes();
                this.limpar();
            },
            error: (err) => console.error('Erro ao excluir:', err)
        });
    }
  }

  limpar() {
    this.isEditando = false;
    this.isAdicionando = false;
    this.formularioCliente.reset();
  }

  alternarOrdem() {
    const atual = this.filtro.get('ordenarAZ')?.value;
    this.filtro.get('ordenarAZ')?.setValue(!atual);
  }
}