import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'mensaje-dialog',
    templateUrl: './mensaje-dialog.html',
    styleUrls: ['./mensaje-dialog.css']
})
export class MensajeDialog implements OnInit {

    constructor(public dialogRef: MatDialogRef<MensajeDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

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