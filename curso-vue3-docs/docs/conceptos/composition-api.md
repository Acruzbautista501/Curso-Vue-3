
# 2. Fundamentos del **Composition API**

Vue 3 introduce el **Composition API** como una alternativa más flexible al Options API.
Más que una nueva sintaxis, representa **una forma diferente de organizar la lógica**.

En lugar de ordenar el código por secciones:

- data
- methods
- computed
- lifecycle

el Composition API permite organizarlo por **funcionalidades reales del negocio**:

- autenticación
- tareas
- carrito
- filtros
- UI
- API

Lo cual:

- reduce el código repetido
- facilita la escalabilidad
- mejora la mantenibilidad
- permite extraer lógica reutilizable

Este capítulo no solo enseña cómo usarlo,
sino **cómo razonar correctamente con Composition API**.


## Objetivo de este módulo

Comprender:

- qué es el *state* en términos conceptuales
- cómo funciona la reactividad interna de Vue
- cuándo usar `ref()` y cuándo `reactive()`
- cómo derivar valores con `computed`
- cuándo elegir `watch` y cuándo `watchEffect`
- cómo y cuándo usar los hooks del ciclo de vida
- patrones reales de arquitectura en proyectos grandes
- malas prácticas y cómo evitarlas

Todos los ejemplos usan:

```vue
<script setup lang="ts">
````

porque es:

- más limpio
- más performante
- mejor integrado con TypeScript


## 1. ¿Qué es el *state* (estado) y por qué es tan importante?

El **state** es toda la información que puede cambiar durante la ejecución de una vista o componente,
y cuya modificación provoca **una actualización automática de la interfaz**.

No es solo “datos”.
Es el **modelo del sistema en memoria**.

Ejemplos reales:

| Tipo | Ejemplo |
|------|--------|
UI | menú abierto / cerrado  
Negocio | usuario autenticado  
Datos | lista de productos  
Proceso | loading / success / error  
Interacción | filtros activos  

Una frase clave en Vue:

```
No manipulamos el DOM.
Actualizamos el estado.
El DOM se actualiza solo.
```

Esto funciona gracias al **sistema de reactividad**.


## 🧩 Tipos de estado según su alcance

No todo debe vivir en el mismo lugar.

| Tipo | Dónde vive | Para qué se usa |
|------|---------|--------|
Estado local | dentro del componente | formularios, toggles |
Estado compartido | Pinia / composables | sesión, usuario |
Estado persistente | Backend / LocalStorage | carrito, preferencias |

Entender esto evita:

- componentes gigantes y difíciles de leer
- duplicación de lógica en varias vistas
- exceso de props y emits
- acoplamiento innecesario

En proyectos reales,
la ubicación del estado afecta:

- rendimiento
- escalabilidad
- estructura del proyecto


## 2. `ref()` vs `reactive()` — Diferencias conceptuales y prácticas

Ambos crean valores reactivos pero su intención es distinta.

La decisión NO es técnica.
Es **semántica**.

Nos preguntamos:

> ¿Este dato representa una entidad con varias propiedades?
o
> ¿Representa un valor único?


### `ref()` — Un valor único que cambia en el tiempo

Un `ref()` representa **un dato aislado**:

```ts
import { ref } from 'vue'

const counter = ref(0)

counter.value++
```

En el template NO usamos `.value`:

```
{{ counter }}
```

Vue lo unwrapea automáticamente.

Se recomienda para:

- valores primitivos
- flags booleanos
- campos individuales
- contadores
- índices
- estados simples

Ejemplos reales:

- `isOpen`
- `currentPage`
- `searchTerm`
- `loading`


### `reactive()` — Una entidad con propiedades relacionadas

`reactive()` modela **un objeto conceptual completo**.

```ts
import { reactive } from 'vue'

const state = reactive({
  loading: false,
  todos: [] as string[],
  filter: 'all'
})
```

Se usa cuando un conjunto de datos:

- pertenece a la misma entidad
- evoluciona junto
- tiene coherencia semántica

Casos reales:

- formularios
- recursos REST
- configuraciones
- objetos de dominio
- colecciones

> `reactive()` representa una estructura de datos coherente.

No solo "un grupo de variables".


### 🧪 Regla profesional usada en equipos grandes

| Usa | Cuando |
|----|------|
`ref()` | dato único o primitivo |
`reactive()` | entidad con varias propiedades |
Ambos | dominio complejo bien estructurado |

Si empieza pequeño → usa `ref()`  
Si crece → migra a `reactive()`

Evita el error contrario:

❌ iniciar todo como `reactive()` sin necesidad


## 3. Listas y colecciones con `reactive()` (caso real)

Cuando tenemos un conjunto de elementos,
lo vemos como **un modelo del dominio**.

```vue
<script setup lang="ts">
import { reactive } from 'vue'

type Task = {
  id: number
  text: string
  done: boolean
}

const state = reactive({
  tasks: [] as Task[],
  filter: 'all' as 'all' | 'done' | 'active'
})

function addTask(text: string) {
  state.tasks.push({
    id: Date.now(),
    text,
    done: false
  })
}

function toggleTask(id: number) {
  const t = state.tasks.find(t => t.id === id)
  if (t) t.done = !t.done
}
</script>

````

✔ Vue detecta:

- mutación de arrays
- edición interna
- eliminación
- asignación directa

Sin `setState`
Sin `.slice()`
Sin clonación de objetos


## 4. Formularios con `ref() + v-model`

Un input representa **un valor único**:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
</script>

<template>
  <input v-model="name" />
  <p>Hola {{ name }}</p>
</template>
````

Conceptualmente:

* en script → trabajamos con la variable
* en template → trabajamos con su “valor reactivo”

| Contexto | Forma correcta |
| -------- | -------------- |
| script   | `name.value`   |
| template | `name`         |


## 5. `computed()` — valores derivados del estado

Un `computed()` NO almacena datos.

Representa:

> un valor calculado a partir del estado actual

Y está **cacheado automáticamente**.

```ts
const remaining = computed(
  () => state.tasks.filter(t => !t.done).length
)

const doneTasks = computed(
  () => state.tasks.filter(t => t.done)
)
```

Se usa cuando:

* el valor depende de otros datos
* debe recalcularse automáticamente
* NO queremos duplicar lógica

Ejemplos reales:

* subtotales en carritos
* validación de formularios
* filtros de tablas
* ordenamientos
* conteos dinámicos


## 6. `watch()` vs `watchEffect()` — enfoque conceptual

Ambos observan cambios,
pero su propósito es diferente.


### `watch()` — reacciona a un cambio específico

Es ideal para efectos secundarios controlados:

```ts
watch(
  () => state.tasks,
  tasks => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },
  { deep: true }
)
```

Se usa cuando:

* sincronizamos datos externos
* persiste información
* llamamos APIs
* monitoreamos una variable concreta

`watch()` ≈ “escuchar una fuente de datos concreta”


### `watchEffect()` — depende de todo automáticamente

Detecta dependencias implícitas:

```ts
watchEffect(() => {
  console.log('Total tareas:', state.tasks.length)
})
```

Se ejecuta cuando:

* cualquier valor usado en el cuerpo cambia

Es útil para:

* logs
* depuración
* prototipado
* cálculos rápidos

No recomendado para lógica crítica
porque es **menos explícito**.


## 7. Hooks del ciclo de vida — desde una perspectiva práctica

Estos existen para:

* inicializar procesos
* crear subscripciones
* registrar listeners
* limpiar efectos

```ts
onMounted(() => {
  fetchData()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
```

Casos de uso comunes:

* WebSocket
* timers
* eventos globales
* mapas
* gráficas
* APIs realtime


## 8. Errores comunes (y explicación del por qué)

### ❌ Desestructurar rompe reactividad

```ts
const user = reactive({ name: 'Aldair' })
const { name } = user
```

Esto rompe la conexión con el sistema reactivo porque:

* la referencia deja de apuntar al proxy interno


### ✔ Solución: `toRefs()`

```ts
const { name } = toRefs(user)
```

Mantiene:

* conexión reactiva
* tracking de dependencias


Otros principios importantes:

✔ usa `computed` para valores derivados
❌ no uses `watch` si no hay side-effect
✔ siempre limpia listeners en `onUnmounted`
✔ extrae lógica a composables


## 9. Patrones reales de arquitectura

La lógica que pertenece al dominio del negocio
NO debería vivir en los componentes.

Debe moverse a:

```
useAuth.ts
useTasks.ts
useCart.ts
usePagination.ts
useFilters.ts
```

Beneficios:

* componentes pequeños y legibles
* separación por responsabilidades
* test unitarios más simples
* reducción de duplicación
* estado más consistente

Este es el verdadero poder del Composition API.

No es solo sintaxis.
Es **arquitectura limpia**.


## 10. Resumen conceptual del módulo

✔ `ref()`
Representa un valor único que cambia en el tiempo

✔ `reactive()`
Representa entidades estructuradas del dominio

✔ `computed()`
Valores derivados cacheados

✔ `watch()`
Efectos secundarios controlados

✔ `watchEffect()`
Observación automática

✔ `onMounted()`
Inicialización de procesos

✔ `onUnmounted()`
Limpieza obligatoria

✔ composables
Organizan el sistema por funcionalidades reales
