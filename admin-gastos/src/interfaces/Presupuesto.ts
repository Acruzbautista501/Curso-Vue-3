export interface Planificador {
  presupuesto: number
  disponible: number
  gastado: number
  filtro: string
}

export interface Modals {
    mostrar: boolean
    animar: boolean
}

export interface Gastos {
  id: number | string
  nombre : string
  cantidad: string | number
  categoria: string
  fecha: number
}