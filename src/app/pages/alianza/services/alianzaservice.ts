import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ParametrosAlianza } from '../interfaces';
import { Environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlianzaService {
  private apiUrl = `${Environment.apiUrl}Alianza`;

  constructor(private http: HttpClient) { }

  gestionarAlianza(parametros: ParametrosAlianza): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Alianza`, parametros);
  }
}
