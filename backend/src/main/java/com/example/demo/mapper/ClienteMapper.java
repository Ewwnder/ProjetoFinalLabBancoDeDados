package com.example.demo.mapper;

import java.time.LocalDate;

import org.springframework.stereotype.Component;

import com.example.demo.Entities.Cliente;
import com.example.demo.dto.ClienteRequestDTO;
import com.example.demo.dto.ClienteResponseDTO;

@Component
public class ClienteMapper {

    public Cliente toEntity(ClienteRequestDTO request){
        Cliente cliente = new Cliente();
        cliente.setCpf(request.cpf());
        cliente.setEmail(request.email());
        cliente.setTelefone(request.telefone());
        cliente.setDataNascimento(request.dataNascimento());
        cliente.setDataCadastro(LocalDate.now());
        cliente.setInformacoesAdicionais(request.informacoes());
        return cliente;
    }

     String nome,
    String email,
    String telefone,
    String cpf,
    LocalDate cadastro,
    LocalDate dataNascimento,
    String informacoes


    public ClienteResponseDTO toResponse(Cliente cliente){
        return new ClienteResponseDTO(
        cliente.getId(), 
        cliente.getNome(), 
        cliente.getEmail(), 
        cliente.getTelefone(), 
        cliente.getCpf(), 
        cliente.getDataCadastro(), 
        cliente.getDataNascimento(), 
        cliente.getInformacoesAdicionais());
    }

}
