package com.example.demo.Entities;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "ordem-servicos")
@Getter
@Setter
@EqualsAndHashCode (onlyExplicitlyIncluded = true)
public class OrdemServico {

    @Id
    @EqualsAndHashCode.Include
    private String id;

    @DBRef
    private Cliente cliente; 

    private LocalDateTime dataAtendimento;
    
    private double valorTotal;    

    @DBRef
    private List<Servico> listaServicos;



}   
