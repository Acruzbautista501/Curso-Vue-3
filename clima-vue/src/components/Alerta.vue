<template>
    <!-- Contenedor de alerta.
         El texto se recibe mediante <slot>, permitiendo reutilizar el componente -->
    <div class="alerta">
        <slot></slot>
    </div>
</template>

<style>
    /* Estilo visual de la alerta */
    .alerta {
        text-align: center;          /* Centra el texto */
        margin-bottom: 2rem;         /* Espacio inferior */
        color: var(--blanco);        /* Color del texto */
        text-transform: uppercase;   /* Convierte el texto a mayúsculas */
        font-weight: 900;            /* Texto grueso */
        font-size: 1.8rem;           /* Tamaño grande */
        padding: .5rem;              /* Espaciado interno */
    }
</style>
