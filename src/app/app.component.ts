import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'facheros-app';

  isLoading: Boolean = false;
  isLoading$: Subject<Boolean> = new Subject();

  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.renovarNroOrden();
    
    this.isLoading$.subscribe((data) => {
      let spinner_container = document.querySelector("#spinner_container");
      spinner_container?.classList.toggle("ocultar_spinner");
    })
  }

  mostrarSpinner() {
    this.isLoading = true;
    this.isLoading$.next(this.isLoading);
    this.isLoading$.asObservable();
  }

  ocultarSpinner() {
    this.isLoading = false;
    this.isLoading$.next(this.isLoading);
    this.isLoading$.asObservable();
  }

  validarSesion(): Boolean {
    const acctkn = localStorage.getItem("acctkn")

    if (acctkn == null || acctkn == undefined) {
      return false;
    }

    return true;
  }

  cerrarSesion() {
    localStorage.clear();
  }

  renovarNroOrden() {
    const hoy = new Date();
    const fecha_expiracion = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1, 0, 0, 0);

    const nro_orden = localStorage.getItem("nro_orden");

    if (nro_orden == null) {
      localStorage.setItem("nro_orden", "0");
      localStorage.setItem("exp_orden", fecha_expiracion.getTime() + "");
    } else {
      const exp_fecha = new Date(parseInt(localStorage.getItem("exp_orden")!!));
      if (hoy >= exp_fecha) {
        localStorage.removeItem("nro_orden");
        localStorage.removeItem("exp_orden");
      }
    }
  }
}
