export interface Planificador {
  presupuesto: number
  disponible: number
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