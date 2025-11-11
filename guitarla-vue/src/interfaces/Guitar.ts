// Interfaz que define la estructura de un objeto "guitarra"
export interface guitar {
  cantidad?: number   // Propiedad opcional: usada solo si la guitarra está en el carrito
  id: number          // Identificador único de la guitarra
  nombre: string      // Nombre del modelo de la guitarra
  imagen: string      // Ruta o URL de la imagen del producto
  descripcion: string // Descripción detallada de la guitarra
  precio: number      // Precio de la guitarra
}

// Interfaz que representa un producto dentro del carrito de compras
// Hereda las propiedades de "guitar" y obliga a tener una cantidad
export interface carrito extends guitar {
  cantidad: number    // Cantidad obligatoria de unidades en el carrito
}
