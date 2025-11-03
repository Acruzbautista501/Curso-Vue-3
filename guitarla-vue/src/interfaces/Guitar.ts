export interface guitar {
  cantidad?: number
  id: number
  nombre: string
  imagen: string
  descripcion: string
  precio: number
}

export interface carrito extends guitar {
  cantidad: number
}
