import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdemServicoRequest } from '../../entity/ordemServicoRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {
  private apiUrl = 'http://localhost:8080/ordem-servico';

  constructor(private http: HttpClient) { }

  salvar(ordemServicoRequest: OrdemServicoRequest): Observable<void>{
    return this.http.post<void>(this.apiUrl, ordemServicoRequest);
  }
}
