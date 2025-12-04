package com.example.demo.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
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

    @NotBlank(message="O cliente não pode ser nulo")
    private String cliente; 

    @NotNull(message="A data de atendimento não pode ser nula")
    @FutureOrPresent(message="Você não pode realizar um agendamento no passado")
    private LocalDate dataAtendimento;

    @NotNull(message="O horário atendimento não pode ser nulo")
    private LocalTime horarioAtendimento;

    @NotNull(message="O valor total não pode ser nulo")
    @Positive(message="O valor total tem que ser maior que 0.0")
    private double valorTotal;    

    @DBRef
    @NotEmpty(message="A lista de serviços não pode ser nula")
    private List<Servico> listaServicos;



}   
