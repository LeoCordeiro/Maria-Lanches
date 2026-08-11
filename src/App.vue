<template>
  <v-app>
    <SiteHeader />

    <v-main>
      <!-- Crossfade em CSS puro, não `<Transition>` do Vue.
           Com `mode="out-in"` a saída da página velha só avança dentro de um
           `requestAnimationFrame`; em aba sem produção de frame (janela
           ocluída, webview embutida) ela nunca termina e a rota nova NUNCA
           renderiza — dá para ver o `fade-transition-leave-from` preso no
           elemento. Aqui a troca de DOM é imediata e a animação é só enfeite:
           se o relógio de animação estiver parado, a página aparece igual. -->
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" class="pagina-entra" />
      </router-view>
    </v-main>

    <SiteFooter />

    <a
      class="fab fab--zap"
      :href="linkZap"
      target="_blank"
      rel="noopener"
      :aria-label="`Falar com a ${empresa.nome} no WhatsApp`"
    >
      <Icone nome="zap" :tamanho="28" />
    </a>

    <!-- Na página do pedido o carrinho flutuante é redundante e ainda tapa o
         botão de enviar, que fica no mesmo canto. -->
    <CarrinhoFab v-if="!naPaginaDoPedido" />
    <CarrinhoGaveta />
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import CarrinhoFab from '@/components/CarrinhoFab.vue'
import CarrinhoGaveta from '@/components/CarrinhoGaveta.vue'
import Icone from '@/components/Icone.vue'
import { empresa, waLink } from '@/config/contato'

const rota = useRoute()
const naPaginaDoPedido = computed(() => rota.name === 'pedido')
const linkZap = waLink(`Olá! Vim pelo site da ${empresa.nome} e queria tirar uma dúvida.`)
</script>

<style scoped>
.fab--zap {
  left: 18px;
  bottom: calc(18px + env(safe-area-inset-bottom, 0px));
  width: 58px;
  height: 58px;
  background: var(--verde-zap);
  color: var(--escuro);
}

@media (max-width: 430px) {
  .fab--zap {
    left: 14px;
    bottom: calc(14px + env(safe-area-inset-bottom, 0px));
    width: 52px;
    height: 52px;
  }
}
</style>
