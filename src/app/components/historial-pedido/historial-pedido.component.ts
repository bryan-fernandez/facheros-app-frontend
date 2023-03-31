import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DetallePedidoDialog } from 'src/app/dialogs/detalle-pedido/detalle-pedido-dialog';
import { PedidoService } from 'src/app/service/pedido.service';

@Component({
  selector: 'app-historial-pedido',
  templateUrl: './historial-pedido.component.html',
  styleUrls: ['./historial-pedido.component.css']
})
export class HistorialPedidoComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  pedidos: any[];
  pedidosMostrar: any[];

  constructor(private pedidoService: PedidoService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    this.displayedColumns = ['codigo', 'nroOrden', 'cliente', 'montoTotal']; //, 'estado', 'creado'
    this.pedidos = [];
    this.pedidosMostrar = [];
  }

  ngOnInit(): void {
    this.pedidoService.obtenerPedidos().subscribe((data) => {
      this.pedidos = data;
      this.pedidosMostrar = this.pedidos.filter(p => p.estado === "PAGADO");
      this.parsearDatos();
      this.dataSource.data = this.pedidosMostrar;
    })
  }

  mostrarDetalle(pedido: any) {
    this.dialog.open(DetallePedidoDialog, {
      data: pedido
    });
  }

  parsearDatos() {
    this.pedidosMostrar.forEach(p => {
      const fecha = new Date(p.fechaCreacion);
      let mes = "";
      let minutos = "";

      if (fecha.getMonth() + 1 < 10) mes = `0${fecha.getMonth() + 1}`;
      else mes = `${fecha.getMonth() + 1}`;

      if(fecha.getMinutes() < 10) minutos = `0${fecha.getMinutes()}`;
      else minutos = `${fecha.getMinutes()}`;

      if(p.cliente === "") p.cliente = "No encontrado";

      const fechaCreacion = `${fecha.getDate()}/${mes}/${fecha.getFullYear()} ${fecha.getHours()}:${minutos}`;
      p.fechaCreacion = fechaCreacion;
    })
  }

  aplicarFiltro(e: any) {
    const filtro = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
}
