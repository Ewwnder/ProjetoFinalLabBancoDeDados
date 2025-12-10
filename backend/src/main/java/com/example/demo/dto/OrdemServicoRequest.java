package com.example.demo.dto;

import java.time.LocalDateTime;
import java.util.List;

public record OrdemServicoRequest (

    LocalDateTime dataHora,
    String clienteId,
    List<String> servicosId
){
    
}
