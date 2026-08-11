<template>
  <div>
    <HeroHome />

    <!-- Como funciona: três passos, porque pedir por site + WhatsApp ainda
         não é óbvio para todo mundo. -->
    <section class="passos">
      <div class="wrap passos__grade">
        <div v-for="(p, i) in PASSOS" :key="p.titulo" v-revelar="i * 90" class="passo-card">
          <span class="passo-card__n">{{ i + 1 }}</span>
          <h3 class="passo-card__titulo">{{ p.titulo }}</h3>
          <p class="apoio">{{ p.texto }}</p>
        </div>
      </div>
    </section>

    <!-- Barra de categorias: gruda abaixo do header e acompanha a rolagem. -->
    <div id="cardapio" class="barra-cat">
      <div class="wrap barra-cat__linha">
        <v-chip
          v-for="c in categorias"
          :key="c.id"
          class="barra-cat__chip"
          :class="{ 'barra-cat__chip--ativa': ativa === c.id }"
          variant="flat"
          @click="irPara(c.id)"
        >
          <span class="barra-cat__emoji" aria-hidden="true">{{ c.emoji }}</span>
          {{ c.nome }}
        </v-chip>
      </div>
    </div>

    <section
      v-for="cat in categorias"
      :id="`cat-${cat.id}`"
      :key="cat.id"
      class="secao categoria"
      :ref="(el) => registrar(el, cat.id)"
    >
      <div class="wrap">
        <header class="categoria__cabeca">
          <p class="sobrancelha">{{ cat.chamada }}</p>
          <h2 class="titulo-secao">{{ cat.nome }}</h2>
        </header>

        <div class="grade">
          <ProdutoCard
            v-for="(item, i) in itensDaCategoria(cat.id)"
            :key="item.id"
            v-revelar="Math.min(i, 3) * 70"
            :item="item"
            :emoji="cat.emoji"
          />
        </div>
      </div>
    </section>

    <section class="secao secao--escura fecho">
      <div class="wrap fecho__caixa">
        <div>
          <p class="sobrancelha sobrancelha--clara">Fome agora?</p>
          <h2 class="titulo-secao">Seu pedido vai direto para o nosso WhatsApp</h2>
          <p class="lead">
            Sem cadastro, sem aplicativo, sem taxa de plataforma. Você monta,
            a gente confirma na conversa e prepara na hora.
          </p>
        </div>
        <div class="fecho__acoes">
          <router-link to="/pedido" class="btn">Ver meu pedido</router-link>
          <a :href="linkZap" target="_blank" rel="noopener" class="btn btn--zap">
            <Icone nome="zap" :tamanho="20" />
            Falar com a gente
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import HeroHome from '@/components/HeroHome.vue'
import ProdutoCard from '@/components/ProdutoCard.vue'
import Icone from '@/components/Icone.vue'
import { categorias, itensDaCategoria } from '@/config/cardapio'
import { empresa, waLink } from '@/config/contato'

const PASSOS = [
  { titulo: 'Escolha no cardápio', texto: 'Toque em "Adicionar" nos lanches que você quer. Dá para mudar a quantidade e escrever observação.' },
  { titulo: 'Envie pelo WhatsApp', texto: 'Preencha nome e endereço e o site monta a mensagem pronta com tudo o que você pediu.' },
  { titulo: 'Receba ou retire', texto: 'A gente confirma o valor da entrega na conversa e começa a preparar na hora.' },
]

const linkZap = waLink(`Olá! Vim pelo site da ${empresa.nome}.`)

const ativa = ref(categorias[0].id)
const secoes = new Map()
let observador = null

function registrar(el, id) {
  if (el) secoes.set(id, el)
}

function irPara(id) {
  const el = secoes.get(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 118
  window.scrollTo({ top: y, behavior: 'smooth' })
}

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return
  observador = new IntersectionObserver(
    (entradas) => {
      const visivel = entradas
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visivel && visivel.target.id) ativa.value = visivel.target.id.replace('cat-', '')
    },
    { rootMargin: '-140px 0px -55% 0px', threshold: 0 }
  )
  secoes.forEach((el) => observador.observe(el))
})

onBeforeUnmount(() => {
  if (observador) observador.disconnect()
})
</script>

<style scoped>
/* ---- passos ---- */
.passos {
  padding: 34px 0 10px;
}

.passos__grade {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.passo-card {
  position: relative;
  background: var(--branco);
  border: var(--traco) solid var(--cor-traco);
  border-radius: var(--raio);
  box-shadow: var(--sombra-dura);
  padding: 20px 20px 18px;
}

.passo-card__n {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 2px solid var(--cor-traco);
  background: var(--amarelo);
  font-family: var(--fonte-display);
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 10px;
}

.passo-card__titulo {
  font-size: 1.18rem;
  margin-bottom: 6px;
}

.passo-card p {
  margin: 0;
}

/* ---- barra de categorias ---- */
.barra-cat {
  position: sticky;
  top: calc(var(--header-h) + var(--toldo-h) - 4px);
  z-index: 800;
  background: var(--creme);
  border-top: 2px solid var(--cor-traco);
  border-bottom: var(--traco) solid var(--cor-traco);
  margin-top: 30px;
}

.barra-cat__linha {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  scrollbar-width: none;
}

.barra-cat__linha::-webkit-scrollbar {
  display: none;
}

.barra-cat__chip {
  flex: 0 0 auto;
  border: 2px solid var(--cor-traco) !important;
  background: var(--branco) !important;
  color: var(--escuro) !important;
  font-family: var(--fonte-display) !important;
  font-weight: 500 !important;
  font-size: 0.98rem !important;
  height: 44px !important;
  padding: 0 15px !important;
  cursor: pointer;
}

.barra-cat__chip--ativa {
  background: var(--vermelho) !important;
  color: var(--branco) !important;
  box-shadow: var(--sombra-dura-sm) !important;
}

.barra-cat__emoji {
  margin-right: 7px;
  font-size: 1.05rem;
}

/* ---- categorias ---- */
.categoria {
  scroll-margin-top: 130px;
}

.categoria__cabeca {
  margin-bottom: 22px;
}

.grade {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(268px, 1fr));
  gap: 20px;
}

/* ---- fecho ---- */
.fecho__caixa {
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 26px;
  align-items: center;
}

.fecho__acoes {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 860px) {
  .passos__grade {
    grid-template-columns: 1fr;
  }

  .fecho__caixa {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .grade {
    grid-template-columns: 1fr;
  }
}
</style>
