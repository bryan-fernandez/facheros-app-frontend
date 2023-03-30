export interface PlatilloResponse {
    codigo?: number;
    platillo?: string;
    precio?: number;   
}

export interface PlatilloAgregado {
    id: number,
    nombre: string;
    precio: number;
    cantidad: number;
    subtotal: number;
}