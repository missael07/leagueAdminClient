<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1>401</h1>
      <p>Oops... ¡Parece que te perdiste!</p>
      <p>
        La página que buscas no existe o se movió a otro lugar.
      </p>
      <router-link :to="path" class="back-home">
        Volver al inicio
      </router-link>
    </div>
    <div class="not-found-animation">
      <!-- <img src="/404-illustration.svg" alt="Página no encontrada" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUserRole } from '@/auth/validateAuth.service';
import { Role } from '@/enums/globaEnums';
import { onMounted, ref } from 'vue';


const path = ref('');
onMounted(() => {
  path.value = redirectTo();
});
 
const redirectTo = () => {
  const userRole = getUserRole();
  let path = '';
  switch (+userRole) {
    case Role.admin:
      path = '/admin/team/teamlist';
      break;
    case Role.coach:
    case Role.manager:
      path = '/managers/team/teampage';
      break;
    default:
      path = '/unauthorized';
      break;
  }

  return path;
}
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  /* background: linear-gradient(135deg, #6d83f2, #8a50f2); */
  color: rgb(var(--v-theme-info));
  font-family: 'Arial', sans-serif;
  overflow: hidden;
  padding: 20px;
}

.not-found-content {
  z-index: 1;
}

h1 {
  font-size: 10rem;
  margin: 0;
  animation: pulse 1.5s infinite;
}

p {
  font-size: 1.2rem;
  margin: 10px 0;
}

.back-home {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: rgb(var(--v-theme-info));
  background: #fff;
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.back-home:hover {
  background: #f2f2f2;
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
}

.not-found-animation img {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
  animation: float 3s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}
</style>