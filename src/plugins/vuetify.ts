/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import defaults from './defaults'
// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults,
  theme: {
    defaultTheme: 'lightTheme', // El tema por defecto será el claro
    themes: {
      lightTheme: {
        dark: false,
        colors: {
          primary: '#005BBB', // Azul eléctrico
          secondary: '#00C853', // Verde lima
          accent: '#FFC107', // Amarillo dorado
          error: '#FF5722', // Rojo anaranjado
          warning: '#FF6E40', // Naranja cálido
          info: '#00BFA5', // Turquesa
          success: '#00C853', // Verde lima
          background: '#FFFFFF', // Fondo claro
          surface: '#F5F5F5', // Fondo de superficies como tarjetas
        },
        variables: {
          // Personaliza los colores de texto en el modo claro
          'body-color': 'rgba(0,91,187, 0.87)', // Texto principal
          'body-secondary-color': 'rgba(0, 0, 0, 0.6)', // Texto secundario
        }
      },
      darkTheme: {
        dark: true,
        colors: {
          primary: '#2979FF', // Azul más brillante para contraste en oscuro
          secondary: '#00E676', // Verde neón para resaltar
          accent: '#FFD600', // Amarillo intenso
          error: '#FF6E40', // Naranja rojizo
          warning: '#FFAB40', // Amarillo anaranjado
          info: '#18FFFF', // Turquesa brillante
          success: '#00E676', // Verde neón
          background: '#1E1E1E', // Fondo gris oscuro en lugar de negro
          surface: '#2C2C2C', // Fondo de superficie más suave
        },
        variables: {
          // Personaliza los colores de texto en el modo oscuro
          'body-color': 'rgba(41,121,255, 0.87)', // Texto principal
          'body-secondary-color': 'rgba(255, 255, 255, 0.6)', // Texto secundario
        }
      },
    },
  },
});
