package com.example.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repositories.ClienteRepository;
import com.example.demo.dto.ClienteRequestDTO;
import com.example.demo.dto.ClienteResponseDTO;
import com.example.demo.mapper.ClienteMapper;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ClienteMapper clienteMapper;

    public void cadastrarCliente(ClienteRequestDTO clienteRequestDTO){
        clienteRepository.save(clienteMapper.toEntity(clienteRequestDTO));
    }

    public void deletarCliente (String id){
        clienteRepository.deleteById(id);
    }

    public List<ClienteResponseDTO> listarClientes(){
        return clienteRepository.findAll().stream()
        .map(c -> clienteMapper.toResponse(c))
        .toList();
    }

    public ClienteResponseDTO buscarPeloEmail(String email) {
       return clienteMapper.toResponse(clienteRepository.findByEmail(email));
    }

}
