package com.example.demo.Repositories;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.Entities.Servico;

public interface ServicoRepository extends MongoRepository<Servico, UUID> {
    
}
