package com.example.demo.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

public record OrdemServicoRequest (

    LocalDateTime dataHora,
    String clienteId,
    List<String> servicosId
){
    
}
