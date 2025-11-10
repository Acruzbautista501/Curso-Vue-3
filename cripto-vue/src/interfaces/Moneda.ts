export interface Moneda {
    codigo: string
    texto: string
}

export interface Cotizar {
    moneda: string
    criptomoneda: string
}

export interface Criptomoneda {
  CoinInfo: {
    Id: number
    Name: string
    FullName: string
  }
}


