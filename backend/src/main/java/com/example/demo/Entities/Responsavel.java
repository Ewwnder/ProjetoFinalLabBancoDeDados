package com.example.demo.Entities;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "responsavel")
@Getter
@Setter
@EqualsAndHashCode (onlyExplicitlyIncluded = true)
public class Responsavel {
    
    private String nome;
    private String email;
    private String telefone;
    private String cargo;
    private String especialidade;
    private Double salario;
}
