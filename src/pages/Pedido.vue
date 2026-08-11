<template>
  <div class="pagina">
    <header class="topo">
      <div class="wrap">
        <p class="sobrancelha sobrancelha--branca">Quase lá</p>
        <h1 class="titulo-secao topo__titulo">Seu pedido</h1>
        <p class="lead topo__lead">
          Confira os itens, diga para onde vai e envie pelo WhatsApp.
          Nada é cobrado aqui no site — o pagamento é combinado na entrega ou na retirada.
        </p>
      </div>
    </header>

    <!-- Enviado: estado de confirmação -->
    <section v-if="enviado" class="secao">
      <div class="wrap">
        <div class="cartao sucesso">
          <span class="sucesso__icone"><Icone nome="check" :tamanho="34" /></span>
          <h2 class="titulo-secao">Pedido enviado!</h2>
          <p class="lead sucesso__texto">
            Abrimos o WhatsApp com a sua lista pronta. Se a conversa não abriu,
            toque no botão abaixo para tentar de novo.
          </p>
          <div class="sucesso__acoes">
            <a :href="linkPedido" target="_blank" rel="noopener" class="btn btn--zap">
              <Icone nome="zap" :tamanho="20" />
              Abrir o WhatsApp de novo
            </a>
            <button type="button" class="btn btn--creme" @click="novoPedido">Fazer outro pedido</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Carrinho vazio -->
    <section v-else-if="carrinho.vazio" class="secao">
      <div class="wrap">
        <div class="cartao vazio">
          <img :src="burger" alt="" width="220" height="144">
          <h2 class="titulo-secao">Seu pedido está vazio</h2>
          <p class="lead vazio__texto">Volte ao cardápio e escolha o que vai matar essa fome.</p>
          <router-link to="/" class="btn btn--vermelho">Ver o cardápio</router-link>
        </div>
      </div>
    </section>

    <!-- Pedido normal -->
    <section v-else class="secao">
      <div class="wrap pedido">
        <!-- coluna 1: itens -->
        <div class="cartao bloco">
          <h2 class="bloco__titulo">Itens do pedido</h2>

          <ul class="itens">
            <li v-for="(linha, i) in carrinho.itens" :key="`${linha.id}-${i}`" class="item">
              <div class="item__topo">
                <span class="item__nome">{{ linha.nome }}</span>
                <span class="item__valor">{{ formatarPreco(linha.preco * linha.qtd) }}</span>
              </div>
              <p class="item__unit apoio">{{ formatarPreco(linha.preco) }} cada</p>

              <div class="item__acoes">
                <div class="passo">
                  <button type="button" :aria-label="`Tirar um ${linha.nome}`" @click="carrinho.alterarQtd(i, -1)">
                    <Icone nome="menos" :tamanho="18" />
                  </button>
                  <span class="passo__qtd">{{ linha.qtd }}</span>
                  <button type="button" :aria-label="`Mais um ${linha.nome}`" @click="carrinho.alterarQtd(i, 1)">
                    <Icone nome="mais" :tamanho="18" />
                  </button>
                </div>
                <button type="button" class="mini" :aria-label="`Remover ${linha.nome}`" @click="carrinho.remover(i)">
                  <Icone nome="lixeira" :tamanho="17" />
                </button>
              </div>

              <label class="item__obs">
                <span class="esconde-visual">Observação para {{ linha.nome }}</span>
                <input
                  class="campo"
                  type="text"
                  maxlength="120"
                  placeholder="Observação: sem cebola, ponto da carne, sabor…"
                  :value="linha.obs || ''"
                  @input="carrinho.definirObs(i, $event.target.value)"
                >
              </label>
            </li>
          </ul>

          <router-link to="/" class="itens__voltar">+ Adicionar mais itens</router-link>
        </div>

        <!-- coluna 2: dados e envio -->
        <div class="lado">
          <div class="cartao bloco">
            <h2 class="bloco__titulo">Entrega ou retirada</h2>

            <div class="modo">
              <button
                v-if="entrega.faz"
                type="button"
                class="modo__op"
                :class="{ 'modo__op--on': d.modo === 'entrega' }"
                @click="d.modo = 'entrega'"
              >
                <Icone nome="moto" :tamanho="22" />
                <span>Entrega</span>
                <small>{{ entrega.tempoMedio }}</small>
              </button>
              <button
                v-if="entrega.retiradaNoLocal"
                type="button"
                class="modo__op"
                :class="{ 'modo__op--on': d.modo === 'retirada' }"
                @click="d.modo = 'retirada'"
              >
                <Icone nome="loja" :tamanho="22" />
                <span>Retirar no local</span>
                <small>sem taxa</small>
              </button>
            </div>

            <label class="campo-rotulo" for="nome">Seu nome</label>
            <input id="nome" v-model="d.nome" class="campo" type="text" autocomplete="name" placeholder="Como te chamamos?">

            <label class="campo-rotulo campo-rotulo--sep" for="tel">Telefone (opcional)</label>
            <input id="tel" v-model="d.telefone" class="campo" type="tel" inputmode="tel" autocomplete="tel" placeholder="(11) 90000-0000">

            <template v-if="d.modo === 'entrega'">
              <label class="campo-rotulo campo-rotulo--sep" for="end">Endereço com número</label>
              <input id="end" v-model="d.endereco" class="campo" type="text" autocomplete="street-address" placeholder="Rua, número, bairro">

              <label class="campo-rotulo campo-rotulo--sep" for="ref">Complemento e referência</label>
              <input id="ref" v-model="d.referencia" class="campo" type="text" placeholder="Apto, bloco, perto de…">
            </template>

            <label class="campo-rotulo campo-rotulo--sep" for="pag">Forma de pagamento</label>
            <select id="pag" v-model="d.pagamento" class="campo">
              <option v-for="p in pagamentos" :key="p" :value="p">{{ p }}</option>
            </select>
            <p class="apoio pagamento__nota">
              O site não cobra nada: o pagamento acontece na entrega ou na retirada.
            </p>

            <template v-if="d.pagamento === 'Dinheiro'">
              <label class="campo-rotulo campo-rotulo--sep" for="troco">Precisa de troco para quanto?</label>
              <input id="troco" v-model="d.troco" class="campo" type="text" inputmode="numeric" placeholder="Ex.: R$ 50,00">
            </template>

            <label class="campo-rotulo campo-rotulo--sep" for="obs">Observações do pedido</label>
            <textarea id="obs" v-model="d.observacoes" class="campo" rows="3" maxlength="300" placeholder="Alguma coisa que a cozinha precisa saber?"></textarea>
          </div>

          <div class="cartao bloco resumo">
            <div class="resumo__linha">
              <span>{{ carrinho.quantidadeTotal }} {{ carrinho.quantidadeTotal === 1 ? 'item' : 'itens' }}</span>
              <strong>{{ formatarPreco(carrinho.subtotal) }}</strong>
            </div>
            <p v-if="d.modo === 'entrega'" class="apoio resumo__taxa">
              + taxa de entrega, combinada na conversa.
            </p>

            <ul v-if="mostrarErros && pendencias.length" class="erros">
              <li v-for="e in pendencias" :key="e">
                <Icone nome="aviso" :tamanho="17" />
                {{ e }}
              </li>
            </ul>

            <a
              :href="linkPedido"
              target="_blank"
              rel="noopener"
              class="btn btn--bloco btn--zap resumo__enviar"
              @click="aoEnviar"
            >
              <Icone nome="zap" :tamanho="22" />
              Enviar pedido pelo WhatsApp
            </a>

            <details class="previa">
              <summary>Ver a mensagem que vai ser enviada</summary>
              <pre>{{ mensagem }}</pre>
            </details>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import Icone from '@/components/Icone.vue'
import burger from '@/assets/hamburguer.webp'
import { formatarPreco } from '@/config/cardapio'
import { contato, entrega, pagamentos } from '@/config/contato'
import { useCarrinho } from '@/store/carrinho'

const carrinho = useCarrinho()
const d = carrinho.dados

const enviado = ref(false)
const mostrarErros = ref(false)

const pendencias = computed(() => carrinho.pendencias())
const mensagem = computed(() => carrinho.mensagemPedido())
const linkPedido = computed(
  () => `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(mensagem.value)}`
)

// Os dados do cliente ficam salvos junto com o carrinho: quem sai para o
// WhatsApp e volta não perde o que digitou.
watch(d, () => carrinho.persistir(), { deep: true })

function aoEnviar(evento) {
  if (pendencias.value.length) {
    evento.preventDefault()
    mostrarErros.value = true
    const erro = document.querySelector('.erros')
    if (erro) erro.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }
  // O link abre em aba nova normalmente; aqui só trocamos a tela.
  enviado.value = true
}

function novoPedido() {
  carrinho.limpar()
  enviado.value = false
  mostrarErros.value = false
}
</script>

<style scoped>
.topo {
  background: var(--vermelho);
  color: var(--branco);
  padding: 34px 0 30px;
  border-bottom: var(--traco) solid var(--cor-traco);
}

.topo__titulo {
  color: var(--branco);
}

.topo__lead {
  color: var(--branco); /* 4,73:1 sobre o vermelho; o creme dava 4,02:1 */
  margin: 10px 0 0;
}

.pedido {
  display: grid;
  grid-template-columns: 1.12fr 0.88fr;
  gap: 20px;
  align-items: start;
}

.bloco {
  padding: 20px;
}

.bloco__titulo {
  font-size: 1.35rem;
  margin-bottom: 16px;
}

/* ---- itens ---- */
.itens {
  list-style: none;
  margin: 0;
  padding: 0;
}

.item {
  border-top: 2px dashed rgba(24, 21, 16, 0.18);
  padding: 14px 0;
}

.item:first-child {
  border-top: 0;
  padding-top: 0;
}

.item__topo {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.item__nome {
  font-family: var(--fonte-display);
  font-weight: 500;
  font-size: 1.14rem;
}

.item__valor {
  font-family: var(--fonte-display);
  font-weight: 700;
  font-size: 1.16rem;
  color: var(--vermelho);
  white-space: nowrap;
}

.item__unit {
  margin: 2px 0 0;
  font-size: 0.82rem;
}

.item__acoes {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
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
  width: 40px;
  height: 38px;
  border: 0;
  background: transparent;
  color: var(--escuro);
  cursor: pointer;
}

.passo button:hover {
  background: var(--amarelo);
}

.passo__qtd {
  min-width: 28px;
  text-align: center;
  font-weight: 900;
}

.mini {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 2px solid var(--cor-traco);
  border-radius: 999px;
  background: var(--creme);
  color: var(--escuro);
  cursor: pointer;
}

.mini:hover {
  background: #ffd9d9;
}

.item__obs {
  display: block;
}

.item__obs .campo {
  font-size: 0.92rem;
  padding: 10px 13px;
  min-height: 44px;
}

.itens__voltar {
  display: inline-block;
  margin-top: 14px;
  font-family: var(--fonte-display);
  font-weight: 500;
  color: var(--vermelho);
  text-decoration: none;
  border-bottom: 2px solid var(--laranja);
  padding-bottom: 2px;
}

/* ---- lado ---- */
.lado {
  display: grid;
  gap: 20px;
  position: sticky;
  top: calc(var(--header-h) + var(--toldo-h) + 14px);
}

.modo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 18px;
}

.modo__op {
  display: grid;
  justify-items: center;
  gap: 3px;
  padding: 14px 8px;
  border: 2px solid var(--cor-traco);
  border-radius: var(--raio-sm);
  background: var(--creme);
  color: var(--escuro);
  font-family: var(--fonte-display);
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  min-height: 48px;
}

.modo__op small {
  font-family: var(--fonte-corpo);
  font-weight: 700;
  font-size: 0.72rem;
  color: var(--marrom);
}

.modo__op--on {
  background: var(--amarelo);
  box-shadow: var(--sombra-dura-sm);
}

.campo-rotulo--sep {
  margin-top: 14px;
}

.pagamento__nota {
  margin: 8px 0 0;
  font-size: 0.82rem;
}

/* ---- resumo ---- */
.resumo__linha {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-family: var(--fonte-display);
  font-size: 1.1rem;
}

.resumo__linha strong {
  font-size: 1.85rem;
  font-weight: 700;
  color: var(--vermelho);
}

.resumo__taxa {
  margin: 2px 0 0;
  font-size: 0.84rem;
}

.resumo__enviar {
  margin-top: 14px;
}

.erros {
  list-style: none;
  margin: 14px 0 0;
  padding: 12px 14px;
  background: #fff0f0;
  border: 2px solid var(--vermelho);
  border-radius: var(--raio-sm);
}

.erros li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--vermelho-escuro);
  padding: 3px 0;
}

.previa {
  margin-top: 14px;
  font-size: 0.88rem;
}

.previa summary {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 800;
  color: var(--marrom);
  min-height: 44px; /* alvo de toque */
}

.previa pre {
  margin: 10px 0 0;
  padding: 12px;
  background: var(--creme);
  border: 2px dashed rgba(24, 21, 16, 0.25);
  border-radius: var(--raio-sm);
  font-family: var(--fonte-corpo);
  font-size: 0.84rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

/* ---- estados ---- */
.vazio,
.sucesso {
  text-align: center;
  padding: 40px 24px;
  max-width: 640px;
  margin: 0 auto;
}

.vazio img {
  width: 220px;
  height: auto;
  opacity: 0.6;
  margin-bottom: 6px;
}

.vazio__texto,
.sucesso__texto {
  margin: 8px auto 18px;
}

.sucesso__icone {
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  margin: 0 auto 14px;
  border-radius: 999px;
  border: var(--traco) solid var(--cor-traco);
  background: var(--verde-zap);
  color: var(--escuro);
}

.sucesso__acoes {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

@media (max-width: 900px) {
  .pedido {
    grid-template-columns: 1fr;
  }

  .lado {
    position: static;
  }
}
</style>
