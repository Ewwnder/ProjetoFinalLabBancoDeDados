package com.example.demo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.OrdemServico;

@Repository
public interface OrdemServicoRepository extends MongoRepository<OrdemServico, String> {

}
