import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatilloService {

  private baseUrl = "/facheros/api/v1/platillo";

  constructor(private httpClient: HttpClient) { }

  obtenerPlatillos(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/listar`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("acctkn")
      }
    });
  }
}
