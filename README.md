# Maria Lanches — cardápio digital

Site da **Maria Lanches**, lanchonete em São Paulo/SP. O cliente monta o pedido
no cardápio e finaliza pelo WhatsApp — sem checkout, sem pagamento online e sem
backend.

**Vue 3 + Vuetify 3 + Pinia + vue-router (hash)**, build com `vue-cli-service`.

```bash
npm install
npm run serve    # desenvolvimento
npm run build    # produção → dist/
```

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| WhatsApp, e-mail, endereço, horário, entrega | `src/config/contato.js` |
| Itens, preços, categorias e fotos do cardápio | `src/config/cardapio.js` |
| Paleta, tipografia e animações | `src/assets/theme.css` |
| Regra do carrinho e mensagem do WhatsApp | `src/store/carrinho.js` |

As regras do projeto, as armadilhas já mapeadas e o que falta antes de publicar
estão no [CLAUDE.md](CLAUDE.md).

## Deploy

Netlify: *Add new site → Import from Git → GitHub → Maria-Lanches*. O
`netlify.toml` já define build, publish, redirect de SPA e cabeçalhos de cache —
não é preciso preencher nada na tela.

## Antes de publicar

- As **fotos dos pratos são de banco de imagens**, usadas para avaliar o
  layout. Trocar pelas fotos reais antes de o site ir ao ar.
- O **cardápio e os preços** são um exemplo plausível, não os da casa.
- Os documentos legais foram escritos por desenvolvedor, não por advogado.
