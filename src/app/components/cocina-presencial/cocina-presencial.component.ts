import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { PedidoService } from 'src/app/service/pedido.service';

@Component({
  selector: 'app-cocina-presencial',
  templateUrl: './cocina-presencial.component.html',
  styleUrls: ['./cocina-presencial.component.css']
})
export class CocinaPresencialComponent implements OnInit {

  pedidos: any[];

  constructor(private pedidoService: PedidoService, private app: AppComponent) {
    this.pedidos = [];
   }

  ngOnInit(): void {

    this.pedidoService.obtenerPedidos().subscribe((data) => {
      this.pedidos = data;
    })
  }

}
