/* ============================================================
   CARDÁPIO — único ponto de troca de itens, preços e categorias.

   ⚠️ CONTEÚDO PROVISÓRIO: os itens e preços abaixo são um cardápio de
   exemplo, montado para o site ficar navegável. NÃO é o cardápio real da
   Maria Lanches — trocar por nome/descrição/preço de verdade antes de publicar.

   ⚠️ FOTOS SÃO DE BANCO (Pexels), não são os lanches da casa. Entraram só
   para avaliar o layout com o cardápio cheio; as fotos reais da lanchonete
   substituem estas antes da publicação. Crédito e licença de cada uma em
   `public/cardapio/_creditos.json`.
   NÃO PUBLICAR ASSIM: foto de outro lanche é propaganda enganosa. Para
   trocar, basta sobrescrever `public/cardapio/<id>.webp` — nenhuma linha
   de código muda. `foto: null` volta ao placeholder honesto (silhueta da
   categoria), como está em `calabresa-acebolada`.

   FORNECEDOR: hoje todo item é da própria casa. O campo já existe para a
   expansão futura (central de pedidos do bairro com outros produtores) —
   o card mostra o selo do parceiro sozinho quando o fornecedor for outro.
   ============================================================ */

/** Quem produz. `id: 'casa'` é a própria Maria Lanches. */
export const fornecedores = {
  casa: { id: 'casa', nome: 'Maria Lanches', daCasa: true },
  // Exemplo de como um parceiro entra no futuro (deixar comentado até existir):
  // dona_ines: { id: 'dona_ines', nome: 'Doces da Dona Inês', daCasa: false },
}

export const categorias = [
  { id: 'lanches', nome: 'Lanches', chamada: 'Na chapa, montado na hora', emoji: '🍔' },
  { id: 'porcoes', nome: 'Porções', chamada: 'Para dividir (ou não)', emoji: '🍟' },
  { id: 'combos', nome: 'Combos', chamada: 'Lanche + acompanhamento + bebida', emoji: '🥤' },
  { id: 'bebidas', nome: 'Bebidas', chamada: 'Geladas', emoji: '🧃' },
  { id: 'sobremesas', nome: 'Sobremesas', chamada: 'Para fechar a conta', emoji: '🍰' },
]

export const itens = [
  // ---------- LANCHES ----------
  {
    id: 'x-salada', categoria: 'lanches', fornecedor: 'casa', destaque: true,
    nome: 'X-Salada',
    descricao: 'Hambúrguer 120 g, queijo, alface, tomate e maionese da casa no pão brioche.',
    preco: 18.0,
    foto: '/cardapio/x-salada.webp',
  },
  {
    id: 'x-burger', categoria: 'lanches', fornecedor: 'casa',
    nome: 'X-Burger',
    descricao: 'Hambúrguer 120 g e queijo prato derretido na chapa. O clássico sem enfeite.',
    preco: 15.0,
    foto: '/cardapio/x-burger.webp',
  },
  {
    id: 'x-bacon', categoria: 'lanches', fornecedor: 'casa', destaque: true,
    nome: 'X-Bacon',
    descricao: 'Hambúrguer 120 g, queijo, bacon crocante, alface e tomate.',
    preco: 22.0,
    foto: '/cardapio/x-bacon.webp',
  },
  {
    id: 'x-egg', categoria: 'lanches', fornecedor: 'casa',
    nome: 'X-Egg',
    descricao: 'Hambúrguer 120 g, queijo, ovo frito, alface e tomate.',
    preco: 20.0,
    foto: '/cardapio/x-egg.webp',
  },
  {
    id: 'x-tudo', categoria: 'lanches', fornecedor: 'casa', destaque: true,
    nome: 'X-Tudo',
    descricao: 'Dois hambúrgueres, queijo, bacon, ovo, presunto, milho, batata palha e salada.',
    preco: 32.0,
    foto: '/cardapio/x-tudo.webp',
  },
  {
    id: 'x-calabresa', categoria: 'lanches', fornecedor: 'casa',
    nome: 'X-Calabresa',
    descricao: 'Calabresa fatiada na chapa, queijo, cebola dourada e vinagrete.',
    preco: 24.0,
    foto: '/cardapio/x-calabresa.webp',
  },
  {
    id: 'x-frango', categoria: 'lanches', fornecedor: 'casa',
    nome: 'X-Frango',
    descricao: 'Filé de frango grelhado, queijo, alface, tomate e maionese da casa.',
    preco: 23.0,
    foto: '/cardapio/x-frango.webp',
  },
  {
    id: 'misto-quente', categoria: 'lanches', fornecedor: 'casa',
    nome: 'Misto quente',
    descricao: 'Presunto e queijo na chapa, pão de forma prensado na manteiga.',
    preco: 12.0,
    foto: '/cardapio/misto-quente.webp',
  },

  // ---------- PORÇÕES ----------
  {
    id: 'batata-frita', categoria: 'porcoes', fornecedor: 'casa', destaque: true,
    nome: 'Batata frita',
    descricao: 'Porção de 400 g, crocante, com sal e alecrim. Serve 2 pessoas.',
    preco: 22.0,
    foto: '/cardapio/batata-frita.webp',
  },
  {
    id: 'batata-cheddar', categoria: 'porcoes', fornecedor: 'casa',
    nome: 'Batata com cheddar e bacon',
    descricao: 'Porção de 400 g coberta com cheddar cremoso e bacon em cubos.',
    preco: 32.0,
    foto: '/cardapio/batata-cheddar.webp',
  },
  {
    id: 'frango-passarinho', categoria: 'porcoes', fornecedor: 'casa',
    nome: 'Frango a passarinho',
    descricao: 'Porção de 500 g com alho frito e limão. Serve 2 a 3 pessoas.',
    preco: 38.0,
    foto: '/cardapio/frango-passarinho.webp',
  },
  {
    id: 'calabresa-acebolada', categoria: 'porcoes', fornecedor: 'casa',
    nome: 'Calabresa acebolada',
    descricao: 'Porção de 400 g na chapa com cebola e pão de alho.',
    preco: 34.0,
    // Sem foto de propósito: o banco não tem calabresa acebolada de verdade
    // (as buscas devolvem pizza, pretzel e café da manhã inglês). Fica com o
    // placeholder da categoria até chegar a foto do cliente.
    foto: null,
  },
  {
    id: 'nuggets', categoria: 'porcoes', fornecedor: 'casa',
    nome: 'Nuggets (12 un.)',
    descricao: 'Doze unidades com molho barbecue à parte.',
    preco: 20.0,
    foto: '/cardapio/nuggets.webp',
  },

  // ---------- COMBOS ----------
  {
    id: 'combo-classico', categoria: 'combos', fornecedor: 'casa', destaque: true,
    nome: 'Combo clássico',
    descricao: 'X-Salada + batata frita individual + refrigerante lata.',
    preco: 34.0,
    foto: '/cardapio/combo-classico.webp',
  },
  {
    id: 'combo-bacon', categoria: 'combos', fornecedor: 'casa',
    nome: 'Combo bacon',
    descricao: 'X-Bacon + batata frita individual + refrigerante lata.',
    preco: 38.0,
    foto: '/cardapio/combo-bacon.webp',
  },
  {
    id: 'combo-casal', categoria: 'combos', fornecedor: 'casa',
    nome: 'Combo do casal',
    descricao: 'Dois X-Burger + batata frita 400 g + dois refrigerantes lata.',
    preco: 62.0,
    foto: '/cardapio/combo-casal.webp',
  },

  // ---------- BEBIDAS ----------
  {
    id: 'refri-lata', categoria: 'bebidas', fornecedor: 'casa',
    nome: 'Refrigerante lata 350 ml',
    descricao: 'Coca-Cola, Guaraná, Fanta laranja ou uva. Escreva a escolha na observação.',
    preco: 7.0,
    foto: '/cardapio/refri-lata.webp',
  },
  {
    id: 'refri-2l', categoria: 'bebidas', fornecedor: 'casa',
    nome: 'Refrigerante 2 litros',
    descricao: 'Coca-Cola ou Guaraná. Escreva a escolha na observação.',
    preco: 14.0,
    foto: '/cardapio/refri-2l.webp',
  },
  {
    id: 'suco-laranja', categoria: 'bebidas', fornecedor: 'casa',
    nome: 'Suco de laranja 500 ml',
    descricao: 'Feito na hora, sem açúcar adicionado.',
    preco: 8.0,
    foto: '/cardapio/suco-laranja.webp',
  },
  {
    id: 'agua', categoria: 'bebidas', fornecedor: 'casa',
    nome: 'Água mineral 500 ml',
    descricao: 'Com ou sem gás.',
    preco: 4.0,
    foto: '/cardapio/agua.webp',
  },
  {
    id: 'milkshake', categoria: 'bebidas', fornecedor: 'casa', destaque: true,
    nome: 'Milk-shake 400 ml',
    descricao: 'Chocolate, morango ou baunilha. Escreva o sabor na observação.',
    preco: 16.0,
    foto: '/cardapio/milkshake.webp',
  },

  // ---------- SOBREMESAS ----------
  {
    id: 'pudim', categoria: 'sobremesas', fornecedor: 'casa',
    nome: 'Pudim de leite',
    descricao: 'Fatia individual, feito na casa.',
    preco: 10.0,
    foto: '/cardapio/pudim.webp',
  },
  {
    id: 'brownie', categoria: 'sobremesas', fornecedor: 'casa',
    nome: 'Brownie com doce de leite',
    descricao: 'Servido morno. Peça com sorvete por mais R$ 5,00 na observação.',
    preco: 12.0,
    foto: '/cardapio/brownie.webp',
  },
  {
    id: 'petit-gateau', categoria: 'sobremesas', fornecedor: 'casa',
    nome: 'Petit gâteau',
    descricao: 'Bolo de chocolate com recheio cremoso e sorvete de creme.',
    preco: 18.0,
    foto: '/cardapio/petit-gateau.webp',
  },
]

/** Itens de uma categoria, na ordem em que foram escritos. */
export function itensDaCategoria(idCategoria) {
  return itens.filter((i) => i.categoria === idCategoria && !i.esgotado)
}

/** Os destaques da casa, para a vitrine do topo. */
export function destaques() {
  return itens.filter((i) => i.destaque && !i.esgotado)
}

export function itemPorId(id) {
  return itens.find((i) => i.id === id)
}

/** Nome do parceiro quando o item NÃO é da casa. Vazio quando é. */
export function seloFornecedor(item) {
  const f = fornecedores[item.fornecedor]
  return !f || f.daCasa ? '' : f.nome
}

/** 18 → "R$ 18,00" */
export function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
