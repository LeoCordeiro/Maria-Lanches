<template>
  <TextoLegal titulo="Termos de uso">
    <p class="atencao">
      <strong>O que este site é:</strong> um cardápio digital que monta o seu
      pedido e abre o WhatsApp com ele pronto. <strong>O que ele não é:</strong>
      uma loja com pagamento online. Nenhum valor é cobrado aqui — o pedido só
      vira pedido depois que a gente confirma na conversa.
    </p>

    <h2>Quem oferece este site</h2>
    <p>
      Este site é mantido por {{ empresa.razaoSocial }} (CNPJ {{ empresa.cnpj }}),
      nome fantasia {{ empresa.nome }}, em {{ empresa.cidade }}/{{ empresa.uf }}.
      Ao usar o site, você concorda com estes termos.
    </p>

    <h2>Como o pedido funciona</h2>
    <ul>
      <li>Você escolhe os itens e o site calcula o total dos produtos.</li>
      <li>
        Ao enviar, abre-se uma conversa no WhatsApp com a lista, o total e os
        dados que você preencheu.
      </li>
      <li>
        <strong>O pedido só está confirmado quando a gente responde</strong>
        confirmando disponibilidade, valor final e prazo. Enquanto não houver
        essa resposta, não há pedido.
      </li>
      <li>
        O pagamento acontece na entrega ou na retirada, pelas formas informadas
        na página de contato. O site não processa pagamento e não guarda dados
        de cartão.
      </li>
    </ul>

    <h2>Preços, itens e disponibilidade</h2>
    <p>
      O cardápio é publicado de boa-fé, mas <strong>não é uma oferta
      vinculante</strong>: preços, itens e composição podem mudar sem aviso, e um
      item pode acabar no meio do expediente. Se houver diferença entre o site e
      o que informarmos na conversa, vale o que for confirmado no WhatsApp antes
      do preparo — e você pode desistir sem custo nesse momento.
    </p>
    <p>
      O valor mostrado no site é o dos produtos. <strong>A taxa de entrega é
      combinada na conversa</strong>, porque depende do endereço.
    </p>

    <h2>Fotos do cardápio</h2>
    <p>
      As imagens servem para ilustrar o item. A apresentação real pode variar em
      montagem, porção aparente e acompanhamento, conforme a descrição escrita de
      cada lanche — é a descrição que define o que você recebe.
    </p>

    <h2>Alergias, intolerâncias e restrições</h2>
    <p>
      Nossa cozinha manipula, no mesmo ambiente, ingredientes como leite, ovo,
      trigo (glúten), soja e derivados. <strong>Não é possível garantir ausência
      de contato cruzado.</strong> Se você tem alergia ou restrição alimentar,
      avise na observação do item e confirme conosco na conversa antes de
      fechar o pedido.
    </p>

    <h2>Cancelamento</h2>
    <p>
      Alimento preparado sob encomenda é perecível e feito especialmente para
      você. Por isso:
    </p>
    <ul>
      <li>
        <strong>Antes de o preparo começar</strong>, é só avisar na conversa que
        o pedido é cancelado sem custo.
      </li>
      <li>
        <strong>Depois de o preparo começar</strong>, o cancelamento depende de
        acordo, já que o item não pode ser reaproveitado.
      </li>
      <li>
        Se algo chegar errado, faltando ou fora do padrão, avise no mesmo dia:
        a gente resolve com troca, novo preparo ou devolução do valor, conforme
        o caso e o Código de Defesa do Consumidor.
      </li>
    </ul>

    <h2>Uso do site</h2>
    <p>
      Você se compromete a fornecer informações verdadeiras — principalmente
      endereço e telefone, sem os quais a entrega não acontece — e a não usar o
      site para fazer pedidos falsos, tentar burlar o funcionamento ou
      sobrecarregar o serviço.
    </p>

    <h2>Marca e conteúdo</h2>
    <p>
      A marca {{ empresa.nome }}, o logotipo, os textos, o desenho do site e as
      descrições do cardápio pertencem à empresa e não podem ser copiados,
      reproduzidos ou usados em outro negócio sem autorização por escrito.
    </p>

    <h2>Disponibilidade</h2>
    <p>
      O site pode ficar fora do ar por manutenção, falha da hospedagem ou
      problema de conexão. Nesses casos, o pedido continua possível pelo
      WhatsApp {{ whatsappLegivel() }}. Não nos responsabilizamos por
      indisponibilidade de serviços de terceiros, como o próprio WhatsApp.
    </p>

    <h2>Franquia</h2>
    <p>
      As informações sobre franquia publicadas aqui têm caráter informativo e
      <strong>não constituem oferta de venda de franquia</strong>. As condições
      só existem na Circular de Oferta de Franquia, entregue conforme a
      Lei 13.966/2019 — o assunto está detalhado na
      <router-link to="/politica-de-franquia">política de franquia</router-link>.
    </p>

    <h2>Mudanças e foro</h2>
    <p>
      Estes termos podem ser atualizados; a data no topo indica a versão vigente.
      Aplica-se a legislação brasileira, em especial o Código de Defesa do
      Consumidor, e fica eleito o foro da comarca de
      {{ empresa.cidade }}/{{ empresa.uf }} para o que não for resolvido
      diretamente entre as partes.
    </p>
  </TextoLegal>
</template>

<script setup>
import TextoLegal from '@/components/TextoLegal.vue'
import { empresa, whatsappLegivel } from '@/config/contato'
</script>
