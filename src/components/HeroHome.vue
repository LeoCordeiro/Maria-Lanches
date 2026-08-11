<template>
  <section class="hero">
    <div class="wrap hero__grade">
      <div class="hero__texto">
        <p class="sobrancelha hero__olho entra entra--1">
          Lanchonete em {{ empresa.cidade }} · {{ empresa.uf }}
        </p>

        <h1 class="titulo-xg hero__titulo entra entra--2">
          Lanche na chapa,<br>
          <em>do jeito</em> que você pediu
        </h1>

        <p class="lead hero__lead entra entra--3">
          Monte seu pedido aqui no cardápio e mande pelo WhatsApp num toque.
          A gente prepara na hora — para retirar no balcão ou receber em casa.
        </p>

        <div class="hero__botoes entra entra--4">
          <a href="#cardapio" class="btn" @click.prevent="irParaCardapio">Ver o cardápio</a>
          <a :href="linkZap" target="_blank" rel="noopener" class="btn btn--creme">
            <Icone nome="zap" :tamanho="20" />
            Chamar no WhatsApp
          </a>
        </div>

        <ul class="hero__fatos entra entra--5">
          <li>
            <Icone nome="relogio" :tamanho="18" />
            <span v-if="status.aberto">Aberto agora, até {{ status.fecha }}</span>
            <span v-else-if="status.proximo">Fechado — abre {{ status.proximo.dia }} às {{ status.proximo.abre }}</span>
            <span v-else>Fechado agora</span>
          </li>
          <li v-if="entrega.faz">
            <Icone nome="moto" :tamanho="18" />
            <span>Entrega em {{ entrega.tempoMedio }}</span>
          </li>
          <li v-if="entrega.retiradaNoLocal">
            <Icone nome="loja" :tamanho="18" />
            <span>Retirada no balcão</span>
          </li>
        </ul>
      </div>

      <div class="hero__marca entra entra--2">
        <img :src="logo" :alt="`${empresa.nome} — ${empresa.tagline}`" width="700" height="690">
      </div>
    </div>

    <div class="toldo toldo--amarelo hero__toldo" aria-hidden="true"></div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Icone from '@/components/Icone.vue'
import logo from '@/assets/marca-mari-lanches.webp'
import { empresa, entrega, statusAgora, waLink } from '@/config/contato'

const status = ref(statusAgora())
const linkZap = waLink(`Olá! Vim pelo site da ${empresa.nome}.`)

function irParaCardapio() {
  const alvo = document.getElementById('cardapio')
  if (!alvo) return
  const y = alvo.getBoundingClientRect().top + window.scrollY - 78
  window.scrollTo({ top: y, behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  position: relative;
  /* Continua o vermelho do header e escurece até a faixa amarela: o texto
     pequeno em branco fica em 7,7:1 na parte baixa e 4,7:1 no topo. */
  background: linear-gradient(178deg, var(--vermelho) 0%, var(--vermelho-fundo) 100%);
  color: var(--branco);
  padding: 44px 0 calc(var(--sec-pad) + var(--toldo-h));
  overflow: hidden;
}

/* Listras de toldo bem apagadas + brilho quente atrás da logo: profundidade
   sem virar gradiente decorativo genérico. */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(46% 60% at 76% 44%, rgba(255, 198, 41, 0.34) 0%, rgba(255, 198, 41, 0) 68%),
    repeating-linear-gradient(
      -45deg,
      rgba(0, 0, 0, 0.07) 0 22px,
      rgba(0, 0, 0, 0) 22px 44px
    );
  pointer-events: none;
}

.hero__grade {
  position: relative;
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  align-items: center;
  gap: 30px;
}

.hero__olho {
  color: var(--branco);
  opacity: 0.92;
}

.hero__titulo {
  color: var(--branco);
  text-shadow: 0 3px 0 rgba(0, 0, 0, 0.22);
  margin-bottom: 16px;
}

/* Mistura de famílias dentro do título: Fredoka 700 e Nunito itálico 700.
   É o contraste que faz a manchete não parecer texto de template. */
.hero__titulo em {
  font-family: var(--fonte-corpo);
  font-style: italic;
  font-weight: 700;
  color: var(--amarelo);
}

.hero__lead {
  /* Branco: o creme #ffe9d6 dá 4,02:1 na parte alta do gradiente vermelho
     e reprova o AA em texto de 18px. Branco dá 4,73:1. */
  color: var(--branco);
  margin-bottom: 22px;
}

.hero__botoes {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 22px;
}

.hero__fatos {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin: 0;
  padding: 0;
}

.hero__fatos li {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(0, 0, 0, 0.24);
  border: 2px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  padding: 8px 14px;
  font-weight: 700;
  font-size: 0.86rem;
}

.hero__marca {
  display: grid;
  place-items: center;
}

.hero__marca img {
  width: min(100%, 360px);
  height: auto;
  filter: drop-shadow(0 12px 0 rgba(0, 0, 0, 0.24));
  animation: bamboleia 6.5s ease-in-out infinite;
}

@keyframes bamboleia {
  0%, 100% { transform: translateY(0) rotate(-1.2deg); }
  50% { transform: translateY(-12px) rotate(1.2deg); }
}

.hero__toldo {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom: 0;
  border-top: var(--traco) solid var(--cor-traco);
}

/* Entrada: sobe e aparece, escalonado. Uma vez só, no carregamento. */
.entra {
  animation: sobe 0.72s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.entra--1 { animation-delay: 0.04s; }
.entra--2 { animation-delay: 0.12s; }
.entra--3 { animation-delay: 0.2s; }
.entra--4 { animation-delay: 0.28s; }
.entra--5 { animation-delay: 0.36s; }

@keyframes sobe {
  from { opacity: 0; transform: translateY(26px); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .hero__marca img {
    animation: none;
  }
}

@media (max-width: 880px) {
  .hero__grade {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 6px;
  }

  .hero__texto {
    order: 2;
  }

  .hero__marca {
    order: 1;
  }

  .hero__marca img {
    width: min(64%, 240px);
  }

  .hero__lead {
    margin-left: auto;
    margin-right: auto;
  }

  .hero__botoes,
  .hero__fatos {
    justify-content: center;
  }
}
</style>
