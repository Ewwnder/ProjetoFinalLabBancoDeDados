package com.example.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Services.ClienteService;
import com.example.demo.dto.ClienteRequestDTO;
import com.example.demo.dto.ClienteResponseDTO;

@RestController
@CrossOrigin
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("{email}")
    public ResponseEntity<ClienteResponseDTO> buscarPeloEmail(@PathVariable String email){
        return ResponseEntity.ok(clienteService.buscarPeloEmail(email));
    }

    @GetMapping
    public ResponseEntity<List<ClienteResponseDTO>> listarTodos(){
        return ResponseEntity.ok(clienteService.listarClientes());
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> atualizar(@PathVariable String id, @RequestBody ClienteRequestDTO clienteRequestDTO){
        clienteService.atualizar(id, clienteRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Void> cadastrarCliente(@RequestBody ClienteRequestDTO clienteRequestDTO){
        clienteService.cadastrarCliente(clienteRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable String id){
        clienteService.deletarCliente(id);
        return ResponseEntity.noContent().build();
    }
    
    
}
