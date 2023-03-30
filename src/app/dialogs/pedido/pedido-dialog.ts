import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'pedido-dialog',
    templateUrl: './pedido-dialog.html',
    styleUrls: ['./pedido-dialog.css']
})
export class PedidoDialog implements OnInit {

    constructor(public dialogRef: MatDialogRef<PedidoDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    ngOnInit(): void {

    }

    cerrarDialog() {
        this.dialogRef.close();
    }
}

export interface DialogData{
    titulo: string,
    mensaje: string,
    icon: string
}