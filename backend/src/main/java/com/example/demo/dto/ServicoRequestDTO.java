package com.example.demo.dto;

public record ServicoRequestDTO(

    String nome,
    String categoria,
    String tipo,
    double valor,
    double custo,
    String responsavelId

) {

}
