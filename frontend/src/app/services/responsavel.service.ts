import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsavelResponse } from '../../entity/responsavelResponse';
import { ResponsavelComponent } from '../components/responsavel/responsavel.component';
import { ResponsavelRequest } from '../../entity/responsavelRequest';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelService {

  private apiUrl = 'http://localhost:8080/responsavel';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ResponsavelResponse[]> {

    return this.http.get<ResponsavelResponse[]>(this.apiUrl);
  }

  salvar(responsavel: ResponsavelRequest): Observable<ResponsavelResponse> {
    return this.http.post<ResponsavelResponse>(this.apiUrl, responsavel);
  }

  atualizar(responsavel: ResponsavelRequest, id: string): Observable<ResponsavelResponse> {
    return this.http.put<ResponsavelResponse>(`${this.apiUrl}/${id}`, responsavel);
  }

  excluir(responsavel: ResponsavelResponse): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${responsavel.id}`);
  }

  getByNome(nome: String): Observable<ResponsavelResponse>{
    return this.http.get<ResponsavelResponse>(`${this.apiUrl}/nome/${nome}`)
  }

}
