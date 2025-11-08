export const formatearCantidad = (cantidad: number) => {
  return Number(cantidad).toLocaleString('es-US', {
      style: "currency",
      currency: "USD"
  })
}

export const generarId = () => {
  const fecha = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2)
  return random + fecha
}

export const formatearFecha = (fecha: number) => {
  const fechaNueva = new Date(fecha)
  const opciones: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }
  return fechaNueva.toLocaleDateString('es-Es', opciones)
}