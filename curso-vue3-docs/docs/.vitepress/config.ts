import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Curso Vue 3 + TypeScript',
  description: 'Documentación educativa basada en proyectos del mundo real',
  lang: 'es-MX',

  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Conceptos', link: '/conceptos/introduccion-vue-3' },
      { text: 'Guías', link: '/guias/arquitectura' },
      { text: 'Proyectos', link: '/proyectos/proyecto-01-login' }
    ],

    sidebar: {
      '/conceptos/': [
        {
          text: 'Conceptos Fundamentales',
          items: [
            { text: 'Introducción a Vue 3', link: '/conceptos/introduccion-vue-3' },
            { text: 'Fundamentos del Composition API', link: '/conceptos/composition-api.md' },
            { text: 'Directivas en Vue 3', link: '/conceptos/directivas-vue' }
          ]
        }
      ],

      '/guias/': [
        {
          text: 'Guías Técnicas',
          items: [
            { text: 'Arquitectura del Proyecto', link: '/guias/arquitectura' },
            { text: 'Router + Rutas Protegidas', link: '/guias/router' },
            { text: 'Pinia y Stores', link: '/guias/pinia' }
          ]
        }
      ],

      '/proyectos/': [
        {
          text: 'Proyectos del Mundo Real',
          items: [
            { text: 'Proyecto 01 — Login con Auth', link: '/proyectos/proyecto-01-login' },
            { text: 'Proyecto 02 — CRUD con API', link: '/proyectos/proyecto-02-crud' },
            { text: 'Proyecto 03 — Dashboard + Roles', link: '/proyectos/proyecto-03-dashboard' }
          ]
        }
      ]
    },
    docFooter: {
      prev: 'Página anterior',
      next: 'Página siguiente'
    },
    outline: {
      label: 'En esta página'
    }
  }
})
