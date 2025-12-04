package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.OrdemServico;
import com.example.demo.repositories.OrdemServicoRepository;

@Service
public class OrdemServicoService {

    @Autowired
    private OrdemServicoRepository ordemServicoRepository;

    public OrdemServico criarOrdemServico(OrdemServico ordemServico){
        return ordemServicoRepository.save(ordemServico);
    }

}
