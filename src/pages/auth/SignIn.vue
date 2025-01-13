<template>
  <v-container fluid class="signin-page">
    <!-- Fondo oscuro con superposición -->
    <div class="signin-overlay">
      <div class="signin-card">
        <!-- Botón de cambio de tema -->
        <div class="d-flex justify-end">
          <v-icon :icon="theme.global.current.value.dark
            ? 'mdi-white-balance-sunny'
            : 'mdi-weather-night'
            " color="primary" @click="toggleTheme" />
        </div>

        <!-- Título -->
        <h2 class="signin-title">
          ¡Bienvenido de nuevo!
        </h2>
        <p class="signin-subtitle">
          Inicia sesión para gestionar tu temporada
        </p>

        <!-- Formulario -->
        <v-form v-model="valid" class="signin-form">
          <!-- Email -->
          <v-text-field v-model="auth.userName" label="Correo Electrónico" color="primary" dense outlined
            prepend-inner-icon="mdi-email" class="signin-input" :error-messages="getErrors(errors, 'userName')"
            autocomplete />

          <!-- Contraseña -->
          <v-text-field v-model="auth.password" label="Contraseña" type="password" color="primary" dense outlined
            prepend-inner-icon="mdi-lock" class="signin-input" :error-messages="getErrors(errors, 'password')"
            autocomplete />

          <!-- Botón Iniciar Sesión -->
          <v-btn color="primary" block rounded large class="signin-button" @click="submit">
            Iniciar Sesión
          </v-btn>
        </v-form>

        <!-- Link para registro o recuperar contraseña -->
        <div class="signin-links">
          <v-btn variant="text" color="primary" to="/forgot-password">
            ¿Olvidaste tu contraseña?
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import useHandleError from '@/composables/useHandleErrors';
import { ref } from 'vue';
import useSignIn from './composables/useSignIn';
import useToggleTheme from '@/composables/useToggleTheme';
import { useRouter } from 'vue-router';

const { theme, toggleTheme } = useToggleTheme();
const email = ref('');
const password = ref('');
const valid = ref(false);

const { getErrors, errors, resetErrors } = useHandleError();
const { signIn, auth } = useSignIn();
const router = useRouter();

const submit = async () => {
  resetErrors();
  const response = await signIn();
  if (response) {
    localStorage.setItem('authToken', response.token);
    router.push('/team/teamlist')
  }
  console.log('Iniciando sesión con:', { email: email.value, password: password.value });
};
</script>

<style scoped>
/* Fondo */
.signin-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgb(var(--v-theme-background)), rgb(var(--v-theme-primary)));
}

/* Superposición */
.signin-overlay {
  position: relative;
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  animation: fadeIn 1s ease-out;
}

/* Logo */
.signin-logo {
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
}

/* Títulos */
.signin-title {
  color: rgb(var(--v-theme-primary));
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
}

.signin-subtitle {
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-bottom: 1rem;
  font-size: 14px;
}

/* Formulario */
.signin-form {
  margin-top: 1rem;
}

.signin-input {
  margin-bottom: 1rem;
}


/* Links */
.signin-links {
  text-align: center;
  margin-top: 1rem;
}

.signin-links v-btn {
  font-size: 14px;
}

/* Animación */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>