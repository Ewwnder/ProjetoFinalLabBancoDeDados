package com.example.demo.Entities;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "clientes")
@Getter
@Setter
@EqualsAndHashCode (onlyExplicitlyIncluded = true)
public class Cliente {
    
    @Id
    @EqualsAndHashCode.Include
    private String id;

    private String cpf;

    private String nome;

    private String email;

    private String telefone;

    private String sexo;

    private LocalDate dataCadastro;

    private LocalDate dataNascimento;

    private String informacoesAdicionais;

}
