export interface PlatilloResponse {
    codigo?: number;
    platillo?: string;
    precio?: number;   
}

export interface PlatilloAgregado {
    codigo: number,
    platillo: string;
    precio: number;
    cantidad: number;
    subtotal: number;
}