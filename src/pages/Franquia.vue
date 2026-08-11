<template>
  <div>
    <header class="topo">
      <div class="wrap topo__grade">
        <div>
          <p class="sobrancelha sobrancelha--branca">Expansão</p>
          <h1 class="titulo-secao topo__titulo">Seja um franqueado {{ empresa.nome }}</h1>
          <p class="lead topo__lead">
            A gente está estruturando a expansão da marca para outros bairros de
            {{ empresa.cidade }} e região. Se você quer abrir uma
            {{ empresa.nome }} no seu ponto, comece a conversa por aqui.
          </p>
        </div>
        <img :src="logo" :alt="empresa.nome" width="700" height="690" class="topo__logo">
      </div>
    </header>

    <!-- O que o franqueado recebe -->
    <section class="secao">
      <div class="wrap">
        <p class="sobrancelha">O que entra no pacote</p>
        <h2 class="titulo-secao secao__titulo">O que a franqueadora entrega</h2>

        <div class="grade">
          <article v-for="(o, i) in OFERTA" :key="o.titulo" v-revelar="i * 70" class="cartao caixa">
            <span class="caixa__n">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="caixa__titulo">{{ o.titulo }}</h3>
            <p class="apoio">{{ o.texto }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Como funciona o processo -->
    <section class="secao secao--escura">
      <div class="wrap">
        <p class="sobrancelha sobrancelha--clara">Passo a passo</p>
        <h2 class="titulo-secao etapas__titulo">Como a conversa acontece</h2>

        <ol class="etapas">
          <li v-for="(e, i) in ETAPAS" :key="e.titulo" v-revelar="i * 70" class="etapa">
            <span class="etapa__n">{{ i + 1 }}</span>
            <div>
              <h3 class="etapa__titulo">{{ e.titulo }}</h3>
              <p class="apoio">{{ e.texto }}</p>
            </div>
          </li>
        </ol>

        <!-- Isto não é enfeite: é exigência da Lei 13.966/2019. -->
        <p class="aviso-lei">
          <Icone nome="aviso" :tamanho="20" />
          <span>
            Nenhum valor é cobrado antes da Circular de Oferta de Franquia (COF).
            A lei exige que ela chegue às suas mãos <strong>no mínimo 10 dias
            antes</strong> de qualquer assinatura ou pagamento — e é nela que estão
            investimento, taxas e obrigações. Esta página não é oferta de venda de
            franquia. Detalhes na
            <router-link to="/politica-de-franquia">política de franquia</router-link>.
          </span>
        </p>
      </div>
    </section>

    <!-- Formulário -->
    <section id="interesse" class="secao">
      <div class="wrap formulario">
        <div class="formulario__texto">
          <p class="sobrancelha">Sem compromisso</p>
          <h2 class="titulo-secao">Conte para a gente sobre você</h2>
          <p class="lead">
            Preencha e o site monta a mensagem no WhatsApp com tudo o que você
            escreveu. Quem responde é a própria casa — não é call center.
          </p>
          <p class="apoio">
            O que você digitar aqui fica só no seu aparelho até você mesmo tocar
            em enviar. Como isso funciona está na
            <router-link to="/privacidade">política de privacidade</router-link>.
          </p>
        </div>

        <form class="cartao formulario__caixa" @submit.prevent>
          <label class="campo-rotulo" for="f-nome">Seu nome</label>
          <input id="f-nome" v-model="f.nome" class="campo" type="text" autocomplete="name" placeholder="Nome completo">

          <label class="campo-rotulo campo-rotulo--sep" for="f-tel">WhatsApp</label>
          <input id="f-tel" v-model="f.telefone" class="campo" type="tel" inputmode="tel" autocomplete="tel" placeholder="(11) 90000-0000">

          <label class="campo-rotulo campo-rotulo--sep" for="f-cidade">Cidade e bairro de interesse</label>
          <input id="f-cidade" v-model="f.cidade" class="campo" type="text" placeholder="Ex.: São Paulo — Vila Mariana">

          <label class="campo-rotulo campo-rotulo--sep" for="f-ponto">Você já tem o ponto?</label>
          <select id="f-ponto" v-model="f.ponto" class="campo">
            <option>Ainda não tenho</option>
            <option>Estou procurando</option>
            <option>Já tenho o ponto</option>
            <option>Já tenho uma lanchonete funcionando</option>
          </select>

          <label class="campo-rotulo campo-rotulo--sep" for="f-prazo">Quando pretende abrir?</label>
          <select id="f-prazo" v-model="f.prazo" class="campo">
            <option>Nos próximos 3 meses</option>
            <option>Em até 6 meses</option>
            <option>Em até 1 ano</option>
            <option>Ainda estou pesquisando</option>
          </select>

          <label class="campo-rotulo campo-rotulo--sep" for="f-msg">Quer contar mais alguma coisa?</label>
          <textarea id="f-msg" v-model="f.mensagem" class="campo" rows="3" maxlength="400" placeholder="Experiência no ramo, dúvidas, o que você já tem pronto…"></textarea>

          <ul v-if="mostrarErros && pendencias.length" class="erros">
            <li v-for="e in pendencias" :key="e">
              <Icone nome="aviso" :tamanho="17" />
              {{ e }}
            </li>
          </ul>

          <a
            :href="link"
            target="_blank"
            rel="noopener"
            class="btn btn--bloco btn--zap formulario__enviar"
            @click="aoEnviar"
          >
            <Icone nome="zap" :tamanho="22" />
            Enviar pelo WhatsApp
          </a>

          <p v-if="enviado" class="ok">
            <Icone nome="check" :tamanho="18" />
            Mensagem aberta no WhatsApp. Se não abriu, toque de novo no botão.
          </p>

          <details class="previa">
            <summary>Ver a mensagem que vai ser enviada</summary>
            <pre>{{ mensagem }}</pre>
          </details>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import Icone from '@/components/Icone.vue'
import logo from '@/assets/marca-mari-lanches.webp'
import { contato, empresa } from '@/config/contato'

// Nada de "investimento a partir de R$ X" ou "retorno em Y meses": esses
// números são obrigatórios na COF e não podem ser chutados no site.
const OFERTA = [
  {
    titulo: 'A marca e a identidade',
    texto: 'Logo, cores, cardápio impresso, embalagem e a fachada no padrão da casa — o cliente reconhece a Maria Lanches de longe.',
  },
  {
    titulo: 'Receita e ficha técnica',
    texto: 'O ponto da carne, a maionese da casa, a montagem e o rendimento de cada lanche. É o que mantém o sabor igual em qualquer unidade.',
  },
  {
    titulo: 'Treinamento na operação',
    texto: 'Chapa, montagem, atendimento, controle de estoque e a rotina de abrir e fechar a loja, com acompanhamento na abertura.',
  },
  {
    titulo: 'Fornecedores e negociação',
    texto: 'A lista de fornecedores homologados e as condições já negociadas pela rede, para você não começar comprando caro.',
  },
  {
    titulo: 'Este site de pedidos',
    texto: 'A unidade entra no cardápio digital com o WhatsApp dela, sem taxa de aplicativo comendo a margem de cada pedido.',
  },
  {
    titulo: 'Suporte depois da abertura',
    texto: 'Canal direto para dúvida de operação, ajuste de cardápio e material das campanhas da rede.',
  },
]

const ETAPAS = [
  {
    titulo: 'Você manda a mensagem',
    texto: 'Preenche o formulário abaixo com cidade, bairro e o momento em que pretende abrir. A conversa começa no WhatsApp.',
  },
  {
    titulo: 'Conversa e Circular de Oferta',
    texto: 'Se fizer sentido para os dois lados, você recebe a Circular de Oferta de Franquia com investimento, taxas e obrigações por escrito.',
  },
  {
    titulo: 'Dez dias para ler com calma',
    texto: 'A lei dá esse prazo antes de qualquer assinatura ou pagamento. Leve o documento para o seu contador e para o seu advogado.',
  },
  {
    titulo: 'Ponto, contrato e obra',
    texto: 'Avaliação do ponto, assinatura do contrato de franquia e adequação da loja ao padrão da marca.',
  },
  {
    titulo: 'Treinamento e abertura',
    texto: 'Treinamento da equipe, teste de operação e inauguração com acompanhamento da franqueadora.',
  },
]

const f = reactive({
  nome: '',
  telefone: '',
  cidade: '',
  ponto: 'Ainda não tenho',
  prazo: 'Nos próximos 3 meses',
  mensagem: '',
})

const enviado = ref(false)
const mostrarErros = ref(false)

const pendencias = computed(() => {
  const falta = []
  if (!f.nome.trim()) falta.push('Informe seu nome')
  if (!f.telefone.trim()) falta.push('Informe um WhatsApp para a gente responder')
  if (!f.cidade.trim()) falta.push('Informe a cidade e o bairro de interesse')
  return falta
})

const mensagem = computed(() => {
  const l = [`*Quero ser franqueado ${empresa.nome}*`, '']
  l.push(`Nome: ${f.nome.trim() || '—'}`)
  l.push(`WhatsApp: ${f.telefone.trim() || '—'}`)
  l.push(`Cidade e bairro: ${f.cidade.trim() || '—'}`)
  l.push(`Ponto: ${f.ponto}`)
  l.push(`Pretende abrir: ${f.prazo}`)
  if (f.mensagem.trim()) l.push('', f.mensagem.trim())
  return l.join('\n')
})

const link = computed(
  () => `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(mensagem.value)}`
)

function aoEnviar(evento) {
  if (pendencias.value.length) {
    evento.preventDefault()
    mostrarErros.value = true
    return
  }
  enviado.value = true
}
</script>

<style scoped>
.topo {
  background: linear-gradient(178deg, var(--vermelho) 0%, var(--vermelho-fundo) 100%);
  color: var(--branco);
  padding: 36px 0 34px;
  border-bottom: var(--traco) solid var(--cor-traco);
}

.topo__grade {
  display: grid;
  grid-template-columns: 1.4fr 0.6fr;
  gap: 24px;
  align-items: center;
}

.topo__titulo {
  color: var(--branco);
}

.topo__lead {
  color: var(--branco);
  margin: 12px 0 0;
}

.topo__logo {
  width: min(100%, 190px);
  height: auto;
  justify-self: center;
  filter: drop-shadow(0 8px 0 rgba(0, 0, 0, 0.22));
}

/* ---- oferta ---- */
.secao__titulo {
  margin-bottom: 24px;
}

.grade {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 18px;
}

.caixa {
  padding: 20px;
}

.caixa__n {
  font-family: var(--fonte-display);
  font-weight: 700;
  font-size: 1.9rem;
  /* Laranja sobre branco dá 2,26:1 e reprova até o mínimo de texto grande.
     O laranja da marca é cor de PREENCHIMENTO (botão), não de texto claro. */
  color: var(--vermelho-texto);
  line-height: 1;
}

.caixa__titulo {
  font-size: 1.16rem;
  margin: 6px 0 6px;
}

/* ---- etapas ---- */
.etapas__titulo {
  margin-bottom: 22px;
}

.etapas {
  list-style: none;
  margin: 0 0 22px;
  padding: 0;
  display: grid;
  gap: 14px;
}

.etapa {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: rgba(255, 248, 240, 0.06);
  border: 2px solid rgba(255, 248, 240, 0.22);
  border-radius: var(--raio);
  padding: 16px 18px;
}

.etapa__n {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 2px solid var(--cor-traco);
  background: var(--amarelo);
  color: var(--escuro);
  font-family: var(--fonte-display);
  font-weight: 700;
  font-size: 1.1rem;
}

.etapa__titulo {
  font-size: 1.12rem;
  margin-bottom: 4px;
}

.etapa p {
  margin: 0;
}

.aviso-lei {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: var(--amarelo);
  color: var(--escuro);
  border: var(--traco) solid var(--cor-traco);
  border-radius: var(--raio);
  box-shadow: var(--sombra-dura);
  padding: 18px 20px;
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.6;
}

.aviso-lei a {
  color: var(--escuro);
  font-weight: 800;
}

/* ---- formulário ---- */
.formulario {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 26px;
  align-items: start;
}

.formulario__texto .lead {
  margin-top: 14px;
}

.formulario__caixa {
  padding: 22px;
}

.campo-rotulo--sep {
  margin-top: 14px;
}

.formulario__enviar {
  margin-top: 18px;
}

.erros {
  list-style: none;
  margin: 16px 0 0;
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

.ok {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0 0;
  font-weight: 700;
  font-size: 0.92rem;
  color: #1f6b33;
}

.previa {
  margin-top: 14px;
  font-size: 0.88rem;
}

.previa summary {
  display: flex;
  align-items: center;
  min-height: 44px;
  cursor: pointer;
  font-weight: 800;
  color: var(--marrom);
}

.previa pre {
  margin: 8px 0 0;
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

@media (max-width: 860px) {
  .topo__grade,
  .formulario {
    grid-template-columns: 1fr;
  }

  .topo__logo {
    display: none;
  }
}
</style>
