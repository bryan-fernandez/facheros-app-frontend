import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { Pedido } from 'src/app/models/PedidoModels';
import { PedidoService } from 'src/app/service/pedido.service';


@Component({
  selector: 'app-cocina-table',
  templateUrl: './cocina-table.component.html',
  styleUrls: ['./cocina-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CocinaTableComponent implements OnInit {

  @Input() delivery: boolean;
  @Input() estado: string;

  expandedElement: Pedido | null;
  columnsToDisplay: string[];
  columnsToDisplayWithExpand: any[];
  dataSource: MatTableDataSource<any>;
  suscription: Subscription | undefined;

  pedidos: any[];
  pedidosMostrar: any[];
  pedidosMostrar$: Subject<any[]>;
  isLoad: boolean;

  constructor(private pedidoService: PedidoService) {
    this.dataSource = new MatTableDataSource();
    this.pedidosMostrar$ = new Subject();
    this.pedidos = [];
    this.pedidosMostrar = [];
    this.delivery = false;
    this.estado = "";
    this.isLoad = false;


    this.columnsToDisplay = [];

    this.columnsToDisplayWithExpand = [];
    this.expandedElement = null;
  }

  ngOnInit(): void {
    this.configurarTabla();
    this.obtenerPedidos();
    this.suscription = this.pedidoService.refresh.subscribe(() => {
      this.obtenerPedidos();
    })
  }

  obtenerPedidos() {
    this.pedidoService.obtenerPedidos().subscribe((data) => {
      this.pedidos = data;
      this.filtrarTable();
      if (this.isLoad) {

      }
    }, (err) => {
      console.error(err);
    }, () => {
      this.configurarTabla();
      this.isLoad = true;
    });
  }

  configurarTabla() {
    if (this.delivery) {
      this.columnsToDisplay = ['nroOrden', "cliente", 'montoTotal', 'estado'];
    } else {
      this.columnsToDisplay = ['nroOrden', 'montoTotal', 'estado'];
    }

    this.columnsToDisplayWithExpand = [...this.columnsToDisplay];
  }

  filtrarTable() {
    if (this.delivery) {
      this.filtrarPedidos("DELIVERY");
    } else {
      this.filtrarPedidos("PRESENCIAL");
    }
  }

  filtrarPedidos(atencion: string) {
    switch (this.estado) {
      case "PENDIENTE": this.filtrar(atencion, "PENDIENTE"); break;
      case "PREPARADO": this.filtrar(atencion, "PREPARADO"); break;
      case "PAGADO": this.filtrar(atencion, "PAGADO"); break;
      case "CANCELADO": this.filtrar(atencion, "CANCELADO"); break;
      default: break;
    }
  }

  filtrar(atencion: string, estado: string) {
    this.pedidosMostrar = this.pedidos.filter(p => p.atencion == atencion && p.estado === estado);

    //Ordenando por nroPedido
    this.pedidosMostrar.sort((a, b) => a.nroOrden.localeCompare(b.nroOrden));
    this.dataSource.data = this.pedidosMostrar;
  }

  setearCambioEstado(): boolean {
    if (this.estado === "PENDIENTE") {
      return true;
    }

    return false;
  }

  cambiarEstado(id: number) {
    if (this.estado === "PENDIENTE") {
      this.pedidoService.actualizarEstadoPedido(id, "PREPARADO").subscribe((data) => {
        // this.obtenerPedidos();
        this.pedidoService.obtenerPedidos();
      });

    } else if (this.estado === "PREPARADO") {
      this.pedidoService.actualizarEstadoPedido(id, "PAGADO").subscribe((data) => {
        // this.obtenerPedidos();
        this.pedidoService.obtenerPedidos();
      });
    }
    else {
      this.pedidoService.actualizarEstadoPedido(id, "CANCELADO");
    }
  }

  esNumero(value: number | string): Boolean {
    if (value.toString().includes(".")) {
      return true;
    } else {
      return false;
    }
  }
}