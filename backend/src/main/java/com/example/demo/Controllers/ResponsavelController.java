package com.example.demo.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entities.Responsavel;
import com.example.demo.Services.ResponsavelService;
import com.example.demo.dto.ResponsavelRequestDTO;
import com.example.demo.dto.ResponsavelResponseDTO;
import com.example.demo.mapper.ResponsavelMapper;

@RestController
@CrossOrigin
@RequestMapping("/responsavel")
public class ResponsavelController {

    private final ResponsavelService responsavelService;
    private final ResponsavelMapper responsavelMapper;

    public ResponsavelController(ResponsavelService service, ResponsavelMapper mapper){
        this.responsavelService = service;
        this.responsavelMapper = mapper;
    }

    @PostMapping
    public ResponsavelResponseDTO criarResponsavel(@RequestBody ResponsavelRequestDTO dto){
        Responsavel responsavel = responsavelMapper.toEntity(dto);
        return responsavelMapper.toResponse(responsavelService.salvar(responsavel));
    }

    @GetMapping
    public List<ResponsavelResponseDTO> listarResponsaveis(){
        return responsavelService.listarResponsaveis()
        .stream()
        .map(responsavelMapper::toResponse)
        .toList();
    }

    @GetMapping("{id}")
    public ResponsavelResponseDTO buscarResponsavel(@PathVariable String id){
        return responsavelMapper.toResponse(responsavelService.buscarPorId(id));
    }

    @PutMapping("{id}")
    public ResponsavelResponseDTO atualizarResponsavel(@PathVariable String id, @RequestBody ResponsavelRequestDTO dto){
        Responsavel att = responsavelService.atualizar(id, responsavelMapper.toEntity(dto));
        return responsavelMapper.toResponse(att);
    }

    @DeleteMapping("{id}")
    public void deletarResponsavel(@PathVariable String id){
        responsavelService.excluirResponsavel(id);
    }

    @GetMapping("/nome/{nome}")
    public ResponsavelResponseDTO buscarPeloNome(@PathVariable String nome){
        return responsavelMapper.toResponse(responsavelService.buscarPeloNome(nome));
    }
}
