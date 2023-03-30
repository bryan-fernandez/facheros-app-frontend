import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { PedidoDialog } from 'src/app/dialogs/pedido/pedido-dialog';
import { PedidoDetalle, PedidoRequest } from 'src/app/models/PedidoModels';
import { PedidoService } from 'src/app/service/pedido.service';
import { PlatilloPedidoService } from 'src/app/service/platillo-pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PedidoComponent implements OnInit {

  pedidoForm = new FormGroup({
    cliente: new FormControl(""),
    nroMesa: new FormControl(""),
    direccion: new FormControl(""),
    tipoAtencion: new FormControl(""),
    celular: new FormControl("")
  });

  //Platillos
  platillosAgregados: any[];

  platilloId: number = 0;
  contador = 0;
  atencionId = 0;
  pedidoId = 0;

  envioPedido = false;

  TITULO_DIALOG_PEDIDO_VACIO = "Pedido Incompleto";
  MENSAJE_DIALOG_PEDIDO_VACIO = "Complete todos los campos para poder enviar el pedido";
  ICON_DIALOG_PEDIDO_VACIO = "arrow_back_ios";

  TITULO_DIALOG_PEDIDO_ENVIADO = "";
  MENSAJE_DIALOG_PEDIDO_ENVIADO = `Pedido ${this.TITULO_DIALOG_PEDIDO_ENVIADO} enviado a la cocina`;
  ICON_DIALOG_PEDIDO_ENVIADO = "check";

  constructor(public dialog: MatDialog, private router: Router,
    private app: AppComponent, private pedidoService: PedidoService, private platilloPedidoService: PlatilloPedidoService) {

    this.platillosAgregados = [];
  }

  ngOnInit(): void {
    if (!this.app.validarSesion()) this.router.navigateByUrl("/login");

    this.pedidoService.platillosAgregadosFinal.subscribe((data) => {
      this.platillosAgregados = data;

      if (this.envioPedido) {
        this.envioPedido = true;
      } else {
        this.pedidoService.guardarPedido(this.crearPedido()).subscribe((data) => {
          this.envioPedido = false;
          this.pedidoId = data.codigo;

          this.platilloPedidoService.guardarDetalles(this.crearDetallePedido()).subscribe((data) => {
            this.app.ocultarSpinner();
            this.abrirDialog(this.TITULO_DIALOG_PEDIDO_ENVIADO, this.MENSAJE_DIALOG_PEDIDO_ENVIADO, this.ICON_DIALOG_PEDIDO_ENVIADO);
            this.limpiarTodo();
          }, (err) => console.error(err))
        });
      }
    }, (err) => {
      console.log(err);
    })
  }

  crearPedido(): PedidoRequest {
    const pedidoReq: PedidoRequest = new PedidoRequest();

    switch (this.atencionId) {
      case 1: {
        pedidoReq.cliente = "";
        pedidoReq.nroOrden = `P${parseInt(localStorage.getItem("nro_orden")!!) + 1}-M${this.pedidoForm.value.nroMesa}`;
        pedidoReq.montoPedido = this.calcularTotal();
        pedidoReq.atencion = "PRESENCIAL";
        pedidoReq.estado = "PENDIENTE";
        pedidoReq.platillos = [];
        break;
      }
      case 2: {
        pedidoReq.cliente = this.pedidoForm.value.cliente!!;
        pedidoReq.nroOrden = `D${parseInt(localStorage.getItem("nro_orden")!!) + 1}`;
        pedidoReq.montoPedido = this.calcularTotal();
        pedidoReq.atencion = "DELIVERY";
        pedidoReq.estado = "PENDIENTE";
        pedidoReq.platillos = [];
        break;
      }
    }

    this.TITULO_DIALOG_PEDIDO_ENVIADO = `Pedido ${pedidoReq.nroOrden!!}`;

    localStorage.setItem("nro_orden", `${parseInt(localStorage.getItem("nro_orden")!!) + 1}`);

    return pedidoReq;
  }

  crearDetallePedido(): PedidoDetalle[] {
    const detalle: PedidoDetalle[] = [];

    this.platillosAgregados.forEach(p => {
      const d = new PedidoDetalle();
      d.cantidad = p.cantidad;
      d.codigoPlatillo = p.codigo;
      d.nroPedido = this.pedidoId;
      detalle.push(d);
    })

    return detalle;
  }

  calcularTotal(): number {
    let montoTotal = 0;
    this.platillosAgregados.forEach(p => {
      montoTotal += p.subtotal;
    })

    return montoTotal;
  }

  enviarPedido() {
    //SIEMPRE ENVIAR EL SUBMIT A PESAR DE LAS RESTRICCION REQUIRED
    switch (this.atencionId) {
      case 1: {
        const nroMesa = this.pedidoForm.value.nroMesa;
        if (nroMesa == "") {
          this.mostrarErrores([this.pedidoForm.controls.nroMesa]);
          this.abrirDialog(this.TITULO_DIALOG_PEDIDO_VACIO, this.MENSAJE_DIALOG_PEDIDO_VACIO, this.ICON_DIALOG_PEDIDO_VACIO);
        } else {
          this.emitirEnvioPedido();
        }

        break;
      }
      case 2: {
        const cliente = this.pedidoForm.value.cliente;
        const direccion = this.pedidoForm.value.direccion;
        const celular = this.pedidoForm.value.celular;

        if (cliente == "" && direccion == "" && celular == "") {
          this.mostrarErrores([this.pedidoForm.controls.cliente,
          this.pedidoForm.controls.direccion, this.pedidoForm.controls.celular]);
          this.abrirDialog(this.TITULO_DIALOG_PEDIDO_VACIO, this.MENSAJE_DIALOG_PEDIDO_VACIO, this.ICON_DIALOG_PEDIDO_VACIO);
        } else {
          this.emitirEnvioPedido();
        }

        break;
      }
      default: {
        this.mostrarErrores([this.pedidoForm.controls.cliente,
        this.pedidoForm.controls.direccion, this.pedidoForm.controls.celular,
        this.pedidoForm.controls.tipoAtencion, this.pedidoForm.controls.nroMesa]);

        this.abrirDialog(this.TITULO_DIALOG_PEDIDO_VACIO, this.MENSAJE_DIALOG_PEDIDO_VACIO, this.ICON_DIALOG_PEDIDO_VACIO);
        break;
      }
    }
  }

  emitirEnvioPedido() {
    this.app.mostrarSpinner();

    this.pedidoService.envioPedido.next(true);
    this.pedidoService.envioPedido.asObservable();
  }

  abrirDialog(titulo: string, mensaje: string, icon: string) {
    this.dialog.open(PedidoDialog, {
      data: {
        titulo: titulo,
        mensaje: mensaje,
        icon: icon
      }
    });
  }

  mostrarErrores(campos: FormControl[]) {
    campos.forEach(c => {
      c.setErrors(["required"]);
    })
  }

  limpiarErrores(campos: FormControl[]) {
    campos.forEach(c => {
      c.setErrors(null);
    })
  }

  limpiarTodo(){
    this.pedidoForm.reset();
    this.pedidoService.pedidoFinalizado.next(true);
  }

  limpiarFormulario() {
    const controles: HTMLElement[] = [document.querySelector("#cliente_control")!!,
    document.querySelector("#direccion_control")!!,
    document.querySelector("#celular_control")!!,
    document.querySelector("#nroMesa_control")!!]

    controles.forEach(e => {
      e.classList.remove("ocultar_caja");
    })

    this.pedidoForm.reset();
  }

  atencion(e: any) {
    this.limpiarErrores([this.pedidoForm.controls.cliente,
    this.pedidoForm.controls.direccion, this.pedidoForm.controls.celular,
    this.pedidoForm.controls.tipoAtencion, this.pedidoForm.controls.nroMesa]);

    const cliente_control = document.querySelector("#cliente_control");
    const direccion_control = document.querySelector("#direccion_control");
    const celular_control = document.querySelector("#celular_control");
    const nroMesa_control = document.querySelector("#nroMesa_control");

    if (e.value == 1) {
      this.atencionId = 1;
      //TODO: (PRESENCIAL)
      cliente_control?.classList.add("ocultar_caja");
      direccion_control?.classList.add("ocultar_caja");
      celular_control?.classList.add("ocultar_caja");
      nroMesa_control?.classList.remove("ocultar_caja");

    } else {
      this.atencionId = 2;
      //TODO: (DELIVERY)
      cliente_control?.classList.remove("ocultar_caja");
      direccion_control?.classList.remove("ocultar_caja");
      celular_control?.classList.remove("ocultar_caja");
      nroMesa_control?.classList.add("ocultar_caja");
    }
  }
}