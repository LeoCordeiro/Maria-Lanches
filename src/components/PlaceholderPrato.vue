<!--
  Placeholder honesto de foto de prato.

  Enquanto não existir foto REAL do lanche, o card mostra a silhueta da
  categoria + o selo "foto em breve" — nunca a foto de outro lanche. O cliente
  recebe o que está na foto; foto que não corresponde ao item é propaganda
  enganosa.

  Nada de inicial gigante aqui: seis dos oito lanches começam com "X" e a
  grade inteira virava uma parede de X, que lê como imagem quebrada.

  Quando a foto real entrar em `public/cardapio/<id>.webp` e for apontada no
  `cardapio.js`, este componente some sozinho.
-->
<template>
  <div class="placa" :class="`placa--${cor}`" role="img" :aria-label="`${nome} — foto em breve`">
    <svg class="placa__silhueta" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path v-for="(d, i) in silhueta" :key="i" :d="d" fill="currentColor" />
    </svg>

    <!-- Sem repetir o nome do prato: ele já está logo abaixo, no card. -->
    <span class="placa__aviso">foto em breve</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  nome: { type: String, required: true },
  categoria: { type: String, default: 'lanches' },
})

const CORES = {
  lanches: 'vermelho',
  porcoes: 'laranja',
  combos: 'amarelo',
  bebidas: 'creme',
  sobremesas: 'marrom',
}

const SILHUETAS = {
  // hambúrguer: pão de cima, salada, carne, pão de baixo
  lanches: [
    'M2.6 10.4c0-4.3 4.2-7.6 9.4-7.6s9.4 3.3 9.4 7.6z',
    'M2.4 11.4h19.2c.5 0 .8.4.8.9s-.4.9-.9.9H2.5c-.5 0-.9-.4-.9-.9s.3-.9.8-.9z',
    'M3.4 14.6h17.2c.7 0 1.2.6 1.2 1.3s-.6 1.3-1.3 1.3H3.5c-.7 0-1.3-.6-1.3-1.3s.5-1.3 1.2-1.3z',
    'M2.6 18.3h18.8c0 1.7-1.4 3-3.1 3H5.7c-1.7 0-3.1-1.3-3.1-3z',
  ],
  // batata frita: pacote + palitos
  porcoes: [
    'M8.4 2.6h2.2l.7 6.6H8.9zM11.8 3.4h2.2l-.3 5.8h-2.2zM15.1 4.4l2.1.6-1.6 4.4-2-.5z',
    'M5.6 9.4h12.8l-1.5 10.4c-.1 1-1 1.7-2 1.7H9.1c-1 0-1.9-.7-2-1.7z',
  ],
  // combo: copo + hambúrguer
  combos: [
    'M2.4 7.2h8.4l-1 11.6c-.1 1.2-1.1 2.1-2.3 2.1H5.7c-1.2 0-2.2-.9-2.3-2.1z',
    'M1.8 4.9h9.6c.5 0 .9.4.9 1s-.4 1-.9 1H1.8c-.5 0-.9-.4-.9-1s.4-1 .9-1z',
    'M14.2 12.6c0-2.7 2.1-4.6 4.8-4.6s4.8 1.9 4.8 4.6z',
    'M14 13.7h9.8c.4 0 .7.3.7.8s-.3.8-.7.8H14c-.4 0-.7-.4-.7-.8s.3-.8.7-.8z',
    'M14.2 16.6h9.4c0 1.6-1.3 2.8-2.9 2.8h-3.6c-1.6 0-2.9-1.2-2.9-2.8z',
  ],
  // copo com canudo
  bebidas: [
    'M14.6 1.8l1.9.7-3 8.1-1.9-.7z',
    'M4.2 8.6h13.6l-1.5 11.3c-.2 1.2-1.2 2-2.4 2H8.1c-1.2 0-2.2-.8-2.4-2z',
    'M3.6 6.2h14.8c.5 0 1 .5 1 1.1s-.5 1.1-1 1.1H3.6c-.6 0-1-.5-1-1.1s.4-1.1 1-1.1z',
  ],
  // fatia de bolo com cereja
  sobremesas: [
    'M12 3.4l8.6 5.4H3.4z',
    'M3.4 10h17.2v4.2H3.4z',
    'M3.4 15.4h17.2v3.5c0 1.2-1 2.1-2.1 2.1H5.5c-1.2 0-2.1-.9-2.1-2.1z',
    'M12 1.2a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2z',
  ],
}

const cor = computed(() => CORES[props.categoria] || 'vermelho')
const silhueta = computed(() => SILHUETAS[props.categoria] || SILHUETAS.lanches)
</script>

<style scoped>
.placa {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  overflow: hidden;
  border-bottom: var(--traco) solid var(--cor-traco);
  /* O card zera o line-height para matar o vão embaixo da <img>; aqui tem
     texto de verdade e sem isto a linha colapsa e some. */
  line-height: 1.2;
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0.06) 0 11px,
    transparent 11px 22px
  );
}

.placa__silhueta {
  width: 32%;
  max-width: 88px;
  height: auto;
  opacity: 0.42;
}

.placa__aviso {
  flex: 0 0 auto;
  font-family: var(--fonte-corpo);
  font-weight: 800;
  font-size: 0.6rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1.5px solid currentColor;
}

/* Branco, não creme: o creme dá 4,48:1 sobre o vermelho neste tamanho. */
.placa--vermelho { background-color: var(--vermelho); color: var(--branco); }
.placa--laranja { background-color: var(--laranja); color: var(--escuro); }
.placa--amarelo { background-color: var(--amarelo); color: var(--escuro); }
.placa--creme { background-color: var(--amarelo-claro); color: var(--escuro); }
.placa--marrom { background-color: var(--marrom); color: var(--creme); }
</style>
