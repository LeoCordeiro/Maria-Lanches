<template>
  <TextoLegal titulo="Política de privacidade">
    <p class="atencao">
      <strong>Resumo em uma linha:</strong> este site não tem cadastro, não tem
      banco de dados e não guarda nada em servidor nosso. O que você digita fica
      no seu aparelho até você mesmo enviar a mensagem pelo WhatsApp.
    </p>

    <h2>Quem é o responsável</h2>
    <p>
      Os dados tratados a partir deste site são de responsabilidade de
      {{ empresa.razaoSocial }} (CNPJ {{ empresa.cnpj }}), que atende pelo nome
      fantasia {{ empresa.nome }}, em {{ empresa.cidade }}/{{ empresa.uf }}.
      Para qualquer assunto desta política, fale com a gente pelo WhatsApp
      {{ whatsappLegivel() }}.
    </p>

    <h2>O que o site faz com o que você digita</h2>
    <p>
      O cardápio, o carrinho e os formulários funcionam inteiramente dentro do
      seu navegador. Nome, telefone, endereço, forma de pagamento e observações
      do pedido são usados para <strong>montar uma mensagem de texto</strong> —
      e essa mensagem só sai daqui quando você toca em enviar e o WhatsApp abre
      no seu aparelho, com você no controle do envio.
    </p>
    <p>
      Não existe formulário que grave em servidor nosso, não existe login e não
      existe banco de dados deste site. A partir do momento em que você envia a
      mensagem, a conversa passa a acontecer no WhatsApp, como qualquer outra.
    </p>

    <h2>O que fica guardado no seu aparelho</h2>
    <p>
      Para você não perder o pedido ao trocar de aba ou ao ir até o WhatsApp e
      voltar, o site guarda no armazenamento local do próprio navegador
      (<em>localStorage</em>) os itens do carrinho e os dados que você preencheu
      na tela do pedido.
    </p>
    <ul>
      <li>Isso fica <strong>no seu dispositivo</strong>, não no nosso servidor.</li>
      <li>Ninguém além de você tem acesso a esse conteúdo.</li>
      <li>
        Para apagar: use "Esvaziar o pedido" na tela do carrinho ou limpe os
        dados do site nas configurações do seu navegador.
      </li>
    </ul>
    <p>
      Este site <strong>não usa cookies próprios</strong>, não tem ferramenta de
      analytics, não tem pixel de rede social e não faz publicidade
      comportamental.
    </p>

    <h2>Terceiros que participam do funcionamento</h2>
    <p>
      Mesmo sem servidor próprio, três serviços entram no caminho e podem
      registrar dados técnicos, como o seu endereço IP:
    </p>
    <ul>
      <li>
        <strong>Netlify</strong> — hospeda os arquivos do site e mantém registros
        de acesso do servidor, como qualquer hospedagem.
      </li>
      <li>
        <strong>Google Fonts</strong> — as fontes do site são carregadas dos
        servidores do Google, então o seu IP e informações do navegador chegam a
        eles no momento em que a página abre.
      </li>
      <li>
        <strong>WhatsApp (Meta)</strong> — é por onde a conversa acontece
        depois do envio, sob os termos e a política de privacidade do próprio
        WhatsApp.
      </li>
    </ul>

    <h2>Por que tratamos esses dados</h2>
    <p>
      Os dados que você nos manda pelo WhatsApp são usados para executar o que
      você pediu — preparar, entregar ou separar para retirada — e para
      responder dúvidas. É o que a LGPD chama de execução de contrato e de
      procedimentos preliminares a pedido do titular (art. 7º, V), além do
      legítimo interesse no atendimento.
    </p>
    <p>
      No caso do formulário de franquia, os dados são usados apenas para dar
      andamento à conversa sobre o programa de franquia.
    </p>

    <h2>Por quanto tempo</h2>
    <p>
      As conversas do WhatsApp ficam guardadas enquanto forem necessárias para o
      atendimento, para resolver problemas com pedidos e para cumprir obrigações
      legais. Você pode pedir a exclusão a qualquer momento — respeitando o que a
      lei obriga a guardar (por exemplo, documentos fiscais).
    </p>

    <h2>Seus direitos</h2>
    <p>
      A LGPD (art. 18) garante que você peça confirmação de tratamento, acesso,
      correção, anonimização, portabilidade, eliminação e informação sobre
      compartilhamento. Para exercer qualquer um deles, mande mensagem no
      WhatsApp {{ whatsappLegivel() }}. Respondemos no prazo legal.
    </p>

    <h2>Crianças e adolescentes</h2>
    <p>
      O site não é direcionado a menores de 18 anos e não coleta dados de
      crianças de forma consciente. Pedidos de menores devem ser feitos com o
      acompanhamento de um responsável.
    </p>

    <h2>Segurança</h2>
    <p>
      O site é servido por HTTPS. Como não guardamos dados em servidor nosso, a
      superfície de risco é pequena por construção — mas nenhum sistema é
      infalível, e as conversas no WhatsApp dependem também da segurança do seu
      próprio aparelho.
    </p>

    <h2>Mudanças nesta política</h2>
    <p>
      Se o site passar a usar formulário com banco de dados, analytics, pixel ou
      qualquer ferramenta que colete dados, esta página muda junto — antes da
      mudança entrar no ar. A data de atualização no topo indica a versão vigente.
    </p>
  </TextoLegal>
</template>

<script setup>
import TextoLegal from '@/components/TextoLegal.vue'
import { empresa, whatsappLegivel } from '@/config/contato'
</script>
