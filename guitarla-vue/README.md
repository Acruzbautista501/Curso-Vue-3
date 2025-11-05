# 🎸 GuitarLA – Tienda de Guitarras con Vue 3 + TypeScript

Aplicación web interactiva desarrollada con **Vue.js 3 (Composition API)** y **TypeScript**, que simula una tienda de guitarras donde los usuarios pueden explorar modelos, agregarlos a un carrito de compras, modificar cantidades y mantener el estado mediante **LocalStorage**.

---

## 🚀 Tecnologías Utilizadas

- ⚡ **Vue 3** con Composition API  
- 🧠 **TypeScript** para tipado estricto  
- 🔥 **Vite** como entorno de desarrollo  
- 💾 **LocalStorage** para persistencia del carrito  
- 💅 **Bootstrap 5** para estilos base  
- 🧩 **Arquitectura de componentes** modular y reutilizable

---

## 🧱 Estructura del Proyecto

```
guitarla-vue/
├── src/
│   ├── components/
│   │   ├── Guitarra.vue        # Tarjeta individual de guitarra
│   │   ├── Header.vue          # Encabezado con carrito y resumen
│   │   └── Footer.vue          # Pie de página
│   ├── data/
│   │   └── guitarra.ts         # Base de datos local de guitarras
│   ├── interfaces/
│   │   └── Guitar.ts           # Interfaces TypeScript: guitar y carrito
│   ├── App.vue                 # Componente principal (gestión global)
│   └── main.ts                 # Punto de entrada
├── public/
│   ├── img/                    # Imágenes de guitarras
│   └── logo.svg
└── package.json
```

---

## 🔄 Flujo de la Aplicación

### 1️⃣ Carga Inicial

- Al montar `App.vue`, se cargan los datos desde `db` (la base local de guitarras).  
- Se selecciona una guitarra por defecto (`db[3]`).  
- Si existe un carrito en **LocalStorage**, se restaura automáticamente.

```ts
onMounted(() => {
  guitarras.value = db
  guitarra.value = db[3] ?? { id: 0, nombre: '', imagen: '', descripcion: '', precio: 0 }
  const carritoStorage = localStorage.getItem('carrito')
  if (carritoStorage) carrito.value = JSON.parse(carritoStorage)
})
```

---

### 2️⃣ Agregar al Carrito

El evento `@agregar-carrito` se emite desde **Guitarra.vue** o **Header.vue** hacia `App.vue`.
Si el producto ya existe, se incrementa su cantidad; de lo contrario, se agrega con cantidad inicial = 1.

```ts
const agregarCarrito = (guitarra: guitar) => {
  const index = carrito.value.findIndex(p => p.id === guitarra.id)
  const existente = carrito.value[index]
  if (existente) existente.cantidad++
  else carrito.value.push({ ...guitarra, cantidad: 1 })
}
```

---

### 3️⃣ Modificar Cantidades

* **incrementarCantidad(id)** → aumenta la cantidad (máx. 5)
* **decrementarCantidad(id)** → reduce la cantidad (mín. 1)
* **eliminarProducto(id)** → elimina el producto del carrito
* **vaciarCarrito()** → limpia el carrito completo

El `Header.vue` emite estos eventos hacia el padre (`App.vue`).

---

### 4️⃣ Persistencia Automática

Cada vez que cambia el carrito, se actualiza **LocalStorage** automáticamente gracias a un `watch` profundo:

```ts
watch(carrito, guardarLocalStorage, { deep: true })
```

---

### 5️⃣ Interfaz y Componentes

#### 🧩 `Guitarra.vue`

* Recibe una guitarra (`props.guitarra`)
* Muestra imagen, descripción y precio
* Emite `@agregar-carrito` al hacer clic en el botón

#### 🧩 `Header.vue`

* Muestra el encabezado con logo, guitarra destacada y carrito interactivo
* Calcula el **total a pagar** con un `computed`:

  ```ts
  const totalPagar = computed(() =>
    props.carrito.reduce((total, p) => total + p.cantidad * p.precio, 0)
  )
  ```
* Permite modificar cantidades, eliminar productos o vaciar el carrito.

#### 🧩 `Footer.vue`

* Pie de página simple y responsivo con derechos reservados.

---

## 🧠 Interfaces (TypeScript)

```ts
// interfaces/Guitar.ts
export interface guitar {
  cantidad?: number
  id: number
  nombre: string
  imagen: string
  descripcion: string
  precio: number
}

export interface carrito extends guitar {
  cantidad: number
}
```

Estas interfaces garantizan un tipado seguro en todo el proyecto y evitan errores comunes al manipular datos del carrito o la base de guitarras.

---

## ⚙️ Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar compilado
npm run preview
```

---

## 💡 Buenas Prácticas Implementadas

✅ Tipado fuerte con TypeScript  
✅ Comunicación fluida entre componentes con `props` y `emit`  
✅ Observadores reactivos con `watch()`  
✅ Persistencia local sin dependencias externas  
✅ Código limpio, modular y escalable  
✅ Validaciones preventivas y límites en cantidades  

---

## 👨‍💻 Autor

**Aldair Cruz Bautista**  
📧 Desarrollador Frontend Vue 3 + TypeScript  
💼 Proyectos educativos y dashboards interactivos  

---

## 📜 Licencia

Este proyecto está bajo la **licencia MIT**.  
Puedes usarlo, modificarlo y distribuirlo libremente con atribución al autor original.
