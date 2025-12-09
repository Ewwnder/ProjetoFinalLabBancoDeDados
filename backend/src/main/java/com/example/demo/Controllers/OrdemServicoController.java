package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Services.OrdemServicoService;
import com.example.demo.dto.OrdemServicoRequest;

@RestController
@CrossOrigin
public class OrdemServicoController {

    @Autowired
    private OrdemServicoService ordemServicoService;

    @PostMapping
    public ResponseEntity<Void> criar(@RequestBody OrdemServicoRequest ordemServicoRequest){
        ordemServicoService.criarOrdemServico(ordemServicoRequest);
        return ResponseEntity.noContent().build();
    }
}
