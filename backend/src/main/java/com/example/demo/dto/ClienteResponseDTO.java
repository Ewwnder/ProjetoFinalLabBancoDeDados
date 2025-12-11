package com.example.demo.dto;

import java.time.LocalDate;

public record ClienteResponseDTO(

    String id,
    String nome,
    String email,
    String telefone,
    String cpf,
    LocalDate data_cadastro,
    LocalDate data_nascimento,
    String informacoes


) {

}
