package com.example.demo.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.Entities.Responsavel;
import com.example.demo.Entities.Servico;
import com.example.demo.Repositories.ResponsavelRepository;
import com.example.demo.dto.ServicoRequestDTO;
import com.example.demo.dto.ServicoResponseDTO;

@Component
public class ServicoMapper {

    @Autowired
    private ResponsavelRepository responsavelRepository;

    public ServicoResponseDTO toResponse(Servico servico){
        return new ServicoResponseDTO(
        servico.getId(), 
        servico.getNome(), 
        servico.getCategoria(), 
        servico.getTipo(),
        servico.getValor(),
        servico.getCusto(),
        servico.getResponsavel().getNome()
        );
    }

    public Servico toEntity(ServicoRequestDTO servicoRequestDTO){
        Servico servico = new Servico();
        Responsavel responsavel = responsavelRepository.findById(servicoRequestDTO.responsavelId()).orElseThrow(()-> new RuntimeException("Não encontrado o responsavel"));
        servico.setNome(servicoRequestDTO.nome());
        servico.setCategoria(servicoRequestDTO.categoria());
        servico.setTipo(servicoRequestDTO.tipo());
        servico.setValor(servicoRequestDTO.valor());
        servico.setCusto(servicoRequestDTO.custo());
        servico.setResponsavel(responsavel);

        return servico;
    }
}
 