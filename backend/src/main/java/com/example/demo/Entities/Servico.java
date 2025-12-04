package com.example.demo.Entities;

import java.util.UUID;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "servicos")
@Table(name = "servicos")
@Getter
@Setter
@EqualsAndHashCode (onlyExplicitlyIncluded = true)
public class Servico {
    
    @Id
    @EqualsAndHashCode.Include
    private UUID id;

    private String nome;
    private String categoria;
    private String tipo;
    private Double valor;
    private Double custo;
    private String responsavel;

    public Servico(){
        this.id = UUID.randomUUID();
    }
}
