<template>
  <button
    id="fab-carrinho"
    ref="fab"
    class="fab fab--carrinho"
    :class="{ 'fab--vazio': carrinho.vazio, chacoalha: sacudindo }"
    type="button"
    :aria-label="rotulo"
    @click="carrinho.abrirGaveta()"
  >
    <v-badge
      :model-value="!carrinho.vazio"
      :content="carrinho.quantidadeTotal"
      color="accent"
      offset-x="-2"
      offset-y="-2"
      class="fab__badge"
    >
      <Icone nome="sacola" :tamanho="26" />
    </v-badge>

    <Transition name="valor">
      <span v-if="!carrinho.vazio" :key="carrinho.subtotal" class="fab__valor">
        {{ formatarPreco(carrinho.subtotal) }}
      </span>
    </Transition>
  </button>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import Icone from '@/components/Icone.vue'
import { formatarPreco } from '@/config/cardapio'
import { useCarrinho } from '@/store/carrinho'

const carrinho = useCarrinho()
const sacudindo = ref(false)
const fab = ref(null)

const rotulo = computed(() =>
  carrinho.vazio
    ? 'Seu pedido está vazio'
    : `Ver pedido: ${carrinho.quantidadeTotal} ${carrinho.quantidadeTotal === 1 ? 'item' : 'itens'}, ${formatarPreco(carrinho.subtotal)}`
)

// O balanço só dispara em adição (pulso), não em qualquer mudança de total —
// remover item não deve comemorar.
watch(
  () => carrinho.pulso,
  () => {
    sacudindo.value = false
    requestAnimationFrame(() => {
      sacudindo.value = true
      setTimeout(() => (sacudindo.value = false), 700)
    })
  }
)
</script>

<style scoped>
.fab--carrinho {
  right: 18px;
  bottom: calc(18px + env(safe-area-inset-bottom, 0px));
  gap: 10px;
  min-height: 60px;
  padding: 0 20px 0 18px;
  background: var(--amarelo);
  color: var(--escuro);
  font-family: var(--fonte-display);
  font-weight: 600;
  font-size: 1.05rem;
}

.fab--vazio {
  background: var(--branco);
  padding: 0 18px;
}

.fab__valor {
  display: inline-block;
  white-space: nowrap;
}

/* O número do total troca com uma girada curta — é o eco do item que acabou
   de cair no carrinho. */
.valor-enter-active {
  animation: numero-entra 0.34s cubic-bezier(0.34, 1.4, 0.64, 1);
}

.valor-leave-active {
  display: none;
}

.fab__badge :deep(.v-badge__badge) {
  border: 2px solid var(--escuro);
  font-family: var(--fonte-corpo);
  font-weight: 900;
  font-size: 0.74rem;
  min-width: 22px;
  height: 22px;
  padding: 0 5px;
}

@media (max-width: 430px) {
  .fab--carrinho {
    right: 14px;
    bottom: calc(14px + env(safe-area-inset-bottom, 0px));
    min-height: 56px;
    font-size: 0.98rem;
    padding: 0 16px 0 14px;
  }
}
</style>
