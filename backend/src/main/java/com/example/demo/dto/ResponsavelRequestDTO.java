package com.example.demo.dto;

public record ResponsavelRequestDTO(
        String nome,
        String email,
        String telefone,
        String cargo,
        String especialidade,
        double salario
) {}
