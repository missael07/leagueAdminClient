/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () =>
        import(
          /* webpackChunkName: "create company contact" */ "@/layout/AdminLayout.vue"
        ),
      children: [
        ...routes,
        {
          path: '',
          redirect: 'team/teamlist', // Redirección automática a una ruta específica
        }
      ], // Las rutas automáticas se convierten en hijas del layout
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all para rutas no encontradas
      name: 'NotFound',
      component: () =>
        import(
          /* webpackChunkName: "create company contact" */ "@/pages/errorPages/NotFound.vue"
        ),
    },
  ],
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
