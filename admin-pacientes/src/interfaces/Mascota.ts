// Interfaz que define la estructura de un paciente (mascota)
export interface Mascota {
  id?: string | null       // ID único (puede ser null mientras se crea)
  nombre: string           // Nombre de la mascota
  propietario: string      // Nombre del propietario
  email: string            // Correo del propietario
  alta: string             // Fecha de alta (formato YYYY-MM-DD)
  sintomas: string         // Descripción de los síntomas
}

// Interfaz para las alertas de validación o confirmación
export interface Alertas {
  tipo: string             // Tipo de alerta: 'error' o 'exito'
  mensaje: string          // Texto mostrado en pantalla
}
