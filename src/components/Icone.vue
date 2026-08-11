<!--
  Ícones em SVG inline.

  De propósito NÃO usamos @mdi/font: seriam ~300 KB de fonte + CSS para sete
  desenhos, e nome de ícone errado no MDI falha calado (não renderiza nada e
  não avisa). Aqui, ícone inexistente não desenha nada e o `nome` fica visível
  no código.
-->
<template>
  <svg
    class="icone"
    :width="tamanho"
    :height="tamanho"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="preenchido ? 'none' : 'currentColor'"
    :fill-rule="preenchido ? 'evenodd' : undefined"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, i) in desenho" :key="i" :d="d" :fill="preenchido ? 'currentColor' : 'none'" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  nome: { type: String, required: true },
  tamanho: { type: [Number, String], default: 24 },
  preenchido: { type: Boolean, default: false },
})

const ICONES = {
  sacola: ['M6 8h12l1.1 12.2H4.9L6 8z', 'M9 8.6V6.4a3 3 0 0 1 6 0v2.2'],
  mais: ['M12 5v14', 'M5 12h14'],
  menos: ['M5 12h14'],
  lixeira: ['M5 7h14', 'M9.5 7V4.8h5V7', 'M7.2 7l.9 13h7.8l.9-13', 'M10.5 10.5v6', 'M13.5 10.5v6'],
  relogio: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M12 7.2V12l3.4 2'],
  pino: ['M12 21.2s6.8-6.4 6.8-11.2a6.8 6.8 0 1 0-13.6 0C5.2 14.8 12 21.2 12 21.2z', 'M12 12.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8z'],
  zap: [
    'M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.6 20.4l1.4-4.3a8.4 8.4 0 1 1 15.5-4.4z',
    'M9.4 9c.3-.6 1-.8 1.4-.3l.8.9c.3.3.3.7 0 1-.3.4-.2.8 0 1.1.5.6 1 1 1.6 1.3.4.2.8.1 1-.2.3-.3.7-.3 1 0l.9.9c.4.4.2 1.1-.4 1.3-1.7.7-3.6-.1-5-1.5-1.4-1.4-2.1-3.3-1.3-4.5z',
  ],
  fechar: ['M6 6l12 12', 'M18 6L6 18'],
  seta: ['M9 5l7 7-7 7'],
  check: ['M5 12.6l4.6 4.4L19 7'],
  aviso: ['M12 3.6l9 15.8H3l9-15.8z', 'M12 9.6v4.2', 'M12 16.6v.2'],
  moto: ['M6 18.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2z', 'M18.4 18.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2z', 'M8.6 15.9h7.2l-3-7.4h-2.4', 'M13.4 8.5h4l1.6 5'],
  loja: ['M4 9.6L5.6 5h12.8L20 9.6', 'M4 9.6a2.4 2.4 0 0 0 4 1.7 2.4 2.4 0 0 0 4 0 2.4 2.4 0 0 0 4 0 2.4 2.4 0 0 0 4-1.7', 'M5.6 12.4V20h12.8v-7.6'],
}

const desenho = computed(() => ICONES[props.nome] || [])
</script>

<style scoped>
.icone {
  display: block;
  flex: 0 0 auto;
}
</style>
