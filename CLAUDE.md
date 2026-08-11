# Maria Lanches — cardápio digital com pedido pelo WhatsApp

Site da **Maria Lanches** (MEI, São Paulo/SP) — lanchonete aberta em 05/2026.
Razão social: 66.870.166 Maria Cristina Pereira Dias · CNAE 56.11-2/03.

Diferente da maioria dos sites do Empresa Pronta, este **não é institucional**:
o coração é o cardápio com carrinho. O cliente monta o pedido no site e
finaliza no WhatsApp — sem checkout, sem pagamento online, sem backend.
Desde 11/08/2026 o site também capta interessados em **franquia**.

## Stack

Vue 3 + Vuetify 3 (só como shell + alguns componentes) + vue-router com
`createWebHashHistory` + Pinia (carrinho). Sem PWA (incompatível com Node 24).
Build: `vue-cli-service`. Deploy: Netlify.

```bash
npm install
npm run serve    # dev
npm run build    # produção → dist/
```

## Regras deste projeto (não quebrar)

- **`<img>` normal, nunca `v-img`** — o `v-img` põe fundo branco atrás da arte.
- **Sem `v-app-bar`** — ele injeta `padding-top` no `v-main` e abre costura
  entre header e hero. O header é HTML próprio, fixo; o respiro vem da regra
  `.v-main { padding-top: … }` no `theme.css`.
- **Vuetify sem `import 'vuetify/styles'`** — o CSS global custa ~244 KB para
  meia dúzia de componentes. Consequências que já mordidas:
  - **classes utilitárias do Vuetify não existem** (`d-flex`, `ma-4`,
    `text-h4`). Escreva CSS próprio.
  - **as classes de `<Transition>` do Vuetify também não existem.** Ver
    "Transição de página" abaixo.
- **Nada de `@mdi/font`** — seriam ~300 KB de fonte para sete desenhos, e nome
  de ícone errado no MDI falha calado (não desenha nada e não avisa). Os ícones
  são SVG inline em `src/components/Icone.vue`.
- **Padding de seção compacto** (`--sec-pad: 48px`).
- **Cor só pelas variáveis do `theme.css`.** Nenhum componente escreve hex.
- **Vermelho tem dois tons de propósito:** `--vermelho` (#e61010) para fundo e
  texto grande; `--vermelho-texto` (#c90c0c) para **texto pequeno sobre fundo
  claro** — o #e61010 dá 4,48:1 sobre o creme e reprova o AA por 0,02.
- **Amarelo nunca em texto pequeno sobre vermelho** (3,01:1). Sobre o vermelho
  use `.sobrancelha--branca`; o amarelo só vale sobre `--escuro` (11,6:1).
- **Mobile-first**: pedido de lanchonete entra quase todo pelo celular.
  Alvo de toque mínimo 44px — medido nas 4 rotas.

## Transição de página (armadilha que custou tempo)

O `<v-fade-transition mode="out-in">` **foi removido**. Dois problemas
empilhados:

1. O CSS das classes `fade-transition-*` mora no `vuetify/styles` global, que
   este projeto não importa — sem ele não há duração e a transição fica sem
   sentido visual.
2. Pior: com `mode="out-in"` a saída da página velha só avança dentro de um
   `requestAnimationFrame`. Em aba que não produz frame (janela ocluída,
   webview embutida, headless) ela **nunca termina e a rota nova nunca
   renderiza** — o sintoma é o `fade-transition-leave-from` preso no elemento
   e a página ficando uma navegação atrasada.

No lugar entrou crossfade em CSS puro: `<component :is>` com `:key="route.path"`
e a classe `.pagina-entra` (`@keyframes pagina-aparece` no `theme.css`).
A troca de DOM é imediata; a animação é só acabamento. **Não voltar para
`<Transition>` com `mode="out-in"` sem testar navegação num browser que
produza frames.**

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| WhatsApp, endereço, Instagram, horário, entrega, pagamentos | `src/config/contato.js` — **único ponto** |
| Itens, preços, categorias, fotos, fornecedores | `src/config/cardapio.js` |
| Nome da marca em todo o site | `empresa.nome` em `contato.js` |
| Paleta, tipografia, botões, animações | `src/assets/theme.css` |
| Regra do carrinho e mensagem do WhatsApp | `src/store/carrinho.js` |
| Animação de "adicionar ao carrinho" | `src/utils/voar.js` |
| Ícones | `src/components/Icone.vue` |
| Ligar/desligar a franquia no site | `franquia.ativa` em `contato.js` |
| Data no topo dos documentos legais | `legalAtualizadoEm` em `contato.js` |

## Carrinho

Pinia (`src/store/carrinho.js`), sem login e sem backend.

- **Persiste em `localStorage`** (`mari-lanches:carrinho`), itens **e** dados do
  cliente. Quem sai para o WhatsApp e volta não perde o que digitou.
- **Itens com observações diferentes ocupam linhas separadas** — "1x Refri
  (Guaraná)" e "1x Refri (Coca)" não podem virar "2x Refri".
- `pendencias()` devolve o que falta preencher; o botão de enviar dá
  `preventDefault` e mostra a lista em vez de abrir o WhatsApp incompleto.
- `mensagemPedido()` monta o texto; o link é
  `https://wa.me/<numero>?text=<encodeURIComponent(mensagem)>`.
  A página do pedido mostra a prévia da mensagem num `<details>` — o cliente vê
  exatamente o que vai enviar.
- **Taxa de entrega não é inventada.** Com `entrega.taxa = null` a mensagem diz
  "(taxa de entrega a combinar)". Se um dia houver valor fixo, preencher em
  `contato.js` que a mensagem passa a somar sozinha.

## Expansão futura (central de pedidos do bairro)

Todo item do cardápio tem `fornecedor`, e existe o mapa `fornecedores` com
`daCasa: true/false`. Hoje tudo é `casa`. Quando entrar um parceiro:

1. adicionar em `fornecedores` com `daCasa: false`
2. apontar `fornecedor: 'id_do_parceiro'` nos itens dele

O card mostra o selo do parceiro sozinho (`seloFornecedor()`); nada mais precisa
mudar. **Enquanto isso não existir, o site não fala de "central do bairro"** —
prometer no site o que ainda não opera é problema, não marketing.

## Identidade visual

Vem inteira da logo oficial (brasão vermelho, hambúrguer, "MARIA" em laranja 3D,
faixa amarela). Paleta extraída do SVG:

| Papel | Cor |
|---|---|
| Dominante / header / hero | `#E61010` (escurece para `#A80808` no fim do hero) |
| Ação (botão "Adicionar") | `#FF9112` com texto escuro — 8:1 |
| Destaque / faixas / selos | `#FFC629` |
| Contorno e texto | `#181510` |
| Texto secundário | `#6B3010` (o marrom do contorno da ilustração) |
| Fundo de página | `#FFF8F0` com listra diagonal e calor amarelo no topo |

**Tipografia:** Fredoka (display, 400–700) e Nunito (corpo, 400–900).
O extremo é proposital: Fredoka 700 em ~69px no hero contra Nunito 900 em 12px
na sobrancelha. O título do hero mistura as duas famílias — "do jeito" em Nunito
itálico amarelo dentro de um h1 Fredoka.

**Dois motivos que amarram o visual** (é o que separa isto de um template):

1. **Traço de adesivo** — contorno preto de 3px + sombra dura sem blur
   (`--sombra-dura`), copiando o contorno grosso da ilustração da logo.
   Botões afundam no `:active` movendo a sombra.
2. **Toldo** — faixa listrada com a borda inferior recortada em meia-lua
   (`.toldo`, feito com `mask-image` de círculos). Aparece embaixo do header,
   no fim do hero e no topo do rodapé.

**Momento coreografado único: adicionar ao carrinho.** O item voa do botão até
o carrinho num arco (`voar.js`, Web Animations API), o carrinho chacoalha e o
total troca com uma girada. Nada mais no site anima com essa intensidade.
Tudo respeita `prefers-reduced-motion`.

## Franquia e páginas legais (11/08/2026)

Quatro rotas novas: `/franquia` (captação), `/privacidade`, `/termos` e
`/politica-de-franquia`. Os três documentos usam `TextoLegal.vue` (tipografia de
leitura, data e bloco do responsável) e carregam em chunk próprio.

`franquia.ativa = false` em `contato.js` **some com tudo de franquia de uma vez**
— seção da home, link do header, link do rodapé e a política.

### O que NÃO pode aparecer nessas páginas

Franquia é regulada pela **Lei 13.966/2019**. As regras abaixo não são estilo,
são exposição jurídica:

1. **Nenhum valor de investimento, taxa, faturamento ou prazo de retorno.**
   Esses números são conteúdo obrigatório da Circular de Oferta de Franquia
   (COF) e, se publicados errados no site, viram problema. A página fala em
   "está na COF" e ponto.
2. **A COF tem que chegar 10 dias antes** de qualquer assinatura ou pagamento —
   o site diz isso em dois lugares, de propósito.
3. **Nada é cobrado antes da COF.** A política avisa para não pagar nada a quem
   pedir dinheiro antes disso, em nome da marca.
4. **Preço de revenda é sugestão, nunca imposição** — impor preço ao franqueado
   é infração à ordem econômica (Lei 12.529/2011, art. 36, § 3º, IX).
5. **Nenhuma promessa de lucro**, nem em número nem em adjetivo.
6. **A página não é oferta**, e está escrito.

⚠️ **`franquia.marcaRegistrada` está `false`.** Sem registro no INPI não existe
franquia de verdade — existe parceria. A política diz "em processo de proteção";
quando o registro sair, virar a flag muda o texto sozinho. Se o registro **não**
estiver em andamento, esse parágrafo precisa ser corrigido antes de publicar.

### A política de privacidade descreve o site que existe hoje

Ela afirma, com todas as letras, que **não há backend, banco de dados nem
cookie próprio** — o que é verdade: formulário monta mensagem de `wa.me`,
carrinho vive no `localStorage`. Também nomeia os três terceiros que enxergam o
visitante: **Netlify** (hospedagem), **Google Fonts** (as fontes vêm dos
servidores do Google, então o IP chega lá) e **WhatsApp/Meta**.

**Se um dia entrar Formspree, analytics, pixel, chat ou banco de dados, essa
página precisa mudar junto** — senão vira declaração falsa. O mesmo vale para
trocar a fonte por arquivo local: aí o Google sai da lista.

⚠️ Os três documentos foram escritos por desenvolvedor, não por advogado. São
base sólida e específica deste site (não é boilerplate genérico), mas uma
revisão jurídica antes de publicar é barata perto do risco — ainda mais na
parte de franquia.

## Fotos dos pratos

⚠️ **As 23 fotos de prato são de BANCO (Pexels), não são os lanches da casa.**
Entraram a pedido do Leonardo em 11/08/2026 **só para avaliar o layout pronto**;
as fotos reais vêm do cliente depois. **Não publicar assim** — o cliente recebe
o que está na foto, e foto de outro lanche é propaganda enganosa.

- Colhidas com o `harvest_imagens.py` da `_design-library`, **uma busca por
  prato** (senão o cardápio inteiro sai com a mesma foto de hambúrguer).
  Originais + crédito/licença em `_design-library/imagens/lanchonete/`
- No projeto: `public/cardapio/<id>.webp`, 640×400 (16:10), ~25 KB cada,
  572 KB no total, todas com `loading="lazy"`. Créditos em
  `public/cardapio/_creditos.json`
- **Trocar por foto real = sobrescrever o arquivo.** Nenhuma linha de código
  muda, desde que o nome seja o `id` do item
- Fotos de refrigerante com **marca visível** (Coca-Cola, Pepsi) foram
  descartadas de propósito: marca de terceiro no cardápio do cliente é
  problema, e ainda promete um estoque que talvez não exista. No lugar,
  copo com gelo
- **`calabresa-acebolada` ficou sem foto de propósito** — o banco não tem o
  prato (as buscas devolvem pizza, pretzel e café da manhã inglês). Serve de
  demonstração do fallback: com `foto: null` o card renderiza
  `PlaceholderPrato.vue`, com a silhueta da categoria e o selo "foto em breve"

A primeira versão do placeholder usava a inicial gigante do prato — seis dos
oito lanches começam com "X" e a grade virou uma parede de X, lendo como imagem
quebrada. Por isso a silhueta.

## Assets de marca

- `src/assets/marca-mari-lanches.webp` — logo completa, 57 KB (transparente)
- `src/assets/hamburguer.webp` — só o hambúrguer, usado em estado vazio
- `public/marca/icon-{192,512}.png`, `apple-touch-icon.png`, `favicon.ico`,
  `favicon-{16,32}.png` — hambúrguer isolado sobre quadrado vermelho
- `marca/logo-original-canva.svg` — o arquivo original do cliente (480 KB)
- `marca/mari-lanches-transparente.svg` — original sem os fundos brancos

**O SVG original tinha três fundos brancos** (dois `<rect>` de 1800×1800 e um
PNG 1280×1280 chapado). Sem removê-los a logo não pode ir sobre fundo colorido
e qualquer glow vira halo retangular. O brasão em si é raster com máscara; só o
texto é vetor — por isso os assets finais são WebP/PNG, não SVG.

## Validação já feita (11/08/2026)

Medida com iframe na mesma origem (o Browser pane devolve `clientWidth 0` e
mente) e Chrome headless:

- **Overflow horizontal: 0 casos** em 8 rotas × 4 larguras (360/390/768/1280),
  refeito a cada mudança (antes das páginas legais eram 4 rotas × 6 larguras)
- **Contraste: 0 reprovações.** Corrigidos no caminho: tagline do header
  (3,01:1), sobrancelha (4,48:1), lead do hero (4,02:1), placeholder de campo
  (3,08:1), selo "foto em breve" (4,48:1), número das etapas de franquia em
  laranja sobre branco (2,26:1 — laranja da marca é cor de preenchimento, não
  de texto sobre claro) e sobrancelha vermelha sobre a faixa amarela (3,77:1)
- **Alvos de toque: 0 abaixo de 44px** nas 8 rotas. Link embutido em frase é
  isento (WCAG 2.5.8) — o medidor foi ajustado para não acusar falso positivo
- **0 imagens quebradas** (23 fotos de prato + marca)
- **Fluxo de compra ponta a ponta**, dirigido por script no documento de topo:
  adicionar → contador e total (R$ 58,00 para 2× X-Salada + 1× batata) →
  gaveta → alterar quantidade → observação → finalizar → validação barrando
  envio incompleto → mensagem montada → link `wa.me` correto → tela de sucesso
  → navegação entre as 4 rotas → carrinho preservado
- **Fluxo de franquia**: seção da home → página → validação barrando envio vazio
  (3 mensagens) → mensagem montada → link `wa.me` → confirmação; as 3 páginas
  legais abertas pelo rodapé e os links cruzados entre elas
- Bundle: **94 KB JS gzip** + 11 KB CSS gzip no carregamento inicial

⚠️ **Screenshot de celular não foi validado visualmente em 390px.** O headless
do Windows não desce abaixo de ~504px de viewport (a captura em 390 sai
recortada), e iframe não pinta em screenshot. O layout de 390px foi conferido
por **número** (rects, contraste, alvos), não por foto. Conferir no celular de
verdade antes de publicar.

## Pendente antes de publicar

- [ ] **WhatsApp real** — hoje `5511900000000` em `contato.js`. Sem isso o site
      não serve para nada.
- [ ] **Cardápio real** — os 24 itens e preços em `cardapio.js` são exemplo
      plausível, **não são o cardápio da casa**.
- [ ] **Endereço, horário de funcionamento e formas de pagamento** conferidos
      com a Maria Cristina (o horário atual é chute: 18h às 23h30, fechado terça)
- [ ] **Fotos reais dos lanches** — hoje são de banco, só para o preview
      (ver "Fotos dos pratos"). Sobrescrever `public/cardapio/<id>.webp`
- [ ] Instagram (`contato.instagram` vazio esconde o link sozinho)
- [ ] Repositório no GitHub + Netlify (o `netlify.toml` já está pronto)
- [ ] **Revisão jurídica dos três documentos legais**, principalmente franquia
- [ ] **Confirmar com a Maria Cristina se o programa de franquia existe mesmo**
      e em que estágio — o site hoje diz "estruturando a expansão"
- [ ] Registro da marca no INPI e virar `franquia.marcaRegistrada`
- [ ] COF pronta → apontar o arquivo em `franquia.cofUrl` (o link aparece só)
