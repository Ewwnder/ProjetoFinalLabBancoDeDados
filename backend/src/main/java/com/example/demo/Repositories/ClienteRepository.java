package com.example.demo.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Cliente;

@Repository
public interface ClienteRepository extends MongoRepository<Cliente, String> {

    public Cliente findByEmail(String email);
}
