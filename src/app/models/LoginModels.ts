export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  tipoToken?: string;
  token?: string;
}