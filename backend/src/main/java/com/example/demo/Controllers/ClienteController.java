package com.example.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Services.ClienteService;
import com.example.demo.dto.ClienteResponseDTO;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("{email}")
    public ResponseEntity<ClienteResponseDTO> buscarPeloEmail(@PathVariable String email){
        return ResponseEntity.ok(clienteService.buscarPeloEmail(email));
    }
    
}
