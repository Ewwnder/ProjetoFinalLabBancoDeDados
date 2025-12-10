package com.example.demo.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Services.OrdemServicoService;
import com.example.demo.dto.OrdemServicoRequest;
import com.example.demo.dto.OrdemServicoResponse;

@RestController
@CrossOrigin
@RequestMapping("/ordem-servico")
public class OrdemServicoController {

    @Autowired
    private OrdemServicoService ordemServicoService;

    @PostMapping
    public ResponseEntity<Void> criar(@RequestBody OrdemServicoRequest ordemServicoRequest){
        ordemServicoService.criarOrdemServico(ordemServicoRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id){
        ordemServicoService.deletarOrdemServico(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<OrdemServicoResponse>> listarTodasOrdensServicos(){
        return ResponseEntity.ok(ordemServicoService.listarOrdensServicos());
    }

    @GetMapping("{id}")
    public ResponseEntity<OrdemServicoResponse> listarPeloId(@PathVariable String id){
        return ResponseEntity.ok(ordemServicoService.listarPeloId(id));
    }

    @DeleteMapping("{agendamentoId}/servicos/{servicoId}")
    public ResponseEntity<Void> deletarServicoDoAgendamento(@PathVariable String agendamentoId, @PathVariable String servicoId){
        ordemServicoService.deletarServicoDoAgendamento(agendamentoId, servicoId);
        return ResponseEntity.noContent().build();
    }
}
