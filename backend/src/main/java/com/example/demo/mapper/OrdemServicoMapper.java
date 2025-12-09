package com.example.demo.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.Entities.OrdemServico;
import com.example.demo.Entities.Servico;
import com.example.demo.Repositories.ServicoRepository;
import com.example.demo.dto.OrdemServicoRequest;
import com.example.demo.dto.OrdemServicoResponse;

@Component
public class OrdemServicoMapper {

    @Autowired
    private ServicoRepository servicoRepository;

    public OrdemServico toEntity(OrdemServicoRequest ordemServicoRequest){
        OrdemServico ordemServico = new OrdemServico();

        ordemServico.setDataAtendimento(ordemServicoRequest.dataHora());

        List<Servico> servicos = new ArrayList<>();
        
        for(String id : ordemServicoRequest.servicosId()){
            Servico servico = servicoRepository.findById(id).orElse(null);
            servicos.add(servico);
        }

        ordemServico.setListaServicos(servicos);

        return ordemServico;

    }

    public OrdemServicoResponse toResponse(OrdemServico ordemServico){
        List<String> nomesServicos = ordemServico.getListaServicos().stream()
        .map(servico -> servico.getNome())
        .toList();


        return new OrdemServicoResponse(
            ordemServico.getDataAtendimento(),
            ordemServico.getCliente().getNome(),
            nomesServicos);
    }


}
