<template>
  <!-- Spinner compuesto por 6 puntos animados -->
  <div class="sk-chase">
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  </div>
</template>

<style scoped>
  /* Contenedor principal del spinner:
     gira continuamente para dar el efecto de persecución */
  .sk-chase {
    margin: 0 auto;
    width: 40px;
    height: 40px;
    position: relative;
    animation: sk-chase 2.5s infinite linear both;
  }

  /* Cada punto ocupa todo el tamaño del contenedor
     y se anima de forma independiente */
  .sk-chase-dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0; 
    animation: sk-chase-dot 2.0s infinite ease-in-out both; 
  }

  /* Punto visible: un pequeño círculo blanco */
  .sk-chase-dot:before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: #fff;
    border-radius: 100%;
    animation: sk-chase-dot-before 2.0s infinite ease-in-out both; 
  }

  /* Retrasos para desfasar la animación de cada punto */
  .sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
  .sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
  .sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
  .sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
  .sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
  .sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }

  /* Retrasos también aplicados a la animación interna del círculo */
  .sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
  .sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
  .sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
  .sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
  .sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
  .sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

  /* Animación del contenedor completo: gira 360° */
  @keyframes sk-chase {
    100% { transform: rotate(360deg); } 
  }

  /* Animación de cada punto girando sobre sí mismo */
  @keyframes sk-chase-dot {
    80%, 100% { transform: rotate(360deg); } 
  }

  /* Pulso del punto: reduce y regresa al tamaño original */
  @keyframes sk-chase-dot-before {
    50% {
      transform: scale(0.4); 
    } 
    100%, 0% {
      transform: scale(1.0); 
    } 
  }
</style>
