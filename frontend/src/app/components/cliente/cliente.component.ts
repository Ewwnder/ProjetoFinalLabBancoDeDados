import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteResponse } from '../../../entity/clienteResponse'; 
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

  clientes: ClienteResponse[] = []; 
  formularioCliente: FormGroup; 
  clienteRequest: ClienteRequest | null = null;
  clienteSelecionado: ClienteResponse | null = null;
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

  trackById(index: number, item: ClienteResponse) {
    return item.id;
  }

  carregarClientes() {
    const busca = this.filtro.get('busca')?.value;
    const ordenarAZ = this.filtro.get('ordenarAZ')?.value;

    this.servicoCliente.listarTodos()
      .subscribe({
        next: (json: ClienteResponse[]) => {
          this.clientes = json;
        }
      });
  }
  
  

  iniciarAdicao() {
    this.isAdicionando = true;
    this.isEditando = false;
    this.formularioCliente.reset();
  }

  iniciarEdicao(cliente: ClienteResponse) {
    this.isEditando = true;
    this.isAdicionando = false;
    this.formularioCliente.patchValue({
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        cpf: cliente.cpf,
        data_nascimento: cliente.data_nascimento, 
        informacoes: cliente.informacoes ?? ''
     });

    this.clienteSelecionado = cliente;
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
        
    } else if (this.isEditando) {
      if(!this.clienteSelecionado) return;
        this.servicoCliente.atualizar(clienteRequest, this.clienteSelecionado.id).subscribe({
            next: () => {
                alert('Cliente atualizado com sucesso!');
                this.carregarClientes();
                this.limpar();
            },
            error: (err) => console.error('Erro ao atualizar:', err)
        });
    }
  }


  excluir(cliente: ClienteResponse) {
    if (confirm(`Tem certeza que deseja excluir o cliente ${cliente.nome}?`)) {
        this.servicoCliente.excluir(cliente.id).subscribe({
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