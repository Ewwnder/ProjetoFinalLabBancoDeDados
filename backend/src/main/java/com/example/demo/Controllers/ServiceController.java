package com.example.demo.Controllers;

import java.util.List;
import java.util.UUID;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entities.Servico;
import com.example.demo.Services.ServicoService;

@RestController
@RequestMapping("/servicos")
@CrossOrigin
public class ServiceController {
    
    @Autowired
    private ServicoService servicoService;

    @GetMapping
    public ResponseEntity<List<Servico>> filtrar(
        @RequestParam(required = false) String tipo,
        @RequestParam(required = false) String busca,
        @RequestParam(required = false) String categoria,
        @RequestParam(required = false) Boolean ordenarAZ
    ) {
        return ResponseEntity.ok(servicoService.filtroContatos(tipo, busca, categoria, ordenarAZ));
    }

    @PostMapping
    public ResponseEntity<Servico> inserir(@RequestBody Servico servico){
        return ResponseEntity.created(null).body(servicoService.save(servico));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servico> alterar(@PathVariable String id, @RequestBody Servico servico){
        servico.setId(id);
        return ResponseEntity.ok(servicoService.save(servico));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id){
        servicoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
