package com.example.demo.dto;

import java.time.LocalDate;

public record ClienteRequestDTO(

    String nome,
    String email,
    String telefone,
    String sexo,
    String cpf,
    LocalDate data_nascimento,
    String informacoes

) {
   

}
