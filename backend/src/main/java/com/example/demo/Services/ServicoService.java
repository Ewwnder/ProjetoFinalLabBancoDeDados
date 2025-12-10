package com.example.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.example.demo.Entities.Servico;
import com.example.demo.Repositories.ServicoRepository;

@Service
public class ServicoService {
    
    @Autowired
    private ServicoRepository repositorioServico;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Servico> getAll() {
        return repositorioServico.findAll();
    }

    public Servico save(Servico servico) {
        return repositorioServico.save(servico);
    }

    public void delete(String id) {
        repositorioServico.deleteById(id);
    }

    public List<Servico> filtroContatos(String tipo, String busca, String categoria, Boolean ordenarAZ) {
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

        return mongoTemplate.find(query, Servico.class);
    }

    public Servico buscarPeloId(String id) {
        return repositorioServico.findById(id).orElse(null);
    }
}
