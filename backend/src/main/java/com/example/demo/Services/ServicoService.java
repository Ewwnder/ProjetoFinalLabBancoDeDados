package com.example.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.example.demo.Entities.Responsavel;
import com.example.demo.Entities.Servico;
import com.example.demo.Repositories.ResponsavelRepository;
import com.example.demo.Repositories.ServicoRepository;
import com.example.demo.dto.ServicoRequestDTO;
import com.example.demo.dto.ServicoResponseDTO;
import com.example.demo.mapper.ServicoMapper;

@Service
public class ServicoService {
    
    @Autowired
    private ServicoRepository repositorioServico;

    @Autowired
    private ResponsavelRepository responsavelRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private ServicoMapper servicoMapper;

    public List<ServicoResponseDTO> getAll() {
        return repositorioServico.findAll().stream()
        .map(s -> servicoMapper.toResponse(s))
        .toList();
    }

    public ServicoResponseDTO save(ServicoRequestDTO servicoRequestDTO) {
        Servico servico = servicoMapper.toEntity(servicoRequestDTO);

     
       
       
        return servicoMapper.toResponse(repositorioServico.save(servico));
    }

    public ServicoResponseDTO alterar(String id, ServicoRequestDTO servicoRequestDTO){
           Servico servico = repositorioServico.findById(id).orElseThrow(()-> new RuntimeException("Serviço não encontrado"));

           if (servicoRequestDTO.nome() != null && !servicoRequestDTO.nome().isEmpty()) {
                servico.setNome(servicoRequestDTO.nome());
           }

           if (servicoRequestDTO.categoria() != null && !servicoRequestDTO.categoria().isEmpty()) {
                servico.setCategoria(servicoRequestDTO.categoria());
            }

            if (servicoRequestDTO.tipo() != null && !servicoRequestDTO.tipo().isEmpty()) {
                servico.setTipo(servicoRequestDTO.tipo());
            }

            servico.setValor(servicoRequestDTO.valor());
            servico.setCusto(servicoRequestDTO.custo());

         if (servicoRequestDTO.responsavelId() != null && !servicoRequestDTO.responsavelId().isEmpty()) {
            Responsavel responsavel = responsavelRepository.findById(servicoRequestDTO.responsavelId()).orElseThrow(()-> new RuntimeException("Responsável não encontrado"));
            servico.setResponsavel(responsavel);
        }

        repositorioServico.save(servico);

        return servicoMapper.toResponse(servico);
    }

    public void delete(String id) {
        repositorioServico.deleteById(id);
    }

    public List<ServicoResponseDTO> filtroContatos(String tipo, String busca, String categoria, Boolean ordenarAZ) {
        Query query = new Query();

        if (tipo != null && !tipo.isEmpty()) {
            query.addCriteria(Criteria.where("tipo").is(tipo));
        }

        if (categoria != null && !categoria.isEmpty()) {
            query.addCriteria(Criteria.where("categoria").is(categoria));
        }

        if (busca != null && !busca.isEmpty()) {
            query.addCriteria(Criteria.where("nome").regex(busca, "i"));
        }

        if (Boolean.TRUE.equals(ordenarAZ)) {
            query.with(Sort.by(Sort.Order.asc("nome")));
        }

        return mongoTemplate.find(query, Servico.class).stream()
            .map(s -> servicoMapper.toResponse(s))
            .toList();
    }

    public ServicoResponseDTO buscarPeloId(String id) {
        return servicoMapper.toResponse(repositorioServico.findById(id).orElseThrow(()-> new RuntimeException("Serviço não encontrado")));
    }
}
