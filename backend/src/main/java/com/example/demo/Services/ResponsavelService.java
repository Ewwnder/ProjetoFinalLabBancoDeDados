package com.example.demo.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Entities.Responsavel;
import com.example.demo.Repositories.ResponsavelRepository;

@Service
public class ResponsavelService {

    private final ResponsavelRepository responsavelRepository;

    public ResponsavelService(ResponsavelRepository responsavelRepository){
        this.responsavelRepository= responsavelRepository;
    }

    public Responsavel salvar(Responsavel responsavel){
        return responsavelRepository.save(responsavel);
    }
    
    public Responsavel atualizar(String id, Responsavel dados){
        Responsavel responsavel = responsavelRepository.findById(id).orElseThrow(() -> new RuntimeException("Responsável não encontrado!"));

        responsavel.setNome(dados.getNome());
        responsavel.setEmail(dados.getEmail());
        responsavel.setTelefone(dados.getTelefone());
        responsavel.setCargo(dados.getCargo());
        responsavel.setEspecialidade(dados.getEspecialidade());
        responsavel.setSalario(dados.getSalario());

        return responsavelRepository.save(responsavel);
    }

    public List<Responsavel> listarResponsaveis(){
        return responsavelRepository.findAll();
    }

    public Responsavel buscarPorId(String id){
        return responsavelRepository.findById(id).orElseThrow(() -> new RuntimeException("Responsável não encontrado!"));
    }

    public void excluirResponsavel(String id){
        if (!responsavelRepository.existsById(id)){
            throw new RuntimeException("Responsável não encontrado");
        }

        responsavelRepository.deleteById(id);
    }
}
