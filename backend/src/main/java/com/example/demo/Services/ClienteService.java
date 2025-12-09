package com.example.demo.Services;

import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repositories.ClienteRepository;
import com.example.demo.dto.ClienteRequestDTO;
import com.example.demo.dto.ClienteResponseDTO;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public void cadastrarCliente(ClienteRequestDTO clienteRequestDTO){

    }

    public void deletarCliente (String id){

    }

    public List<ClienteResponseDTO> listarClientes(){
        return clienteRepository.findAll();
    }

    public ClienteResponseDTO buscarPeloEmail(String email) {
        
       return clienteRepository.findByEmail(email);
    }

}
