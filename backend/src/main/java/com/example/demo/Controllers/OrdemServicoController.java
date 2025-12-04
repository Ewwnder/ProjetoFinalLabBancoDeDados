package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.OrdemServico;
import com.example.demo.services.OrdemServicoService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
public class OrdemServicoController {

    @Autowired
    private OrdemServicoService ordemServicoService;

    public ResponseEntity<OrdemServico> criar(@Valid @RequestBody ordemServicoCreate){
        return ResponseEntity.created(null).body(ordemServicoService.criarOrdemServico(ordemServicoCreate));
    }
}
