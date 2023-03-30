import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { PedidoRequest } from 'src/app/models/PedidoModels';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {

  private baseUrl = "/facheros/api/v1/pedido";
  private refresh$ = new Subject<void>();

  platillosAgregadosFinal = new EventEmitter<any[]>();
  envioPedido: Subject<boolean> = new Subject();
  pedidoFinalizado: Subject<boolean> =  new Subject();

  constructor(private httpClient: HttpClient) { }

  
  get refresh() {
    return this.refresh$;
  }
  

  obtenerPedidos(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/listarCustom`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("acctkn")
      }
    });
  }

  guardarPedido(pedido: PedidoRequest): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/guardar`, pedido, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("acctkn")}`
      }
    })
  }

  actualizarEstadoPedido(id: number, estado: string): Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/actualizar/estado/${id}?estado=${estado}`, null, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("acctkn")}`
      }
    }).pipe(
      tap(()=>{
        this.refresh$.next();
      })
    )
  }

}