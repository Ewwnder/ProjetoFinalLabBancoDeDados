package com.example.demo.mapper;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.Entities.Cliente;
import com.example.demo.Entities.OrdemServico;
import com.example.demo.Entities.Servico;
import com.example.demo.Repositories.ClienteRepository;
import com.example.demo.Repositories.ServicoRepository;
import com.example.demo.dto.OrdemServicoRequest;
import com.example.demo.dto.OrdemServicoResponse;

@Component
public class OrdemServicoMapper {

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    public OrdemServico toEntity(OrdemServicoRequest ordemServicoRequest){
        double valorTotal=0;
        OrdemServico ordemServico = new OrdemServico();
        Cliente cliente = clienteRepository.findById(ordemServicoRequest.clienteId()).orElseThrow(()-> new RuntimeException("CLIENTE NÃO ENCONTRADO"));
        ordemServico.setCliente(cliente);
        ordemServico.setDataAtendimento(ordemServicoRequest.dataHora());

        
       
        List<Servico> servicos = new ArrayList<>();
        
        for(String id : ordemServicoRequest.servicosId()){
            Servico servico = servicoRepository.findById(id).orElseThrow(()-> new RuntimeException("Serviço não encontrado"));
            servicos.add(servico);
            valorTotal+=servico.getValor();
        }

        ordemServico.setListaServicos(servicos);
        ordemServico.setValorTotal(valorTotal);

        return ordemServico;

    }

    public OrdemServicoResponse toResponse(OrdemServico ordemServico){
        List<String> idsServicos = ordemServico.getListaServicos().stream()
        .map(servico -> servico.getId())
        .toList();

        return new OrdemServicoResponse(
            ordemServico.getId(),
            ordemServico.getDataAtendimento(),
            ordemServico.getCliente().getNome(),
            idsServicos,
            ordemServico.getValorTotal()    
        );
    }


}
