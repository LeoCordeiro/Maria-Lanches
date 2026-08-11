<!--
  Casca dos três documentos legais: tipografia de leitura, data de atualização
  e bloco do responsável. O conteúdo entra por <slot>.
-->
<template>
  <div>
    <header class="topo">
      <div class="wrap">
        <p class="sobrancelha sobrancelha--branca">Documento</p>
        <h1 class="titulo-secao topo__titulo">{{ titulo }}</h1>
      </div>
    </header>

    <section class="secao">
      <div class="wrap legal">
        <p class="legal__data">Última atualização: {{ legalAtualizadoEm }}</p>

        <slot />

        <div class="legal__pe">
          <p class="legal__rot">Responsável por este site</p>
          <p>{{ empresa.razaoSocial }}</p>
          <p>CNPJ {{ empresa.cnpj }} — {{ empresa.cidade }}/{{ empresa.uf }}</p>
          <p v-if="contato.endereco">{{ contato.endereco }}</p>
          <p class="legal__contato">
            Dúvidas sobre este documento:
            <a :href="wa" target="_blank" rel="noopener">WhatsApp {{ whatsappLegivel() }}</a>
            <span v-if="contato.email"> ou <a :href="`mailto:${contato.email}`">{{ contato.email }}</a></span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { contato, empresa, legalAtualizadoEm, waLink, whatsappLegivel } from '@/config/contato'

defineProps({ titulo: { type: String, required: true } })

const wa = waLink('Olá! Tenho uma dúvida sobre um documento do site.')
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

.legal {
  max-width: 760px;
}

.legal__data {
  font-family: var(--fonte-corpo);
  font-weight: 800;
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--marrom);
  padding-bottom: 16px;
  border-bottom: 2px dashed rgba(24, 21, 16, 0.22);
  margin: 0 0 26px;
}

/* :deep porque o conteúdo vem por <slot> e o scoped não alcança */
.legal :deep(h2) {
  font-family: var(--fonte-display);
  font-weight: 600;
  font-size: clamp(1.24rem, 2.6vw, 1.55rem);
  margin: 34px 0 10px;
  line-height: 1.2;
}

.legal :deep(h2:first-of-type) {
  margin-top: 0;
}

.legal :deep(p) {
  font-size: 1.02rem;
  line-height: 1.72;
  margin: 0 0 14px;
  max-width: 66ch;
}

.legal :deep(ul) {
  margin: 0 0 16px;
  padding-left: 20px;
  max-width: 66ch;
}

.legal :deep(li) {
  line-height: 1.66;
  margin-bottom: 7px;
}

.legal :deep(strong) {
  font-weight: 800;
}

/* Caixa de destaque para o que o leitor não pode passar batido. */
.legal :deep(.atencao) {
  background: var(--amarelo);
  border: 2px solid var(--cor-traco);
  border-radius: var(--raio-sm);
  padding: 16px 18px;
  margin: 0 0 20px;
  max-width: none;
}

.legal__pe {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px dashed rgba(24, 21, 16, 0.22);
  font-size: 0.94rem;
  line-height: 1.6;
  color: var(--marrom);
}

.legal__pe p {
  margin: 0 0 2px;
}

.legal__rot {
  font-family: var(--fonte-corpo);
  font-weight: 900;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--escuro);
  margin-bottom: 8px !important;
}

.legal__contato {
  margin-top: 12px !important;
}
</style>
