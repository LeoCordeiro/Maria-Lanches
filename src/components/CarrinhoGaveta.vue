<template>
  <v-navigation-drawer
    v-model="aberto"
    location="right"
    temporary
    :width="400"
    class="gaveta"
  >
    <div class="gaveta__topo">
      <h2 class="gaveta__titulo">Seu pedido</h2>
      <button type="button" class="gaveta__fechar" aria-label="Fechar o pedido" @click="aberto = false">
        <Icone nome="fechar" :tamanho="22" />
      </button>
    </div>

    <div v-if="carrinho.vazio" class="gaveta__vazio">
      <img :src="burger" alt="" width="180" height="118">
      <p class="gaveta__vazio-titulo">Ainda não tem nada aqui</p>
      <p class="apoio">Escolha um lanche no cardápio e ele aparece nesta lista.</p>
      <button type="button" class="btn btn--vermelho" @click="irParaCardapio">Ver o cardápio</button>
    </div>

    <template v-else>
      <ul class="gaveta__lista">
        <li v-for="(linha, i) in carrinho.itens" :key="`${linha.id}-${i}`" class="linha">
          <div class="linha__topo">
            <span class="linha__nome">{{ linha.nome }}</span>
            <span class="linha__valor">{{ formatarPreco(linha.preco * linha.qtd) }}</span>
          </div>

          <p v-if="linha.obs" class="linha__obs">{{ linha.obs }}</p>

          <div class="linha__acoes">
            <div class="passo">
              <button type="button" :aria-label="`Tirar um ${linha.nome}`" @click="carrinho.alterarQtd(i, -1)">
                <Icone nome="menos" :tamanho="18" />
              </button>
              <span class="passo__qtd">{{ linha.qtd }}</span>
              <button type="button" :aria-label="`Mais um ${linha.nome}`" @click="carrinho.alterarQtd(i, 1)">
                <Icone nome="mais" :tamanho="18" />
              </button>
            </div>

            <button type="button" class="linha__botao" @click="alternarObs(i)">
              {{ obsAberta === i ? 'Fechar' : linha.obs ? 'Editar observação' : 'Observação' }}
            </button>

            <button type="button" class="linha__botao linha__botao--tirar" :aria-label="`Remover ${linha.nome}`" @click="carrinho.remover(i)">
              <Icone nome="lixeira" :tamanho="17" />
            </button>
          </div>

          <input
            v-if="obsAberta === i"
            class="campo linha__campo"
            type="text"
            maxlength="120"
            placeholder="Ex.: sem cebola, ponto da carne, sabor do refri"
            :value="linha.obs || ''"
            @input="carrinho.definirObs(i, $event.target.value)"
          >
        </li>
      </ul>

      <div class="gaveta__pe">
        <div class="gaveta__total">
          <span>Total</span>
          <strong>{{ formatarPreco(carrinho.subtotal) }}</strong>
        </div>
        <p v-if="entrega.faz" class="apoio gaveta__nota">
          A taxa de entrega é combinada na conversa do WhatsApp.
        </p>
        <button type="button" class="btn btn--bloco btn--vermelho" @click="finalizar">
          Finalizar pedido
          <Icone nome="seta" :tamanho="18" />
        </button>
        <button type="button" class="gaveta__limpar" @click="carrinho.limpar()">Esvaziar o pedido</button>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Icone from '@/components/Icone.vue'
import burger from '@/assets/hamburguer.webp'
import { formatarPreco } from '@/config/cardapio'
import { entrega } from '@/config/contato'
import { useCarrinho } from '@/store/carrinho'

const carrinho = useCarrinho()
const router = useRouter()
const obsAberta = ref(null)

const aberto = computed({
  get: () => carrinho.gaveta,
  set: (v) => (v ? carrinho.abrirGaveta() : carrinho.fecharGaveta()),
})

watch(aberto, (v) => {
  if (!v) obsAberta.value = null
})

function alternarObs(i) {
  obsAberta.value = obsAberta.value === i ? null : i
}

function irParaCardapio() {
  carrinho.fecharGaveta()
  router.push('/')
}

function finalizar() {
  carrinho.fecharGaveta()
  router.push('/pedido')
}
</script>

<style scoped>
.gaveta :deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
  background: var(--creme);
}

.gaveta {
  border-left: var(--traco) solid var(--cor-traco) !important;
}

/* O Vuetify escreve `width: 400px` inline; em tela estreita isso estoura.
   Nada de `max-width: 100vw` aqui: `vw` conta a barra de rolagem e vira
   overflow de 15px no desktop. */
@media (max-width: 430px) {
  .gaveta {
    width: 100% !important;
  }
}

.gaveta__topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  background: var(--vermelho);
  border-bottom: var(--traco) solid var(--cor-traco);
  position: sticky;
  top: 0;
  z-index: 2;
}

.gaveta__titulo {
  font-size: 1.5rem;
  color: var(--branco);
}

.gaveta__fechar {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 2px solid var(--escuro);
  background: var(--amarelo);
  color: var(--escuro);
  cursor: pointer;
}

.gaveta__fechar:hover {
  background: var(--amarelo-claro);
}

.gaveta__vazio {
  padding: 34px 22px;
  text-align: center;
}

.gaveta__vazio img {
  width: 180px;
  height: auto;
  opacity: 0.55;
  margin-bottom: 8px;
}

.gaveta__vazio-titulo {
  font-family: var(--fonte-display);
  font-weight: 600;
  font-size: 1.25rem;
  margin: 0 0 4px;
}

.gaveta__vazio .btn {
  margin-top: 10px;
}

.gaveta__lista {
  list-style: none;
  margin: 0;
  padding: 12px 14px 4px;
  overflow-y: auto;
  flex: 1 1 auto;
}

.linha {
  background: var(--branco);
  border: 2px solid var(--cor-traco);
  border-radius: var(--raio-sm);
  padding: 12px 13px;
  margin-bottom: 10px;
}

.linha__topo {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.linha__nome {
  font-family: var(--fonte-display);
  font-weight: 500;
  font-size: 1.05rem;
}

.linha__valor {
  font-family: var(--fonte-display);
  font-weight: 700;
  color: var(--vermelho);
  white-space: nowrap;
}

.linha__obs {
  margin: 4px 0 0;
  font-size: 0.86rem;
  color: var(--marrom);
  font-style: italic;
}

.linha__acoes {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.passo {
  display: flex;
  align-items: center;
  border: 2px solid var(--cor-traco);
  border-radius: 999px;
  overflow: hidden;
  background: var(--creme);
}

.passo button {
  display: grid;
  place-items: center;
  width: 38px;
  height: 36px;
  border: 0;
  background: transparent;
  color: var(--escuro);
  cursor: pointer;
}

.passo button:hover {
  background: var(--amarelo);
}

.passo__qtd {
  min-width: 26px;
  text-align: center;
  font-family: var(--fonte-corpo);
  font-weight: 900;
}

.linha__botao {
  margin-left: auto;
  border: 2px solid var(--cor-traco);
  background: var(--creme);
  border-radius: 999px;
  font-family: var(--fonte-corpo);
  font-weight: 800;
  font-size: 0.76rem;
  letter-spacing: 0.04em;
  padding: 8px 12px;
  min-height: 36px;
  cursor: pointer;
  color: var(--escuro);
}

.linha__botao:hover {
  background: var(--amarelo);
}

.linha__botao--tirar {
  margin-left: 0;
  display: grid;
  place-items: center;
  width: 38px;
  padding: 0;
}

.linha__botao--tirar:hover {
  background: #ffd9d9;
}

.linha__campo {
  margin-top: 10px;
  font-size: 0.92rem;
}

.gaveta__pe {
  padding: 14px 16px calc(18px + env(safe-area-inset-bottom, 0px));
  border-top: var(--traco) solid var(--cor-traco);
  background: var(--branco);
}

.gaveta__total {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-family: var(--fonte-display);
  font-size: 1.15rem;
  margin-bottom: 4px;
}

.gaveta__total strong {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vermelho);
}

.gaveta__nota {
  margin: 0 0 10px;
  font-size: 0.82rem;
}

.gaveta__limpar {
  display: block;
  width: 100%;
  margin-top: 10px;
  border: 0;
  background: transparent;
  color: var(--marrom);
  font-family: var(--fonte-corpo);
  font-weight: 700;
  font-size: 0.84rem;
  text-decoration: underline;
  cursor: pointer;
  min-height: 44px;
}
</style>
