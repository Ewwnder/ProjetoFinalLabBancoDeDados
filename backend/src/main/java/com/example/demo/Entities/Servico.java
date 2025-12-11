package com.example.demo.Entities;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "servicos")
@Getter
@Setter
@EqualsAndHashCode (onlyExplicitlyIncluded = true)
public class Servico {
    
    @Id
    @EqualsAndHashCode.Include
    private String id;

    private String nome;
    private String categoria;   
    private String tipo;
    private Double valor;
    private Double custo;
    
    @DBRef
    private Responsavel responsavel;


}
