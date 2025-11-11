// Representa una moneda tradicional  (USD, MXN, EUR)
export interface Moneda {
    codigo: string     // Código identificador (por ejemplo: "USD")
    texto: string      // Nombre legible de la moneda (por ejemplo: "Dólar Estadounidense")
}

// Representa los datos seleccionados en el formulario para realizar una cotización
export interface Cotizar {
    moneda: string         // Código de la moneda seleccionada
    criptomoneda: string   // Código de la criptomoneda seleccionada
}

// Representa la información detallada devuelta por la API de cotización
export interface Cotizacion {
  IMAGEURL?: string          // URL de la imagen o icono de la criptomoneda
  PRICE?: string             // Precio actual de la criptomoneda
  HIGHDAY?: string           // Precio más alto del día
  LOWDAY?: string            // Precio más bajo del día
  CHANGEPCT24HOUR?: string   // Porcentaje de cambio en las últimas 24 horas
  LASTUPDATE?: string        // Fecha y hora de la última actualización
  [key: string]: any         // Permite propiedades adicionales no definidas explícitamente
}

// Representa la estructura de una criptomoneda obtenida desde la API
export interface Criptomoneda {
  CoinInfo: {
    Id: number        // Identificador único de la criptomoneda
    Name: string      // Código corto (por ejemplo: "BTC")
    FullName: string  // Nombre completo (por ejemplo: "Bitcoin")
  }
}


