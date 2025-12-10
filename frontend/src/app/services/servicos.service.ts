import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servico } from '../../entity/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  private apiUrl = 'http://localhost:8080/servicos';

  constructor(private http:HttpClient) { }

  getAll(): Observable<Servico[]>{
    return this.http.get<Servico[]>(this.apiUrl);
  }

  filtrarServico(tipo?: string, busca?: string, categoria?: string, ordenarAZ?: boolean): Observable<Servico[]> {
    
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

    return this.http.get<Servico[]>(`${this.apiUrl}`, { params: servicoFiltrado});
  }

  save(servico:Servico): Observable<Servico>{
    return this.http.post<Servico>(this.apiUrl, servico);
  }

  update(servico:Servico): Observable<Servico>{
    return this.http.put<Servico>(`${this.apiUrl}/${servico.id}`, servico);
  }

  delete(servico:Servico): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${servico.id}`);
  }

  getById(id: string): Observable<Servico>{
    return this.http.get<Servico>(`${this.apiUrl}/${id}`);
  }
}
