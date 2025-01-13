<template>
    <div class="overlay-loader">
      <div class="fancy-loader">
        <div class="ring" />
        <div class="particles">
          <span v-for="n in 8" :key="n" class="particle" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  console.log('loader');
  </script>

<style scoped>
/* Overlay */
.overlay-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Semitransparente para efecto de overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Asegúrate de que el loader esté sobre todos los demás elementos */
}

/* Loader */
.fancy-loader {
  position: relative;
  width: 100px;
  height: 100px;
  animation: rotate 2s linear infinite;
}

.fancy-loader .ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 5px solid transparent;
  border-top: 5px solid #005BBB;
  border-radius: 50%;
  animation: spin 1.5s ease-in-out infinite;
}

.fancy-loader .particles {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fancy-loader .particle {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #ffffff; /* Asegúrate de que el color sea visible */
  border-radius: 50%;
  animation: pulsate 1.5s ease-in-out infinite; /* Ajusta la duración para suavidad */
  transform-origin: center;
}

.fancy-loader .particle:nth-child(1) { transform: rotate(0deg) translateX(40px); animation-delay: 0s; }
.fancy-loader .particle:nth-child(2) { transform: rotate(45deg) translateX(40px); animation-delay: 0.125s; }
.fancy-loader .particle:nth-child(3) { transform: rotate(90deg) translateX(40px); animation-delay: 0.25s; }
.fancy-loader .particle:nth-child(4) { transform: rotate(135deg) translateX(40px); animation-delay: 0.375s; }
.fancy-loader .particle:nth-child(5) { transform: rotate(180deg) translateX(40px); animation-delay: 0.5s; }
.fancy-loader .particle:nth-child(6) { transform: rotate(225deg) translateX(40px); animation-delay: 0.625s; }
.fancy-loader .particle:nth-child(7) { transform: rotate(270deg) translateX(40px); animation-delay: 0.75s; }
.fancy-loader .particle:nth-child(8) { transform: rotate(315deg) translateX(40px); animation-delay: 0.875s; }

/* Animaciones */
@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spin {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
}

@keyframes pulsate {
  0%, 100% { transform: scale(0.6); opacity: 0.6; }
  50% { transform: scale(1); opacity: 1; }
}
</style>