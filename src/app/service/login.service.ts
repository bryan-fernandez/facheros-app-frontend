import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, TokenResponse } from '../models/LoginModels';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = "/facheros/generarToken"

  constructor(private httpClient: HttpClient) { }

  login(login: LoginRequest): Observable<TokenResponse> {
    return this.httpClient.post(this.baseUrl, login);
  }
}
