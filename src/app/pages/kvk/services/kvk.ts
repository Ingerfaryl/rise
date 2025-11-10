import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KvkServices {
  private apiUrl = `${environment.apiUrl}Kvk`;

  constructor(private http: HttpClient) { }

  getKvkData(parametros: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/GetKvk`, parametros);
  }
}
