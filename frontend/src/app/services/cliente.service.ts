import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../entity/cliente';
import { ClienteRequest } from '../../entity/clienteRequest';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/clientes'; 

  constructor(private http: HttpClient) {}

  filtrar(busca?: string, ordenarAZ?: boolean): Observable<Cliente[]> {
    let parametros = new HttpParams();

    if (busca) {
      parametros = parametros.set('busca', busca);
    }

    if (ordenarAZ !== undefined) {
      parametros = parametros.set('ordenarAZ', ordenarAZ.toString());
    }

    return this.http.get<Cliente[]>(this.apiUrl, { params: parametros });
  }

  salvar(cliente: ClienteRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, cliente);
  }

  atualizar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente);
  }

  excluir(cliente: Cliente): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cliente.id}`);
  }

   buscarPeloEmail(email: string): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.apiUrl}/${email}`)
  }
}
