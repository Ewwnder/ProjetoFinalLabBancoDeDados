package com.example.demo.dto;

public record ServicoResponseDTO(
    String id,
    String nome,
    String categoria,
    String tipo,
    double valor,
    double custo,
    String responsavelNome
){}
