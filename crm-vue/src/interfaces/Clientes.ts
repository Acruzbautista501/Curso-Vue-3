
export interface ClienteBase {
  nombre: string
  apellido: string
  email: string
  telefono: string
  empresa: string
  puesto: string
} 

export interface CrearCliente extends ClienteBase {
  estado: number
}

export interface Cliente extends ClienteBase {
  id: string
  estado: number
}

export interface EditarCliente extends ClienteBase {
  estado?: number
}

