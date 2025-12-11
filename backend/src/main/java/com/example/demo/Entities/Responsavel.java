package com.example.demo.Entities;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "responsaveis")
@Getter
@Setter
@EqualsAndHashCode (onlyExplicitlyIncluded = true)
public class Responsavel {

    @Id
    @EqualsAndHashCode.Include
    private String id;
    
    private String nome;
    private String email;
    private String telefone;
    private String cargo;
    private String especialidade;
    private Double salario;
}
