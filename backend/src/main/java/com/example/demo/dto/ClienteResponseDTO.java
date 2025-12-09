package com.example.demo.dto;

import java.time.LocalDate;

public record ClienteResponseDTO(

    String id,
    String nome,
    String email,
    String telefone,
    String cpf,
    LocalDate cadastro,
    LocalDate dataNascimento,
    String informacoes


) {

}
