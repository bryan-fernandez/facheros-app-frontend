import { PlatilloAgregado } from "./PlatilloModels";

export class PedidoRequest {
    cliente?: string;
    nroOrden?: string;
    montoPedido?: number;
    atencion?: string;
    estado?: string;
    platillos?: any[];
}

export class PedidoDetalle {
    codigoPlatillo?: number;
    nroPedido?: number;
    cantidad?: number;
}

export interface Pedido {
    codigo?: number;
    cliente?: string;
    nroOrden?: string;
    montoPedido?: number;
    atencion?: string;
    estado?: string;
    fechaCreacion?: string;
    platillos?: PlatilloAgregado[]
}