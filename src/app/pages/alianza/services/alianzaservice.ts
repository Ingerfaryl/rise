import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ParametrosAlianza } from '../interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlianzaService {
  private apiUrl = `${environment.apiUrl}Alianza`;

  constructor(private http: HttpClient) {}

  gestionarAlianza(parametros: ParametrosAlianza): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/GetAlianzas`, parametros);
  }

  ListarAlianza(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ListarAlianza`);
  }
}
