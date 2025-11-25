import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class KpEtapaService {
  private apiUrl = `${environment.apiUrl}KpEtapa`;
  
  constructor(private http: HttpClient) { }

  getKpEtapa(parametros:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/GetKpEtapa`, parametros);
  }
}
