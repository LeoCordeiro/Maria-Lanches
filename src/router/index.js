import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import { empresa } from '@/config/contato'

const routes = [
  { path: '/', name: 'cardapio', component: Home, meta: { titulo: 'Cardápio' } },
  {
    path: '/pedido',
    name: 'pedido',
    component: () => import('@/pages/Pedido.vue'),
    meta: { titulo: 'Seu pedido' },
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: () => import('@/pages/Sobre.vue'),
    meta: { titulo: 'Sobre a casa' },
  },
  {
    path: '/contato',
    name: 'contato',
    component: () => import('@/pages/Contato.vue'),
    meta: { titulo: 'Contato e localização' },
  },
  {
    path: '/franquia',
    name: 'franquia',
    component: () => import('@/pages/Franquia.vue'),
    meta: { titulo: 'Seja um franqueado' },
  },
  // Legais em chunk próprio: só carrega quando alguém abre.
  {
    path: '/privacidade',
    name: 'privacidade',
    component: () => import('@/pages/legal/Privacidade.vue'),
    meta: { titulo: 'Política de privacidade' },
  },
  {
    path: '/termos',
    name: 'termos',
    component: () => import('@/pages/legal/Termos.vue'),
    meta: { titulo: 'Termos de uso' },
  },
  {
    path: '/politica-de-franquia',
    name: 'politica-franquia',
    component: () => import('@/pages/legal/PoliticaFranquia.vue'),
    meta: { titulo: 'Política de franquia' },
  },
  { path: '/:qualquer(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(para, de, salvo) {
    if (salvo) return salvo
    if (para.hash) return { el: para.hash, behavior: 'smooth', top: 84 }
    return { top: 0 }
  },
})

router.afterEach((para) => {
  const t = para.meta && para.meta.titulo
  document.title = t
    ? `${t} — ${empresa.nome}`
    : `${empresa.nome} — lanches na chapa e pedido pelo WhatsApp | São Paulo`
})

export default router
