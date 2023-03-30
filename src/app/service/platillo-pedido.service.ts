import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoDetalle } from '../models/PedidoModels';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatilloPedidoService {

  private baseUrl = "/facheros/api/v1/platilloPedido"

  constructor(private httpClient: HttpClient) { }

  guardarDetalles(detalle: PedidoDetalle[]): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/guardarTodo`, detalle, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("acctkn")}`
      }
    })
  }
}
