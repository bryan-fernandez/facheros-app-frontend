import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pedido } from 'src/app/models/PedidoModels';

@Component({
    selector: 'detalle-pedido-dialog',
    templateUrl: './detalle-pedido-dialog.html',
    styleUrls: ['./detalle-pedido-dialog.css']
})
export class DetallePedidoDialog implements OnInit {

    pedido: Pedido;
    cantidadPlatillos: number;

    constructor(@Inject(MAT_DIALOG_DATA) private data: Pedido) {
        this.pedido = data;
        this.cantidadPlatillos = 0;
    }

    ngOnInit(): void {
        this.obtenerCantidadPlatillos();
    }

    obtenerCantidadPlatillos() {
        this.pedido.platillos?.forEach(() => {
            this.cantidadPlatillos += 1;
        })
    }
}