<template>
  <footer class="rodape">
    <div class="toldo" aria-hidden="true"></div>

    <div class="wrap rodape__grade">
      <div>
        <img :src="logo" :alt="empresa.nome" width="120" height="118" class="rodape__logo">
        <p class="rodape__tag">{{ empresa.tagline }}</p>
        <p class="apoio rodape__cnpj">
          {{ empresa.razaoSocial }}<br>
          CNPJ {{ empresa.cnpj }}
        </p>
      </div>

      <nav aria-label="Rodapé">
        <h3 class="rodape__titulo">Navegar</h3>
        <ul class="rodape__lista">
          <li><router-link to="/">Cardápio</router-link></li>
          <li><router-link to="/pedido">Seu pedido</router-link></li>
          <li><router-link to="/sobre">Sobre a casa</router-link></li>
          <li><router-link to="/contato">Contato e localização</router-link></li>
          <li v-if="franquia.ativa"><router-link to="/franquia">Seja um franqueado</router-link></li>
        </ul>

        <h3 class="rodape__titulo rodape__titulo--sep">Legal</h3>
        <ul class="rodape__lista">
          <li><router-link to="/privacidade">Política de privacidade</router-link></li>
          <li><router-link to="/termos">Termos de uso</router-link></li>
          <li v-if="franquia.ativa"><router-link to="/politica-de-franquia">Política de franquia</router-link></li>
        </ul>
      </nav>

      <div>
        <h3 class="rodape__titulo">Peça pelo WhatsApp</h3>
        <a :href="linkZap" target="_blank" rel="noopener" class="btn btn--zap rodape__zap">
          <Icone nome="zap" :tamanho="20" />
          {{ whatsappLegivel() }}
        </a>
        <a
          v-if="contato.email"
          :href="`mailto:${contato.email}`"
          class="rodape__email"
        >{{ contato.email }}</a>
        <p v-if="contato.endereco" class="apoio rodape__endereco">{{ contato.endereco }}</p>
        <a
          v-if="contato.instagram"
          :href="instagramLink()"
          target="_blank"
          rel="noopener"
          class="rodape__insta"
        >@{{ contato.instagram }}</a>
      </div>

      <div>
        <h3 class="rodape__titulo">Horário</h3>
        <ul class="rodape__horarios">
          <li v-for="h in horarios" :key="h.dia" :class="{ 'rodape__fechado': h.fechado }">
            <span>{{ h.dia }}</span>
            <span>{{ h.fechado ? 'Fechado' : `${h.abre} às ${h.fecha}` }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="wrap rodape__fim">
      <span>© {{ ano }} {{ empresa.nome }}. Todos os direitos reservados.</span>
      <span class="rodape__preco-aviso">Preços e itens sujeitos a alteração sem aviso.</span>
    </div>
  </footer>
</template>

<script setup>
import Icone from '@/components/Icone.vue'
import logo from '@/assets/marca-mari-lanches.webp'
import {
  contato,
  empresa,
  franquia,
  horarios,
  instagramLink,
  waLink,
  whatsappLegivel,
} from '@/config/contato'

const ano = new Date().getFullYear()
const linkZap = waLink(`Olá! Vim pelo site da ${empresa.nome}.`)
</script>

<style scoped>
.rodape {
  position: relative;
  background: var(--escuro);
  color: var(--creme);
  padding-bottom: 92px; /* espaço para os botões flutuantes não taparem texto */
}

.rodape .toldo {
  border-bottom: 0;
  border-top: var(--traco) solid var(--cor-traco);
  margin-bottom: 34px;
}

.rodape__grade {
  display: grid;
  grid-template-columns: 1.25fr 0.85fr 1.1fr 1fr;
  gap: 30px;
  align-items: start;
}

.rodape__logo {
  width: 96px;
  height: auto;
}

.rodape__tag {
  font-family: var(--fonte-display);
  font-weight: 500;
  font-size: 1.05rem;
  color: var(--amarelo);
  margin: 8px 0 10px;
}

.rodape__cnpj {
  color: #b9a894;
  font-size: 0.82rem;
  line-height: 1.5;
}

.rodape__titulo--sep {
  margin-top: 22px;
}

.rodape__titulo {
  font-family: var(--fonte-corpo);
  font-weight: 900;
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--amarelo);
  margin: 0 0 14px;
}

.rodape__lista {
  list-style: none;
  margin: 0;
  padding: 0;
}

.rodape__lista li {
  margin-bottom: 4px;
}

.rodape__lista a {
  display: inline-flex;
  align-items: center;
  min-height: 44px; /* alvo de toque */
  color: var(--creme);
  text-decoration: none;
  font-weight: 600;
}

.rodape__lista a:hover {
  color: var(--amarelo);
  text-decoration: underline;
}

.rodape__zap {
  font-size: 0.98rem;
  padding: 13px 20px;
}

.rodape__email {
  display: inline-flex;
  align-items: center;
  min-height: 44px; /* alvo de toque */
  margin-top: 6px;
  color: var(--creme);
  font-weight: 600;
  font-size: 0.92rem;
  word-break: break-all;
}

.rodape__email:hover {
  color: var(--amarelo);
}

.rodape__endereco {
  color: #d5c6b5;
  margin: 14px 0 0;
  font-size: 0.88rem;
  max-width: 30ch;
}

.rodape__insta {
  display: inline-block;
  margin-top: 10px;
  color: var(--amarelo);
  font-weight: 800;
  text-decoration: none;
}

.rodape__horarios {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.88rem;
}

.rodape__horarios li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 5px 0;
  border-bottom: 1px dashed rgba(255, 248, 240, 0.16);
}

.rodape__fechado {
  color: #b9a894;
}

.rodape__fim {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  margin-top: 32px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 248, 240, 0.16);
  font-size: 0.8rem;
  color: #b9a894;
}

@media (max-width: 900px) {
  .rodape__grade {
    grid-template-columns: 1fr 1fr;
    gap: 26px;
  }
}

@media (max-width: 560px) {
  .rodape__grade {
    grid-template-columns: 1fr;
  }
}
</style>
