<template>
  <!-- Contenedor de la alerta -->
  <!-- El contenido se recibe mediante <slot>, lo que permite reutilizar este componente -->
  <div class="alerta">
      <slot></slot> <!-- Inserta el texto o contenido pasado desde el componente padre -->
  </div>
</template>

<style>
  /* ===== Estilos del mensaje de alerta ===== */
  .alerta {
    text-align: center;           /* Centra el texto horizontalmente */
    margin-bottom: 2rem;          /* Espacio inferior entre elementos */
    color: var(--blanco);         /* Texto blanco (usa variable CSS global) */
    background-color: rgb(174, 0, 0); /* Fondo rojo para destacar el mensaje */
    text-transform: uppercase;    /* Convierte el texto a mayúsculas */
    font-weight: 700;             /* Texto en negritas */
    font-size: 1.4rem;            /* Tamaño de fuente moderado */
    padding: .5rem;               /* Espaciado interno alrededor del texto */
  }
</style>
