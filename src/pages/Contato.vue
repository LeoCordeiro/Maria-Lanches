<template>
  <div>
    <header class="topo">
      <div class="wrap">
        <p class="sobrancelha sobrancelha--branca">Fale com a gente</p>
        <h1 class="titulo-secao topo__titulo">Contato e localização</h1>
        <p class="lead topo__lead">
          O pedido e a dúvida vão para o mesmo lugar: o WhatsApp da lanchonete.
        </p>
      </div>
    </header>

    <section class="secao">
      <div class="wrap grade">
        <article class="cartao caixa caixa--zap" v-revelar>
          <span class="caixa__icone"><Icone nome="zap" :tamanho="26" /></span>
          <h2 class="caixa__titulo">WhatsApp</h2>
          <p class="caixa__destaque">{{ whatsappLegivel() }}</p>
          <p class="apoio">Pedidos, dúvidas e reservas de porção grande.</p>
          <a :href="linkZap" target="_blank" rel="noopener" class="btn btn--zap">
            <Icone nome="zap" :tamanho="20" />
            Abrir conversa
          </a>
        </article>

        <article class="cartao caixa" v-revelar="80">
          <span class="caixa__icone"><Icone nome="pino" :tamanho="26" /></span>
          <h2 class="caixa__titulo">Onde fica</h2>
          <template v-if="contato.endereco">
            <p class="caixa__endereco">{{ contato.endereco }}</p>
            <p class="apoio" v-if="entrega.retiradaNoLocal">Você pode retirar o pedido no balcão.</p>
            <a v-if="contato.mapa" :href="contato.mapa" target="_blank" rel="noopener" class="btn btn--creme">
              Ver no mapa
            </a>
          </template>
          <template v-else>
            <p class="caixa__endereco">Atendemos só por entrega em {{ empresa.cidade }}.</p>
            <p class="apoio">Combine o endereço direto na conversa do WhatsApp.</p>
          </template>
        </article>

        <article class="cartao caixa" v-revelar="160">
          <span class="caixa__icone"><Icone nome="relogio" :tamanho="26" /></span>
          <h2 class="caixa__titulo">Horário</h2>
          <ul class="horarios">
            <li v-for="h in horarios" :key="h.dia" :class="{ fechado: h.fechado }">
              <span>{{ h.dia }}</span>
              <span>{{ h.fechado ? 'Fechado' : `${h.abre} às ${h.fecha}` }}</span>
            </li>
          </ul>
          <p class="status" :class="{ 'status--off': !status.aberto }">
            <i class="ponto" aria-hidden="true"></i>
            <span v-if="status.aberto">Aberto agora, até {{ status.fecha }}</span>
            <span v-else-if="status.proximo">Fechado — abre {{ status.proximo.dia }} às {{ status.proximo.abre }}</span>
            <span v-else>Fechado agora</span>
          </p>
        </article>

        <article class="cartao caixa" v-revelar="240">
          <span class="caixa__icone"><Icone nome="moto" :tamanho="26" /></span>
          <h2 class="caixa__titulo">Entrega e pagamento</h2>
          <p v-if="entrega.faz" class="apoio">
            Entrega em cerca de {{ entrega.tempoMedio }}<span v-if="entrega.bairrosAtendidos">, em {{ entrega.bairrosAtendidos }}</span>.
            A taxa depende do endereço e é combinada na conversa.
          </p>
          <p v-else class="apoio">No momento trabalhamos só com retirada no balcão.</p>

          <p class="rotulo-pag">Formas de pagamento</p>
          <ul class="pagamentos">
            <li v-for="p in pagamentos" :key="p" class="selo">{{ p }}</li>
          </ul>
          <p class="apoio">O site não processa pagamento — você paga na entrega ou na retirada.</p>
        </article>
      </div>
    </section>

    <section class="secao secao--escura">
      <div class="wrap chamada">
        <div>
          <p class="sobrancelha sobrancelha--clara">Já sabe o que quer?</p>
          <h2 class="titulo-secao">Monte seu pedido em um minuto</h2>
        </div>
        <router-link to="/" class="btn">Ver o cardápio</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Icone from '@/components/Icone.vue'
import {
  contato,
  empresa,
  entrega,
  horarios,
  pagamentos,
  statusAgora,
  waLink,
  whatsappLegivel,
} from '@/config/contato'

const status = ref(statusAgora())
const linkZap = waLink(`Olá! Vim pelo site da ${empresa.nome} e queria tirar uma dúvida.`)
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

/* 250px e não 266px: com o gap de 20px dentro de 1100px úteis, 266 só cabe
   3 vezes e o quarto card cai sozinho numa linha vazia. */
.grade {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  align-items: start;
}

.caixa {
  padding: 22px;
}

.caixa--zap {
  background: #eaffef;
}

.caixa__icone {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 999px;
  border: 2px solid var(--cor-traco);
  background: var(--amarelo);
  color: var(--escuro);
  margin-bottom: 12px;
}

.caixa--zap .caixa__icone {
  background: var(--verde-zap);
}

.caixa__titulo {
  font-size: 1.3rem;
  margin-bottom: 8px;
}

.caixa__destaque {
  font-family: var(--fonte-display);
  font-weight: 700;
  font-size: 1.6rem;
  color: var(--vermelho);
  margin: 0 0 4px;
}

.caixa__endereco {
  font-weight: 700;
  margin: 0 0 8px;
}

.caixa .btn {
  margin-top: 12px;
}

.horarios {
  list-style: none;
  margin: 0 0 12px;
  padding: 0;
  font-size: 0.9rem;
}

.horarios li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 0;
  border-bottom: 1px dashed rgba(24, 21, 16, 0.2);
}

.horarios .fechado {
  color: var(--marrom);
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-weight: 800;
  font-size: 0.86rem;
  background: #e6f7e9;
  border: 2px solid var(--cor-traco);
  border-radius: 999px;
  padding: 7px 13px;
}

.status--off {
  background: #ffe9e9;
}

.ponto {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #1f9d43;
}

.status--off .ponto {
  background: var(--vermelho);
}

.rotulo-pag {
  font-family: var(--fonte-corpo);
  font-weight: 900;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--marrom);
  margin: 16px 0 8px;
}

.pagamentos {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 0 0 10px;
  padding: 0;
}

.chamada {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}
</style>
