import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgendamentoRequest } from '../../entity/agendamentoRequest';
import { Observable } from 'rxjs';
import { AgendamentoResponse } from '../../entity/agendamentoResponse';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {
  private apiUrl = 'http://localhost:8080/ordem-servico';

  constructor(private http: HttpClient) { }

  salvar(ordemServicoRequest: AgendamentoRequest): Observable<void>{
    return this.http.post<void>(this.apiUrl, ordemServicoRequest);
  }

  listarTodos() : Observable<AgendamentoResponse[]>{
    return this.http.get<AgendamentoResponse[]>(this.apiUrl);
  }

  deletar(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deletarServico(agendamentoId: string, servicoId: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${agendamentoId}/servicos/${servicoId}`)
  }
}
