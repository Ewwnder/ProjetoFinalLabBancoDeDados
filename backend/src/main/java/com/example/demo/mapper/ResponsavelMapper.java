package com.example.demo.mapper;

import org.springframework.stereotype.Component;

import com.example.demo.Entities.Responsavel;
import com.example.demo.dto.ResponsavelRequestDTO;
import com.example.demo.dto.ResponsavelResponseDTO;

@Component
public class ResponsavelMapper {

    public Responsavel toEntity(ResponsavelRequestDTO dto) {
        Responsavel r = new Responsavel();
        r.setNome(dto.nome());
        r.setEmail(dto.email());
        r.setTelefone(dto.telefone());
        r.setCargo(dto.cargo());
        r.setEspecialidade(dto.especialidade());
        r.setSalario(dto.salario());
        return r;
    }

    public ResponsavelResponseDTO toResponse(Responsavel r) {
        return new ResponsavelResponseDTO(
                r.getId(),
                r.getNome(),
                r.getEmail(),
                r.getTelefone(),
                r.getCargo(),
                r.getEspecialidade(),
                r.getSalario());
    }
}
