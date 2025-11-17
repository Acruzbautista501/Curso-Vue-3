// Vista principal que muestra el listado de clientes
import Inicio from '@/views/ClientesView.vue'

// Funciones necesarias para crear el router y manejar el historial del navegador
import { createRouter, createWebHistory } from 'vue-router'

// Configuración del enrutador de la aplicación
const router = createRouter({
  // Modo de historial basado en la API del navegador (sin # en la URL)
  history: createWebHistory(import.meta.env.BASE_URL),

  // Definición de rutas disponibles en la app
  routes: [
    {
      // Ruta inicial (pantalla principal)
      path: '/',
      name: 'listado-clientes',
      component: Inicio,
      // Props estáticas enviadas al componente
      props: { titulo: 'Listado de Clientes' }
    },
    {
      // Vista para registrar un nuevo cliente
      path: '/agregar-cliente',
      name: 'agregar-cliente',
      // Carga diferida: el componente se importa solo cuando se visita la ruta
      component: () => import('../views/NuevoClienteView.vue'),
      props: { titulo: 'Agregar Cliente' }
    },
    {
      // Vista para editar un cliente específico usando su ID
      path: '/editar-cliente/:id',
      name: 'editar-cliente',
      // Carga diferida del componente
      component: () => import('../views/EditarClienteView.vue'),
      props: { titulo: 'Editar Cliente' }
    },
  ],
})

// Exportamos el router para usarlo en la app principal
export default router

