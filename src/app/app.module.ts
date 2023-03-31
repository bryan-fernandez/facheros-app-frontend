import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PedidoComponent } from './components/pedido/pedido.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MensajeDialog } from './dialogs/mensaje/mensaje-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { HistorialPedidoComponent } from './components/historial-pedido/historial-pedido.component';
import { CocinaDeliveryComponent } from './components/cocina-delivery/cocina-delivery.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { PlatilloTableComponent } from './components/platillo-table/platillo-table.component';
import { CocinaPresencialComponent } from './components/cocina-presencial/cocina-presencial.component';
import { CocinaTableComponent } from './components/cocina-table/cocina-table.component';
import { DetallePedidoDialog } from './dialogs/detalle-pedido/detalle-pedido-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PedidoComponent,
    MensajeDialog,
    HistorialPedidoComponent,
    CocinaDeliveryComponent,
    PlatilloTableComponent,
    CocinaPresencialComponent,
    CocinaTableComponent,
    DetallePedidoDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    HttpClientModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }