package com.example.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entities.OrdemServico;
import com.example.demo.Entities.Servico;
import com.example.demo.Repositories.OrdemServicoRepository;
import com.example.demo.dto.OrdemServicoRequest;
import com.example.demo.dto.OrdemServicoResponse;
import com.example.demo.mapper.OrdemServicoMapper;

@Service
public class OrdemServicoService {

    @Autowired
    private OrdemServicoRepository ordemServicoRepository;

    @Autowired
    private OrdemServicoMapper ordemServicoMapper;

    public void criarOrdemServico(OrdemServicoRequest ordemServicoRequest){
        OrdemServico ordemServico = ordemServicoMapper.toEntity(ordemServicoRequest);
        

        ordemServicoRepository.save(ordemServico);
    }

    public List<OrdemServicoResponse> listarOrdensServicos(){
        return ordemServicoRepository.findAll().stream()
        .map(ordem -> ordemServicoMapper.toResponse(ordem))
        .toList();
    }

    public void deletarOrdemServico(String id){
        ordemServicoRepository.deleteById(id);
    }

    public OrdemServicoResponse listarPeloId(String id) {
        OrdemServico ordemServico = ordemServicoRepository.findById(id).orElseThrow(()-> new RuntimeException("Ordem Serviço não encontrada"));
        return ordemServicoMapper.toResponse(ordemServico);
    }

    public void deletarServicoDoAgendamento(String agendamentoId, String servicoId) {
        OrdemServico ordemServico = ordemServicoRepository.findById(agendamentoId).orElseThrow(()-> new RuntimeException("Ordem Serviço não encontrada"));

        ordemServico.getListaServicos().removeIf(servico -> servico.getId().equals(servicoId));
        if(ordemServico.getListaServicos().size()==0){
            ordemServicoRepository.delete(ordemServico);
            return;
        }
        double valor = ordemServico.getListaServicos()
        .stream()
        .mapToDouble(Servico::getValor)
        .sum();

        
        ordemServico.setValorTotal(valor);
        ordemServicoRepository.save(ordemServico);
    }

}
