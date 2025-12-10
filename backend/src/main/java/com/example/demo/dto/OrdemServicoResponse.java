package com.example.demo.dto;

import java.time.LocalDateTime;
import java.util.List;

public record OrdemServicoResponse(
    String id,
    LocalDateTime dataHora,
    String nomeCliente,
    List<String> servicosId,
    double valorTotal

) {
   
}
