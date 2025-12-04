package com.example.demo.entities;

import java.util.UUID;

import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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

    @NotBlank(message="O nome do serviço não pode ser vazio")
    private String nome;

    @NotBlank(message="A categoria do serviço não pode ser vazia")
    private String categoria;

    @NotBlank(message="O tipo do serviço não pode ser vazio")
    private String tipo;

    @NotNull(message="O valor do serviço não pode ser nulo")
    @Positive(message="O valor a cobrar deve ser maior que 0.0")
    private Double valor;

    @NotNull(message= "O custo do serviço não pode ser vazio")
    @Positive(message="O custo do serviço deve ser maior que 0")
    private Double custo;

    @NotBlank(message="O responsável não pode ser vazio")
    private String responsavel;


}
