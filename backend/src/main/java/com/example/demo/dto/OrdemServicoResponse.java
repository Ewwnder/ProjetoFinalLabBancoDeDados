package com.example.demo.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

public record OrdemServicoResponse(
    String id,
    LocalDateTime dataHora,
    String nomeCliente,
    List<String> servicosId,
    double valorTotal

) {
   
}
