# 1. Introducción a **Vue.js 3**

Esta sección es la base del curso.  
Aquí entenderás **qué es Vue**, cómo se usa en proyectos reales
y por qué la **Composition API + TypeScript** es la mejor forma de trabajar en Vue 3.



## 1. ¿Qué es Vue y qué significa que sea un framework *progresivo*?

**Vue.js** es un framework JavaScript para construir interfaces de usuario reactivas.

Se le llama **framework progresivo** porque:

✔ puedes empezar con algo pequeño  
✔ e ir agregando complejidad poco a poco

Por ejemplo, Vue puede usarse para:

1. Agregar interactividad a una página HTML simple
2. Crear dashboards internos
3. Desarrollar SPAs completas
4. Construir aplicaciones escalables con:

- routing
- comunicación entre componentes
- APIs
- stores (Pinia / Vuex)
- testing
- internacionalización
- SSR / SEO


### 🎯 Idea clave

> Vue no obliga a usar todo desde el inicio.  
> Empiezas sencillo y creces cuando el proyecto lo necesita.



### ⭐ Ventajas principales de Vue 3

- Sintaxis clara y fácil de aprender
- Reactividad sencilla pero poderosa
- Excelente soporte para **TypeScript**
- Gran rendimiento (gracias a Vite)
- Comunidad activa y documentación madura
- Ecosistema muy bien integrado


## 2. Requisitos y preparación del entorno

Antes de empezar, asegúrate de tener instalado:

### ✔ Requisitos mínimos recomendados

- **Node.js LTS** (recomendado 18 o superior)
- Administrador de paquetes:
  - npm (incluido en Node)
  - o `pnpm`
  - o `yarn`

- Editor recomendado: **Visual Studio Code**


### 🔌 Extensiones útiles para trabajar con Vue 3 + TypeScript

| Extensión | ¿Para qué sirve? |
|--------|----------------|
| **Volar** | Soporte oficial Vue 3 + TS |
| ESLint | Detecta errores y malas prácticas |
| Prettier | Formatea automáticamente el código |
| GitLens | Historial de cambios en Git |
| Tailwind IntelliSense | Autocompletado de clases (si usas Tailwind) |

> ⚠️ Importante  
> Si usas Vue 3 + TypeScript  
> **NO uses Vetur**  
> Volar es el sucesor recomendado.


## 3. Crear un proyecto Vue 3 + TypeScript (con Vite)

Vite es el bundler oficial recomendado en Vue 3
porque es:

- muy rápido 🔥
- ligero
- ideal para TypeScript


### 🧪 Crear proyecto con npm

```bash
npm create vite@latest mi-vue-app -- --template vue-ts
```

Alternativa:

```bash
npm init vite@latest mi-vue-app -- --template vue-ts
```


### 🟣 Con pnpm

```bash
pnpm create vite mi-vue-app --template vue-ts
```


### 🟡 Con yarn

```bash
yarn create vite mi-vue-app --template vue-ts
```


### 🚀 Iniciar el proyecto

```bash
cd mi-vue-app
npm install
npm run dev
```

El servidor iniciará típicamente en:

```
http://localhost:5173
```


## 4. Estructura básica del proyecto

Cuando generas un proyecto con `vue-ts`, verás algo como:

```
mi-vue-app/
├─ index.html
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
├─ src/
│  ├─ main.ts
│  ├─ App.vue
│  ├─ assets/
│  └─ components/
└─ public/
```

### Archivos importantes explicados

#### 📌 `src/main.ts`

Es el punto de entrada de la aplicación.

```ts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

Aquí Vue:

1️⃣ crea la aplicación  
2️⃣ carga el componente raíz  
3️⃣ lo monta en el DOM


#### 📌 `App.vue`

Es el componente principal de la aplicación.

Desde aquí normalmente:

- se importan layouts
- se cargan rutas
- se agregan contenedores globales


## 5. ¿Qué es una SFC (Single File Component)?

Una **SFC** es un archivo `.vue`
que combina:

✔ Template (HTML)  
✔ Script (JS/TS)  
✔ Styles (CSS)

Todo en un solo archivo.


### 🧩 Ejemplo básico

```vue
<template>
  <div>Hola desde template</div>
</template>

<script setup lang="ts">
  // lógica con Composition API
</script>

<style scoped>
  /* estilos locales */
</style>
```


### 🟢 Secciones explicadas

#### 🧱 `<template>`

Contiene el HTML reactivo donde se usan:

- variables
- props
- eventos
- directivas (`v-if`, `v-for`, etc.)


#### ⚙ `<script setup lang="ts">`

- Es la forma moderna de usar Composition API
- Es más simple y rápida que Options API
- Tiene mejor soporte para TypeScript


#### 🎨 `<style scoped>`

Hace que los estilos afecten
**solo a ese componente**

Evita colisiones entre estilos.


## 6. Primer componente práctico con `<script setup>`

Archivo:

```
src/components/Counter.vue
```

```vue
<template>
  <div class="counter">
    <h3>{{ title }}</h3>
    <p>Cuenta: {{ count }}</p>

    <button @click="decrement">-</button>
    <button @click="increment">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Props tipadas
const props = defineProps<{
  title?: string
}>()

// Estado reactivo
const count = ref(0)

// Métodos
function increment() {
  count.value++
}

function decrement() {
  count.value--
}
</script>

<style scoped>
.counter {
  padding: 1rem;
  border: 1px solid #ddd;
  display: inline-block;
}
button {
  margin: 0 .25rem;
}
</style>
```

### 🧠 Conceptos importantes

`ref(0)` crea un valor reactivo

- para leer: `count.value`
- para modificar: `count.value++`


`defineProps` permite:

- tipar props
- sin escribir `export default`
- sin usar `this`


En `<script setup>`:

> no necesitas return  
> todo lo declarado es accesible en el template


## 7. De HTML estático a componente Vue

### HTML normal

```html
<div class="card">
  <h2>Producto A</h2>
  <button>Comprar</button>
</div>
```

### Convertido a Vue (dinámico)

```vue
<template>
  <div class="card">
    <h2>{{ product.name }}</h2>
    <button @click="addToCart(product.id)">
      Comprar
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const product = reactive({
  id: 1,
  name: 'Producto A'
})

function addToCart(id: number) {
  console.log('añadir producto', id)
}
</script>
```


### 🔎 Explicación

- `{{ variable }}` → muestra valores en pantalla
- `@click="..."` → escucha eventos
- `reactive()` → crea objetos reactivos


## 8. Composition API vs Options API

### 🟤 Options API (forma clásica)

```ts
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
```


### 🟢 Composition API (forma moderna)

```ts
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
```


### 🎯 Diferencias clave

| Options API | Composition API |
|-----------|----------------|
| organiza por secciones | organiza por funcionalidad |
| buena para componentes pequeños | mejor para proyectos grandes |
| menos flexible | reusabilidad con composables |
| soporte TS limitado | excelente con TypeScript |


## 9. Conceptos clave aprendidos

✔ `ref()` → valores reactivos primitivos  
✔ `reactive()` → objetos / arrays reactivos  
✔ `computed()` → valores derivados  
✔ `watch()` → responder a cambios  
✔ `onMounted()` → ciclo de vida  
✔ `props / emits` → comunicación de componentes  
✔ `v-if / v-for / v-bind / v-on`


## 10. Buenas prácticas desde el inicio

- Usa **`<script setup lang="ts">`**
- Mantén los componentes **pequeños y enfocados**
- Si la lógica se repite → crear un **composable**
- Usa Volar + ESLint + Prettier
- Evita CSS global → usa `scoped`
