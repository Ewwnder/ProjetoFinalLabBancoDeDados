import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicoResponse } from '../../entity/servicoResponse';
import { ServicoRequest } from '../../entity/servicoRequest';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  private apiUrl = 'http://localhost:8080/servicos';

  constructor(private http:HttpClient) { }

  getAll(): Observable<ServicoResponse[]>{
    return this.http.get<ServicoResponse[]>(this.apiUrl);
  }

  filtrarServico(tipo?: string, busca?: string, categoria?: string, ordenarAZ?: boolean): Observable<ServicoResponse[]> {
    
    let servicoFiltrado = new HttpParams();

    if (tipo){
      servicoFiltrado = servicoFiltrado.set('tipo', tipo);
    }
    if (busca){
      servicoFiltrado = servicoFiltrado.set('busca', busca);
    }
    if (categoria){
      servicoFiltrado = servicoFiltrado.set('categoria', categoria);
    }
    if (ordenarAZ){
      servicoFiltrado = servicoFiltrado.set('ordenarAZ', ordenarAZ.toString());
    }

    return this.http.get<ServicoResponse[]>(`${this.apiUrl}`, { params: servicoFiltrado});
  }

  save(servico:ServicoRequest): Observable<ServicoResponse>{
    return this.http.post<ServicoResponse>(this.apiUrl, servico);
  }

  update(servico:ServicoRequest, id: string): Observable<ServicoResponse>{
    return this.http.put<ServicoResponse>(`${this.apiUrl}/${id}`, servico);
  }

  delete(servico:ServicoResponse): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${servico.id}`);
  }

  getById(id: string): Observable<ServicoResponse>{
    return this.http.get<ServicoResponse>(`${this.apiUrl}/${id}`);
  }
}
