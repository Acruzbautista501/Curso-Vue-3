
# 3. Directivas en Vue 3

Las **directivas** son uno de los pilares fundamentales del sistema reactivo de Vue.

Son atributos especiales del template que le indican a Vue:

* cómo interpretar el DOM
* cuándo renderizar o destruir elementos
* cómo iterar colecciones
* cómo enlazar valores y eventos
* cómo mostrar u ocultar contenido dinámicamente

Todas comienzan con `v-` (o su shorthand como `:` y `@`).

Ejemplos reales de lo que controlan las directivas:

| Comportamiento              | Directiva        |
| --------------------------- | ---------------- |
| Mostrar u ocultar contenido | `v-if`, `v-show` |
| Repetir listas              | `v-for`          |
| Enlazar atributos y props   | `v-bind` / `:`   |
| Escuchar eventos            | `v-on` / `@`     |
| Sincronizar datos           | `v-model`        |

Las directivas son el puente entre:

> **el estado reactivo** y **la interfaz visible en pantalla**.


## 1. ¿Qué es realmente una directiva en Vue?

Una directiva:

* no es HTML nativo
* no es JavaScript directo
* es una instrucción para el motor de Vue

Vue observa las variables asociadas a esa directiva y:

* vuelve a renderizar el DOM
* solo cuando algo cambia
* sin recargar la página
* sin manipular el DOM manualmente

Ejemplo conceptual:

```vue
<div v-if="isLoggedIn">
  Bienvenido {{ user.name }}
</div>
```

Si `isLoggedIn` pasa de `false` → `true`:

* Vue crea el nodo en DOM
* dibuja nuevamente el contenido
* sincroniza la UI automáticamente

No tienes que:

❌ tocar el DOM
❌ refrescar la página
❌ llamar funciones extra

Eso es **reactividad declarativa**.


## 2. `v-if`, `v-else-if`, `v-else` — Renderizado condicional

Estas directivas **añaden o eliminan elementos del DOM**.

```vue
<template>
  <div v-if="isLoggedIn">
    Bienvenido {{ username }}
  </div>

  <div v-else>
    Por favor inicia sesión
  </div>
</template>
```

```ts
<script setup lang="ts">
import { ref } from 'vue'

const isLoggedIn = ref(false)
const username = ref("Aldair")
</script>
```

### 🔍 ¿Qué pasa internamente?

Cuando la condición cambia:

* Vue crea el elemento
* ejecuta `onMounted` de los hijos
* si deja de cumplirse → lo destruye
* ejecuta `onUnmounted`

Esto es importante en:

* componentes pesados
* vistas con listeners
* formularios complejos
* gráficos o tablas dinámicas


### 🧠 Cuándo usar `v-if`

Usa `v-if` cuando:

* el contenido no siempre es necesario
* el componente tiene costo de render
* el elemento contiene lógica pesada

Ejemplos reales:

* formularios de múltiples pasos
* pestañas con recursos cargados
* componentes que llaman API
* modales condicionales


## 3️⃣ `v-show` — Mostrar u ocultar sin destruir

`v-show` **no elimina el elemento del DOM**.

Solo cambia su propiedad CSS `display`.

```vue
<div v-show="visible">
  Este contenido sigue en el DOM
</div>
```

```ts
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(true)
</script>
```

### ⚖️ Diferencia clave con `v-if`

| Directiva | Qué hace                |
| --------- | ----------------------- |
| `v-if`    | crea y destruye nodos   |
| `v-show`  | alterna `display: none` |

---

### 🧠 Regla profesional

| Usa      | Cuando                      |
| -------- | --------------------------- |
| `v-if`   | el contenido casi no cambia |
| `v-show` | se alterna frecuentemente   |

Ejemplos típicos para `v-show`:

✔ pestañas
✔ dropdowns
✔ tooltips
✔ acordeones
✔ loaders

---

## 4️⃣ `v-for` — Iteración reactiva + `:key`

Sintaxis básica:

```vue
<li v-for="item in items" :key="item.id">
  {{ item.name }}
</li>
```

```ts
<script setup lang="ts">
import { reactive } from 'vue'

const items = reactive([
  { id: 1, name: "Vue" },
  { id: 2, name: "TypeScript" },
  { id: 3, name: "Bootstrap" }
])
</script>
```

---

### 🔑 ¿Por qué `:key` es obligatorio?

Porque Vue necesita identificar **qué elemento corresponde a qué dato**.

Si no usas key:

❌ animaciones se rompen
❌ input pierde foco
❌ eventos se reasignan mal

Clave profesional:

✔ usa `id` real
❌ evita índice del array

---

### Ejemplo con índice + destructuring

```vue
<li v-for="(item, index) in items" :key="item.id">
  {{ index + 1 }} — {{ item.name }}
</li>
```

---

## 5️⃣ `v-bind` (`:`) — Enlace dinámico de atributos

Permite enlazar valores reactivos a atributos.

```vue
<img :src="product.image" :alt="product.name" />
```

En componentes:

```vue
<MyButton :disabled="isLoading" />
```

Clases dinámicas:

```vue
<div :class="{ active: isActive, error: hasError }"></div>
```

Estilos dinámicos:

```vue
<div :style="{ color: textColor, fontSize: size + 'px' }"></div>
```

---

## 6️⃣ `v-on` (`@`) — Manejo de eventos

Inline handler:

```vue
<button @click="count++">+</button>
```

Método recomendado:

```vue
<button @click="increment">+</button>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>
```

Con `$event`:

```vue
<button @click="onClick($event)">Click</button>
```

---

## 7️⃣ `v-model` — Enlace bidireccional

Une estado + input automáticamente.

```vue
<input v-model="name" />

<p>Hola {{ name }}</p>
```

```ts
<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
</script>
```

Es equivalente a:

```html
: value="name"
@input="name = $event.target.value"
```

---

### 🧩 Tipos de campos

| Elemento        | Tipo resultante |
| --------------- | --------------- |
| text / textarea | string          |
| checkbox        | boolean         |
| radio           | string          |
| select          | string / array  |

---

### 🎛 Modificadores útiles

```vue
<input v-model.lazy="name" />
<input v-model.number="age" />
<input v-model.trim="email" />
```

---

### `v-model` en componentes personalizados

#### Hijo

```vue
<!-- ChildInput.vue -->
<input
  :value="modelValue"
  @input="$emit('update:modelValue', $event.target.value)"
>
```

```ts
<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits(['update:modelValue'])
</script>
```

#### Padre

```vue
<ChildInput v-model="name" />
```

---

## 8️⃣ Modificadores de eventos

```vue
<form @submit.prevent="onSubmit">
  <button @click.stop="openMenu">Abrir</button>
  <button @click.once="doOnce">Solo una vez</button>
</form>
```

✔ `.prevent` = `preventDefault()`
✔ `.stop` = detiene propagación
✔ `.once` = ejecuta solo la primera vez

Puedes encadenarlos:

```vue
@click.stop.prevent="handler"
```

---

## 9️⃣ Modificadores de teclado

```vue
<input @keyup.enter="submit" />

<textarea @keydown.esc="cancel" />
```

Muy usados en:

✔ formularios
✔ accesibilidad UX
✔ dashboards

---

## 🔟 Inline vs Method Handlers — Buenas prácticas

✔ Inline → expresiones simples
✔ Methods → lógica real / proyectos grandes
✔ composables → reutilización

Regla profesional:

> Si tiene condicionales, side effects, o más de una línea → mueve la lógica al script.

---

## 🎯 Conclusión clave

Las directivas permiten:

* UI declarativa
* estado reactivo sincronizado
* mejor mantenibilidad
* menos manipulación manual del DOM

