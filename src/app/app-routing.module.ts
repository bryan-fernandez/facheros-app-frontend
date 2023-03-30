import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocinaDeliveryComponent } from './components/cocina-delivery/cocina-delivery.component';
import { CocinaPresencialComponent } from './components/cocina-presencial/cocina-presencial.component';
import { HistorialPedidoComponent } from './components/historial-pedido/historial-pedido.component';
import { LoginComponent } from './components/login/login.component';
import { PedidoComponent } from './components/pedido/pedido.component';

const routes: Routes = [
  { path: "", component: PedidoComponent },
  { path: "login", component: LoginComponent },
  { path: "pedido", component: PedidoComponent },
  { path: "cocina-presencial", component: CocinaPresencialComponent },
  { path: "cocina-delivery", component: CocinaDeliveryComponent },
  { path: "historial-pedidos", component: HistorialPedidoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
