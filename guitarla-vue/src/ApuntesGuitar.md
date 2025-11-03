# 🛒 Función `agregarCarrito`

Esta función se encarga de **agregar una guitarra al carrito** dentro de una aplicación Vue 3.  
Crea un nuevo objeto basado en la guitarra seleccionada y lo añade al arreglo reactivo `carrito`.

---

## 💡 Ejemplo en TypeScript

```ts
// Función que agrega una guitarra al carrito
const agregarCarrito = (guitarra: guitar) => {
  // Crea un nuevo objeto 'producto' basado en la guitarra recibida
  // Se usa el operador spread (...) para copiar todas las propiedades del objeto 'guitarra'
  // Luego se añade o sobreescribe la propiedad 'cantidad' con el valor 1
  const producto: carrito = {
    ...guitarra,
    cantidad: 1 // asegura que el campo cantidad sea numérico y no undefined
  }

  // Agrega el nuevo producto al arreglo reactivo 'carrito'
  carrito.value.push(producto)

  // 3️⃣ Muestra en consola el contenido actualizado del carrito (para depuración)
  console.log(carrito.value)
}
