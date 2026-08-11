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
