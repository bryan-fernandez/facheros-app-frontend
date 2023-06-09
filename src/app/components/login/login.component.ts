import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { MensajeDialog } from 'src/app/dialogs/mensaje/mensaje-dialog';
import { LoginRequest } from 'src/app/models/LoginModels';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: Boolean = false;
  isLoading$: Subject<Boolean> = new Subject();

  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  hide = true;

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(10)])
  });

  constructor(private router: Router, private app: AppComponent, private loginService: LoginService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.app.cerrarSesion();
  }

  ngOnDestroy(): void {
    this.loginForm.reset
  }

  login() {
    if (this.loginForm.valid) {
      this.app.mostrarSpinner();

      let loginRequest: LoginRequest = {
        username: this.loginForm.value.username!!,
        password: this.loginForm.value.password!!
      };

      this.loginService.login(loginRequest).subscribe((data) => {
        localStorage.setItem('acctkn', data.token!!);
        this.app.ocultarSpinner();
        this.router.navigateByUrl("/");
      }, (err) => {
        console.log(err);
        this.app.ocultarSpinner();
        this.dialog.open(MensajeDialog, {
          data: errorLogin
        })
      })

    }
  }

  obtenerUsuarioError() {
    return '*Campo obligatorio*';
  }

  obtenerPasswordError() {
    if (this.loginForm.controls.password.hasError("required")) {
      return '*Campo Obligatorio*'
    }

    return this.loginForm.controls.password.hasError("minlength") ? `${this.loginForm.value.password?.length}/10` : ''
  }
}

const errorLogin = {
  titulo: "Credenciales Incorrectas",
  mensaje: "Usuario y/o contraseña incorrecto",
  icon: "arrow_back"
}