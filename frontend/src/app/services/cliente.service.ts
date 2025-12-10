import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteResponse } from '../../entity/clienteResponse';
import { ClienteRequest } from '../../entity/clienteRequest';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/clientes'; 

  constructor(private http: HttpClient) {}

  filtrar(busca?: string, ordenarAZ?: boolean): Observable<ClienteResponse[]> {
    let parametros = new HttpParams();

    if (busca) {
      parametros = parametros.set('busca', busca);
    }

    if (ordenarAZ !== undefined) {
      parametros = parametros.set('ordenarAZ', ordenarAZ.toString());
    }

    return this.http.get<ClienteResponse[]>(this.apiUrl, { params: parametros });
  }

  salvar(cliente: ClienteRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, cliente);
  }

  atualizar(cliente: ClienteRequest, id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, cliente);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

   buscarPeloEmail(email: string): Observable<ClienteResponse>{
    return this.http.get<ClienteResponse>(`${this.apiUrl}/${email}`)
  }
}
