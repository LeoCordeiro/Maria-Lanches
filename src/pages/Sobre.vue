<template>
  <div>
    <header class="topo">
      <div class="wrap">
        <p class="sobrancelha sobrancelha--branca">A casa</p>
        <h1 class="titulo-secao topo__titulo">Sobre a {{ empresa.nome }}</h1>
      </div>
    </header>

    <section class="secao">
      <div class="wrap historia">
        <div v-revelar>
          <p class="sobrancelha">Do balcão para a sua casa</p>
          <h2 class="titulo-secao">Lanche de lanchonete, feito na hora</h2>
          <p class="lead">
            A {{ empresa.nome }} é uma lanchonete de bairro em {{ empresa.cidade }},
            aberta em 2026 por Maria Cristina. A ideia é simples e não mudou desde o
            primeiro dia: pão na chapa, carne no ponto, montagem na hora do pedido.
          </p>
          <p>
            Nada aqui fica pronto esperando. Cada lanche começa quando a sua
            mensagem chega — por isso o tempo de preparo é o tempo de um lanche
            de verdade, e não o de uma esteira.
          </p>
          <p>
            O pedido vem direto para o nosso WhatsApp, sem intermediário e sem
            taxa de aplicativo. Quem responde do outro lado é a própria casa.
          </p>
        </div>

        <div class="historia__marca" v-revelar="120">
          <img :src="logo" :alt="empresa.nome" width="700" height="690">
          <p class="historia__tag">{{ empresa.tagline }}</p>
        </div>
      </div>
    </section>

    <section class="secao secao--escura">
      <div class="wrap">
        <p class="sobrancelha sobrancelha--clara">Por que pedir aqui</p>
        <h2 class="titulo-secao valores__titulo">O que a gente promete de verdade</h2>

        <div class="valores">
          <article v-for="(v, i) in VALORES" :key="v.titulo" v-revelar="i * 80" class="valor">
            <span class="valor__n">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="valor__titulo">{{ v.titulo }}</h3>
            <p class="apoio">{{ v.texto }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="secao">
      <div class="wrap chamada">
        <div>
          <h2 class="titulo-secao">Bateu a fome?</h2>
          <p class="lead">O cardápio está a um toque daqui.</p>
        </div>
        <router-link to="/" class="btn btn--vermelho">Ver o cardápio</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import logo from '@/assets/marca-mari-lanches.webp'
import { empresa } from '@/config/contato'

// Nada de número inventado (“mais de X clientes”, “nota Y”): a casa é nova.
// O que dá para afirmar é o processo — e é isso que está escrito aqui.
const VALORES = [
  {
    titulo: 'Montado quando você pede',
    texto: 'O lanche vai para a chapa depois que a sua mensagem chega. Nenhum sanduíche fica pronto esperando cliente.',
  },
  {
    titulo: 'Você fala com a casa',
    texto: 'O pedido cai no WhatsApp da lanchonete. Quem confirma, prepara e entrega é a mesma gente.',
  },
  {
    titulo: 'Sem taxa de aplicativo',
    texto: 'Sem intermediário cobrando comissão no meio do caminho — o preço do cardápio é o preço do lanche.',
  },
  {
    titulo: 'Do jeito que você pediu',
    texto: 'Sem cebola, ponto da carne, molho à parte: escreva na observação do item e a cozinha lê junto com o pedido.',
  },
]
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

.historia {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 34px;
  align-items: center;
}

.historia__marca {
  text-align: center;
}

.historia__marca img {
  width: min(100%, 300px);
  height: auto;
  filter: drop-shadow(0 10px 0 rgba(24, 21, 16, 0.16));
}

.historia__tag {
  font-family: var(--fonte-display);
  font-weight: 500;
  font-size: 1.05rem;
  /* Sobre o creme, o #e61010 dá 4,48:1 neste tamanho. */
  color: var(--vermelho-texto);
  margin: 10px 0 0;
}

.valores__titulo {
  margin-bottom: 24px;
}

.valores {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 16px;
}

.valor {
  background: rgba(255, 248, 240, 0.06);
  border: 2px solid rgba(255, 248, 240, 0.22);
  border-radius: var(--raio);
  padding: 20px;
}

.valor__n {
  font-family: var(--fonte-display);
  font-weight: 700;
  font-size: 2rem;
  color: var(--amarelo);
  line-height: 1;
}

.valor__titulo {
  font-size: 1.16rem;
  margin: 8px 0 6px;
}

.chamada {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  background: var(--amarelo);
  border: var(--traco) solid var(--cor-traco);
  border-radius: var(--raio);
  box-shadow: var(--sombra-dura);
  padding: 26px 28px;
}

.chamada .lead {
  margin: 6px 0 0;
  color: var(--escuro);
}

@media (max-width: 860px) {
  .historia {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .historia__marca {
    order: -1;
  }
}
</style>
