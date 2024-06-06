import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      component: HomeView
    },
    {
      path: '/servicosatribuidos/agendados',
      name: 'servicosatribuidosAgendados',
      component: () => import('../views/ServicesViewAgendado.vue')
    },
    {
      path: '/servicosatribuidos/livres', 
      name: 'servicosatribuidosLivres',
      component: () => import('../views/ServicesViewLivre.vue')
    },
    {
      path: '/servico/:id', // Rota para a página de serviços atribuídos
      name: 'servico',
      component: () => import('../views/ServiceView.vue'),
      props: true
    },
    {
      path: '/servico/:id/suspender', 
      name: 'suspenderServico',
      component: () => import('../views/Suspender.vue'),
      props: true
    },
    {
      path: '/finalizarservico', // Rota para a página de serviços atribuídos
      name: 'finalizarservico',
      component: () => import('../views/ServiceAdd.vue'),
      props: true
    }
  ]
})

export default router
