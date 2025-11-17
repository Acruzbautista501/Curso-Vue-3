// Interfaz base que define los campos comunes de un cliente
export interface ClienteBase {
  nombre: string      // Nombre del cliente
  apellido: string    // Apellido del cliente
  email: string       // Correo electrónico del cliente
  telefono: string    // Teléfono del cliente
  empresa: string     // Empresa a la que pertenece el cliente
  puesto: string      // Puesto o cargo del cliente dentro de la empresa
} 

// Interfaz para la creación de un cliente
export interface CrearCliente extends ClienteBase {
  estado: number      // Estado inicial del cliente (activo, inactivo, etc.)
}

// Interfaz completa de un cliente existente en la base de datos
export interface Cliente extends ClienteBase {
  id: string          // Identificador único del cliente
  estado: number      // Estado actual del cliente
}

// Interfaz para editar un cliente
export interface EditarCliente extends ClienteBase {
  estado?: number     // Estado opcional, se puede modificar o dejar igual
}
