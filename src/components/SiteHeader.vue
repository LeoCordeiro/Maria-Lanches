<template>
  <header class="cabecalho">
    <div class="cabecalho__barra">
      <div class="wrap cabecalho__linha">
        <router-link to="/" class="cabecalho__marca" :aria-label="`${empresa.nome} — ir para o cardápio`">
          <img :src="logo" :alt="empresa.nome" width="120" height="118">
          <span class="cabecalho__nome">{{ empresa.nome }}</span>
        </router-link>

        <nav class="cabecalho__nav" aria-label="Principal">
          <router-link to="/" class="cabecalho__link">Cardápio</router-link>
          <router-link to="/sobre" class="cabecalho__link">Sobre</router-link>
          <router-link to="/contato" class="cabecalho__link">Contato</router-link>
        </nav>

        <span class="cabecalho__status" :class="{ 'cabecalho__status--off': !status.aberto }">
          <i class="ponto" aria-hidden="true"></i>
          {{ status.aberto ? `Aberto até ${status.fecha}` : 'Fechado agora' }}
        </span>
      </div>
    </div>
    <div class="toldo" aria-hidden="true"></div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { empresa, statusAgora } from '@/config/contato'
import logo from '@/assets/marca-mari-lanches.webp'

const status = ref(statusAgora())
// Reavalia de minuto em minuto: quem deixa a aba aberta na hora de fechar
// não pode continuar vendo "Aberto".
setInterval(() => (status.value = statusAgora()), 60000)
</script>

<style scoped>
.cabecalho {
  position: fixed;
  inset: 0 0 auto;
  z-index: 950;
}

.cabecalho__barra {
  height: var(--header-h);
  background: var(--vermelho);
  /* Vinheta escura nas pontas: dá volume de toldo em vez de barra chapada. */
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.14) 0%,
    rgba(0, 0, 0, 0) 42%,
    rgba(0, 0, 0, 0.16) 100%
  );
}

.cabecalho__linha {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
}

.cabecalho__marca {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-right: auto;
  min-height: 46px; /* alvo de toque */
  /* Zera o vermelho herdado da regra global de <a>: aqui o fundo já é
     vermelho e qualquer texto solto ficaria em 1,26:1. */
  color: var(--branco);
}

.cabecalho__marca img {
  width: 54px;
  height: 53px;
  object-fit: contain;
  filter: drop-shadow(0 2px 0 rgba(0, 0, 0, 0.35));
  transition: transform var(--transicao);
}

.cabecalho__marca:hover img {
  transform: rotate(-4deg) scale(1.06);
}

.cabecalho__nome {
  display: flex;
  flex-direction: column;
  font-family: var(--fonte-display);
  font-weight: 600;
  font-size: 1.24rem;
  line-height: 1;
  color: var(--branco);
}


.cabecalho__nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cabecalho__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 44px; /* alvo de toque */
  font-family: var(--fonte-display);
  font-weight: 500;
  font-size: 1.02rem;
  color: var(--branco);
  text-decoration: none;
  padding: 0 13px;
  border-radius: 999px;
  transition: background 0.2s, color 0.2s;
}

.cabecalho__link:hover {
  background: rgba(0, 0, 0, 0.18);
}

.cabecalho__link.router-link-exact-active {
  background: var(--amarelo);
  color: var(--escuro);
}

.cabecalho__status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--fonte-corpo);
  font-weight: 800;
  font-size: 0.74rem;
  letter-spacing: 0.05em;
  color: var(--branco);
  background: rgba(0, 0, 0, 0.22);
  border-radius: 999px;
  padding: 7px 13px;
  white-space: nowrap;
}

.ponto {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #7ff09a;
  box-shadow: 0 0 0 3px rgba(127, 240, 154, 0.28);
}

.cabecalho__status--off .ponto {
  background: #ffd6d6;
  box-shadow: 0 0 0 3px rgba(255, 214, 214, 0.25);
}

@media (max-width: 900px) {
  .cabecalho__status {
    display: none;
  }
}

@media (max-width: 700px) {
  .cabecalho__nome {
    font-size: 1.05rem;
  }

  .cabecalho__link {
    font-size: 0.92rem;
    padding: 0 10px;
  }
}

@media (max-width: 430px) {
  .cabecalho__linha {
    gap: 8px;
    padding: 0 12px;
  }

  .cabecalho__marca img {
    width: 44px;
    height: 43px;
  }

  .cabecalho__nome {
    font-size: 0.95rem;
  }

  .cabecalho__link {
    font-size: 0.84rem;
    padding: 0 8px;
  }
}
</style>
