<template>
  <TextoLegal titulo="Política de franquia">
    <p class="atencao">
      <strong>Este documento não é a Circular de Oferta de Franquia (COF) e não é
      contrato.</strong> Ele explica como a gente conduz a conversa com quem quer
      abrir uma unidade. Valores, taxas e obrigações só existem na COF, que a
      Lei 13.966/2019 manda entregar <strong>no mínimo 10 dias antes</strong> de
      qualquer assinatura ou pagamento.
    </p>

    <h2>Nada é cobrado antes da COF</h2>
    <p>
      Não cobramos taxa de análise, de reserva de território, de "estudo de
      viabilidade" nem qualquer valor para você conhecer o modelo. Se alguém
      pedir dinheiro em nome da {{ empresa.nome }} antes da entrega da Circular
      de Oferta de Franquia, <strong>não pague</strong> e fale direto com a gente
      pelo WhatsApp {{ whatsappLegivel() }}.
    </p>

    <h2>O que a franqueadora oferece</h2>
    <ul>
      <li>Direito de usar a marca e a identidade visual no ponto autorizado.</li>
      <li>Cardápio, fichas técnicas e padrão de preparo.</li>
      <li>Treinamento de operação e acompanhamento na abertura.</li>
      <li>Lista de fornecedores homologados e condições negociadas pela rede.</li>
      <li>Inclusão da unidade no cardápio digital da rede, com o WhatsApp dela.</li>
      <li>Canal de suporte para dúvidas de operação depois da abertura.</li>
    </ul>
    <p>
      O detalhamento de cada item, com prazos e limites, é o que a COF traz por
      escrito.
    </p>

    <h2>O que se espera do franqueado</h2>
    <ul>
      <li>Manter o padrão de preparo, apresentação e atendimento da marca.</li>
      <li>
        Usar os insumos e fornecedores homologados naquilo que define o sabor e a
        segurança do produto.
      </li>
      <li>
        Cuidar das licenças do próprio negócio — alvará, vigilância sanitária,
        registro do estabelecimento e obrigações trabalhistas e fiscais da
        unidade, que são responsabilidade de quem opera a loja.
      </li>
      <li>
        Usar a marca só no ponto autorizado e nos materiais aprovados, sem criar
        perfil, site ou promoção em nome da rede sem combinar antes.
      </li>
      <li>Participar dos treinamentos e das atualizações de cardápio.</li>
    </ul>

    <h2>Preço de venda é sugestão, não imposição</h2>
    <p>
      A franqueadora pode sugerir preços e sugerir campanhas, mas
      <strong>quem define o preço de venda ao consumidor é o franqueado</strong>.
      Impor preço de revenda é infração à ordem econômica (Lei 12.529/2011,
      art. 36, § 3º, IX) — e por isso nenhuma tabela nossa é obrigatória.
    </p>

    <h2>Não existe promessa de lucro</h2>
    <p>
      A gente não promete faturamento, lucro, prazo de retorno nem número de
      pedidos. Resultado de lanchonete depende de ponto, operação, equipe,
      concorrência e do próprio franqueado. Qualquer projeção que apareça na COF
      virá identificada como projeção, com as premissas que a sustentam — e
      projeção não é garantia.
    </p>

    <h2>Território</h2>
    <p>
      As condições de exclusividade ou de raio de atuação, quando houver, são
      definidas caso a caso e ficam escritas na COF e no contrato. Enquanto não
      estiverem assinadas, <strong>nenhuma área está reservada</strong> para
      ninguém, mesmo que a conversa já esteja avançada.
    </p>

    <h2>Prazo, renovação e saída</h2>
    <p>
      Prazo do contrato, condições de renovação, transferência da unidade para
      terceiros e o que acontece no encerramento — incluindo a retirada da marca
      da fachada e dos materiais — são tratados no contrato de franquia, cujo
      modelo acompanha a COF para você ler antes de decidir.
    </p>

    <h2>Situação da marca</h2>
    <p v-if="!franquia.marcaRegistrada">
      A marca {{ empresa.nome }} está em processo de proteção junto ao INPI. A
      situação do registro na data da negociação é informada na COF, como a lei
      exige — é uma informação relevante para a sua decisão e não fica escondida.
    </p>
    <p v-else>
      A marca {{ empresa.nome }} é registrada no INPI, e a situação do registro
      consta na COF.
    </p>

    <h2>Seus dados no processo</h2>
    <p>
      O formulário de interesse não grava nada em servidor: ele monta uma
      mensagem e abre o WhatsApp para você enviar. O que você mandar é usado
      apenas para conduzir essa conversa. O tratamento está descrito na
      <router-link to="/privacidade">política de privacidade</router-link>.
    </p>

    <h2>Esta página não é oferta</h2>
    <p>
      As informações publicadas aqui e na página
      <router-link to="/franquia">Seja um franqueado</router-link> têm caráter
      informativo e não vinculam as partes. A relação de franquia só se
      estabelece com a entrega da COF, o cumprimento do prazo legal de 10 dias e
      a assinatura do contrato.
    </p>

    <p v-if="franquia.cofUrl">
      <a :href="franquia.cofUrl" target="_blank" rel="noopener">
        Baixar a Circular de Oferta de Franquia
      </a>
    </p>
  </TextoLegal>
</template>

<script setup>
import TextoLegal from '@/components/TextoLegal.vue'
import { empresa, franquia, whatsappLegivel } from '@/config/contato'
</script>
