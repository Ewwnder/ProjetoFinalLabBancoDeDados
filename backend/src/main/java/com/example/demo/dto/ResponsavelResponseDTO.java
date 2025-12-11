package com.example.demo.dto;

public record ResponsavelResponseDTO(
        String id,
        String nome,
        String email,
        String telefone,
        String cargo,
        String especialidade,
        double salario
) {}