<template>
  <!-- Contenedor principal del spinner circular -->
  <div class="sk-circle">
    <!-- Cada div representa un punto animado del círculo -->
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
  </div>
</template>

<style scoped>
/* ===== Contenedor principal del spinner ===== */
.sk-circle {
  margin: 10px auto;
  margin-top: 50px;
  width: 40px;
  height: 40px;
  position: relative; /* Necesario para posicionar los hijos absolutamente */
}

/* ===== Estilos base para cada punto del spinner ===== */
.sk-circle .sk-child {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

/* ===== Círculo visible (el punto que rebota) ===== */
.sk-circle .sk-child:before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 15%;               /* Tamaño del punto */
  height: 15%;
  background-color: #333;   /* Color del punto */
  border-radius: 100%;      /* Lo hace circular */
  animation: sk-circleBounceDelay 1.2s infinite ease-in-out both; /* Animación de rebote */
}

/* ===== Posición de cada punto alrededor del círculo (cada 30°) ===== */
.sk-circle .sk-circle2  { transform: rotate(30deg); }
.sk-circle .sk-circle3  { transform: rotate(60deg); }
.sk-circle .sk-circle4  { transform: rotate(90deg); }
.sk-circle .sk-circle5  { transform: rotate(120deg); }
.sk-circle .sk-circle6  { transform: rotate(150deg); }
.sk-circle .sk-circle7  { transform: rotate(180deg); }
.sk-circle .sk-circle8  { transform: rotate(210deg); }
.sk-circle .sk-circle9  { transform: rotate(240deg); }
.sk-circle .sk-circle10 { transform: rotate(270deg); }
.sk-circle .sk-circle11 { transform: rotate(300deg); }
.sk-circle .sk-circle12 { transform: rotate(330deg); }

/* ===== Retraso progresivo en la animación de cada punto =====
   Esto genera el efecto de movimiento circular continuo */
.sk-circle .sk-circle2:before  { animation-delay: -1.1s; }
.sk-circle .sk-circle3:before  { animation-delay: -1.0s; }
.sk-circle .sk-circle4:before  { animation-delay: -0.9s; }
.sk-circle .sk-circle5:before  { animation-delay: -0.8s; }
.sk-circle .sk-circle6:before  { animation-delay: -0.7s; }
.sk-circle .sk-circle7:before  { animation-delay: -0.6s; }
.sk-circle .sk-circle8:before  { animation-delay: -0.5s; }
.sk-circle .sk-circle9:before  { animation-delay: -0.4s; }
.sk-circle .sk-circle10:before { animation-delay: -0.3s; }
.sk-circle .sk-circle11:before { animation-delay: -0.2s; }
.sk-circle .sk-circle12:before { animation-delay: -0.1s; }

/* ===== Animación de rebote de los puntos ===== */
@keyframes sk-circleBounceDelay {
  0%, 80%, 100% {
    transform: scale(0);  /* Puntos invisibles (sin tamaño) */
  } 
  40% {
    transform: scale(1);  /* Punto visible al máximo tamaño */
  }
}
</style>
