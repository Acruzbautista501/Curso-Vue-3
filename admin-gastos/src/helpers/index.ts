export const formatearCantidad = (cantidad: number) => {
    return Number(cantidad).toLocaleString('es-US', {
        style: "currency",
        currency: "USD"
    })
}