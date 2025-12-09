import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responsavel } from '../../entity/responsavel';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelService {

  private apiUrl = 'http://localhost:8080/responsaveis';

  constructor(private http: HttpClient) {}

  filtrar(busca?: string, ordenarAZ?: boolean): Observable<Responsavel[]> {
    let parametros = new HttpParams();

    if (busca) {
      parametros = parametros.set('busca', busca);
    }

    if (ordenarAZ !== undefined) {
      parametros = parametros.set('ordenarAZ', ordenarAZ.toString());
    }

    return this.http.get<Responsavel[]>(this.apiUrl, { params: parametros });
  }

  salvar(responsavel: Responsavel): Observable<Responsavel> {
    return this.http.post<Responsavel>(this.apiUrl, responsavel);
  }

  atualizar(responsavel: Responsavel): Observable<Responsavel> {
    return this.http.put<Responsavel>(`${this.apiUrl}/${responsavel.id}`, responsavel);
  }

  excluir(responsavel: Responsavel): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${responsavel.id}`);
  }
}
