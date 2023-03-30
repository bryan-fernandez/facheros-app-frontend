import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private app: AppComponent) { }

  ngOnInit(): void {
    this.agregarEventos();
  }

  agregarEventos() {
    let navbar = document.querySelector("#navbar");
    let boton_abrir_navbar = document.querySelector("#boton_abrir_navbar");
    let cocina = document.querySelector("#cocina");
    let presencial = document.querySelector("#presencial");
    let delivery = document.querySelector("#delivery");
    let cerrar_sesion = document.querySelector("#cerrar_sesion");

    boton_abrir_navbar?.addEventListener("click", () => {
      navbar?.classList.toggle("hide");
      presencial?.classList.add("cerrar_item");
      delivery?.classList.add("cerrar_item");
    });

    cocina?.addEventListener("click", () => {
      presencial?.classList.toggle("cerrar_item");
      delivery?.classList.toggle("cerrar_item");
    });

    cerrar_sesion?.addEventListener("click", () => {
      this.app.mostrarSpinner();
      setTimeout(()=>{
        this.app.cerrarSesion();
        this.router.navigateByUrl("/login");
        this.app.ocultarSpinner();
      }, 3000);
    });
  }
}
