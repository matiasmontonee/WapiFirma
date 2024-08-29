import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginView.vue';
import Purchase from '../views/PurchaseView.vue';
import Requests from '../views/RequestsView.vue';
import CreateDocument from '../views/CreateDocumentView.vue';
import Reports from '../views/ReportsView.vue';
import Contacts from '../views/ContactsView.vue';
import Profile from '../views/ProfileView.vue';
import NotFound from '../views/NotFoundView.vue'; 

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/purchase',
    component: Purchase,
    meta: { requiresAuth: true }
  },
  {
    path: '/requests',
    component: Requests,
    meta: { requiresAuth: true }
  },
  {
    path: '/newdocument',
    component: CreateDocument,
    meta: { requiresAuth: true }
  },
  {
    path: '/reports',
    component: Reports,
    meta: { requiresAuth: true }
  },
  {
    path: '/contacts',
    component: Contacts,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)', 
    component: NotFound 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user'); // Comprueba si el usuario está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Si no está autenticado, redirige al inicio de sesión
  } else {
    next(); // Si está autenticado o la ruta no requiere autenticación, continúa normalmente
  }
});

export default router;