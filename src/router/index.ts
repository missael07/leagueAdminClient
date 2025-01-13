/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { isAuthenticated, isAuthorized } from '@/auth/validateAuth.service';
import type { Role } from '@/enums/globaEnums';
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'


const protectedRoutes = routes.map(route => {

  if(!route.path.includes('/signIn')){
    if(route.path.includes('/admin'))
      return {...route, meta: { requiresAuth: true, rolesRequired: [1] }};
    else
    return {...route, meta: { requiresAuth: true }};
  }
  return route;
})


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      component: () =>
        import(
          /* webpackChunkName: "sign in page" */ "@/pages/auth/SignIn.vue"
        ),
      meta: { layout: false }, // Indica que no usa layout
    },
    {
      path: '/unauthorized',
      component: () =>
        import(
          /* webpackChunkName: "unauthorized" */ "@/pages/errorPages/Unauthorized.vue"
        ),
      meta: { layout: false }, // Indica que no usa layout
    },
    {
      path: '/',
      component: () =>
        import(
          /* webpackChunkName: "admin layout" */ "@/layout/AdminLayout.vue"
        ),
      children: [
        ...protectedRoutes,
        {
          path: '',
          redirect: '/admin/team/teamlist', // Redirección automática a una ruta específica
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

router.beforeEach(async (to, from, next) => {
  const isUserAuthenticated = isAuthenticated(); // Verifica si el usuario está autenticado

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth && !isUserAuthenticated) {
    next({ path: '/signin' });  // Redirige al login si no está autenticado
  } else if (to.path.includes('signin') && isUserAuthenticated) {
    // Si la ruta es de login y el usuario ya está autenticado
    // Comprobamos si tiene permisos para acceder a la ruta después del login
    console.log(to.meta.rolesRequired)
    if (isAuthorized(to.meta.rolesRequired as Role[])) {
      next({ path: '/admin/team/teamlist' });  // Redirige al dashboard u otra página
    } else {
      next({ path: '/unauthorized' });  // Si no está autorizado, acceso denegado
    }
  } else {
    // Si la ruta no es para el login
    // Comprobamos si tiene el rol adecuado para acceder
    if (to.meta.rolesRequired && !isAuthorized(to.meta.rolesRequired as Role[])) {
      next({ path: '/unauthorized' });  // Si no está autorizado, acceso denegado
    } else {
      console.log(to.meta.rolesRequired)
      next();  // Si todo está bien, permite el acceso
    }
  }
});

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
