import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { PlatilloAgregado } from 'src/app/models/PlatilloModels';
import { PedidoService } from 'src/app/service/pedido.service';
import { PlatilloService } from 'src/app/service/platillo.service';

@Component({
  selector: 'app-platillo-table',
  templateUrl: './platillo-table.component.html',
  styleUrls: ['./platillo-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlatilloTableComponent implements OnInit {

  platillos: Array<any> | undefined;
  platillosAgregados: any[];
  platillosAgregados$: Subject<any[]>;
  expandedElement: PlatilloAgregado | null;
  columnsToDisplay: string[];
  columnsToDisplayWithExpand: any[];
  dataSource: MatTableDataSource<any>;

  platilloId = 0;
  contador = 0;
  atencionId = 0;
  total = 0;

  constructor(private pedidoService: PedidoService, private platilloService: PlatilloService,
    private dialog: MatDialog) {

    this.platillos = [];
    this.platillosAgregados = [];
    this.platillosAgregados$ = new Subject();
    this.dataSource = new MatTableDataSource();
    this.columnsToDisplay = ['nombre', 'subtotal'];
    this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    this.expandedElement = null;
  }

  ngOnInit(): void {
    this.platilloService.obtenerPlatillos().subscribe((data) => {
      this.platillos = data;
    }, (err) => {
      console.log({ err });
    }, () => {
      this.platillos?.sort((a, b) => a.platillo.localeCompare(b.platillo));
    });

    this.platillosAgregados$.subscribe(data => {
      this.platillosAgregados = data;
      this.dataSource.data = data;
      this.calcularTotal()
    });

    this.pedidoService.envioPedido.subscribe(b => {
      if (b) {
        this.pedidoService.platillosAgregadosFinal.emit(this.platillosAgregados);
      }
    });

    this.pedidoService.pedidoFinalizado.subscribe(b => {
      if(b) {
        this.platillosAgregados = [];
        this.platillosAgregados$.next(this.platillosAgregados);
        this.platillosAgregados$.asObservable();
      }
    })
  }

  agregarPlatillo() {
    let cantidad = document.querySelector<HTMLInputElement>("#cantidad2");
    let platillo: any = this.platillos?.find(p => p.codigo == this.platilloId);

    platillo.cantidad = cantidad?.value;
    platillo.subtotal = platillo.cantidad * platillo.precio;

    //Actualizar tabla

    const pedidoBuscado = this.platillosAgregados.find(p => p.codigo === platillo.codigo);

    if (pedidoBuscado === null || pedidoBuscado == undefined) {
      this.platillosAgregados.push(platillo);
      this.platillosAgregados$?.next(this.platillosAgregados);
      this.platillosAgregados$?.asObservable();
    } else {
      alert("Este platillo ya ha sido agregado");
    }

    cantidad!!.value = "";

    console.log(this.platillosAgregados);
    
  }

  calcularTotal() {
    this.total = 0;
    this.platillosAgregados.forEach(p => {
      this.total += p.subtotal;
    })
  }

  quitarPlatillo(id: any) {
    const platillo: any = this.platillos?.find(p => p.codigo == id);
    const index = this.platillos?.findIndex(p => p.codigo === platillo.codigo &&
      p.platillo === platillo.platillo && p.precio === platillo.precio &&
      p.cantidad === platillo.cantidad && p.subtotal === platillo.subtotal);
    const platillosActualizados = this.platillosAgregados.filter(p => p.codigo !== id);
    this.platillosAgregados$?.next(platillosActualizados);
    this.platillosAgregados$?.asObservable();
  }

  setearIdPlatillo(e: any) {
    this.platilloId = e.value;
  }
}