package com.example.demo.dto;

import java.time.LocalDateTime;
import java.util.List;

public record OrdemServicoResponse(
    LocalDateTime dataHora,
    String nomeCliente,
    List<String> servicosId

) {
   
}
