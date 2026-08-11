<template>
  <v-hover v-slot="{ isHovering, props: hoverProps }">
    <article
      v-bind="hoverProps"
      class="prato"
      :class="{ 'prato--alto': isHovering }"
    >
      <div class="prato__foto">
        <img v-if="item.foto" :src="item.foto" :alt="item.nome" loading="lazy" width="480" height="360">
        <PlaceholderPrato v-else :nome="item.nome" :categoria="item.categoria" />

        <span v-if="item.destaque" class="selo selo--vermelho prato__destaque">Mais pedido</span>
        <span v-if="parceiro" class="selo prato__parceiro">{{ parceiro }}</span>
      </div>

      <div class="prato__texto">
        <h3 class="prato__nome">{{ item.nome }}</h3>
        <p class="prato__desc">{{ item.descricao }}</p>
      </div>

      <div class="prato__pe">
        <span class="prato__preco">{{ formatarPreco(item.preco) }}</span>

        <v-btn
          ref="botao"
          class="prato__add"
          variant="flat"
          color="secondary"
          height="46"
          :aria-label="`Adicionar ${item.nome} ao pedido`"
          @click="adicionar"
        >
          <span class="prato__add-texto">Adicionar</span>
          <span v-if="noCarrinho" class="prato__conta">{{ noCarrinho }}</span>
        </v-btn>
      </div>
    </article>
  </v-hover>
</template>

<script setup>
import { computed, ref } from 'vue'
import PlaceholderPrato from '@/components/PlaceholderPrato.vue'
import { formatarPreco, seloFornecedor } from '@/config/cardapio'
import { useCarrinho } from '@/store/carrinho'
import { voarParaCarrinho } from '@/utils/voar'

const props = defineProps({
  item: { type: Object, required: true },
  emoji: { type: String, default: '🍔' },
})

const carrinho = useCarrinho()
const botao = ref(null)

const parceiro = computed(() => seloFornecedor(props.item))
const noCarrinho = computed(() => carrinho.qtdDoItem(props.item.id))

function adicionar() {
  const el = botao.value && botao.value.$el ? botao.value.$el : null
  carrinho.adicionar(props.item)
  voarParaCarrinho(el, props.emoji)
}
</script>

<style scoped>
.prato {
  display: flex;
  flex-direction: column;
  background: var(--branco);
  border: var(--traco) solid var(--cor-traco);
  border-radius: var(--raio);
  box-shadow: var(--sombra-dura);
  overflow: hidden;
  transition: transform var(--transicao), box-shadow var(--transicao);
  height: 100%;
}

/* Micro-interação pedida: destaca o lanche no hover/toque. */
.prato--alto {
  transform: translate(-3px, -3px) scale(1.03);
  box-shadow: var(--sombra-dura-lg);
}

.prato__foto {
  position: relative;
  line-height: 0;
}

/* Mesma proporção do placeholder: quando a foto real entrar, a grade não
   muda de altura. */
.prato__foto img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-bottom: var(--traco) solid var(--cor-traco);
}

.prato__destaque {
  position: absolute;
  top: 10px;
  left: 10px;
  box-shadow: var(--sombra-dura-sm);
}

.prato__parceiro {
  position: absolute;
  bottom: 10px;
  left: 10px;
  box-shadow: var(--sombra-dura-sm);
}

.prato__texto {
  padding: 16px 18px 4px;
  flex: 1 1 auto;
}

.prato__nome {
  font-size: 1.28rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.prato__desc {
  color: var(--marrom);
  font-size: 0.94rem;
  line-height: 1.5;
  margin: 0;
}

.prato__pe {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px 18px;
}

.prato__preco {
  font-family: var(--fonte-display);
  font-weight: 700;
  font-size: 1.6rem;
  color: var(--vermelho);
  line-height: 1;
}

/* O v-btn traz o ripple (feedback tátil da ação de compra); o contorno de
   adesivo vem daqui e precisa vencer a especificidade do variant="flat". */
.prato__add {
  border: var(--traco) solid var(--cor-traco) !important;
  border-radius: 999px !important;
  box-shadow: var(--sombra-dura-sm) !important;
  font-family: var(--fonte-display) !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  padding: 0 20px !important;
}

.prato__add:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--escuro) !important;
}

.prato__conta {
  display: inline-grid;
  place-items: center;
  min-width: 22px;
  height: 22px;
  margin-left: 8px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--escuro);
  color: var(--amarelo);
  font-family: var(--fonte-corpo);
  font-weight: 900;
  font-size: 0.78rem;
}

/* Nada de esconder o rótulo no celular: "Adicionar" é a ação principal e
   ícone sozinho não diz o que faz. Em tela estreita ele só encolhe. */
@media (max-width: 420px) {
  .prato__pe {
    padding: 12px 14px 16px;
  }

  .prato__add {
    font-size: 0.92rem !important;
    padding: 0 14px !important;
  }

  .prato__preco {
    font-size: 1.42rem;
  }
}
</style>
