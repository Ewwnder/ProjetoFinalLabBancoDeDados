package com.example.demo.Repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Responsavel;

@Repository
public interface ResponsavelRepository  extends MongoRepository<Responsavel, String>{

    public Optional<Responsavel> findByNome(String nome);

}
