import { defineStore } from 'pinia'
import { empresa, entrega as cfgEntrega } from '@/config/contato'
import { formatarPreco } from '@/config/cardapio'

const CHAVE = 'mari-lanches:carrinho'

/** Lê o carrinho salvo. Qualquer coisa estranha no localStorage vira carrinho vazio. */
function carregar() {
  try {
    const bruto = JSON.parse(localStorage.getItem(CHAVE) || '{}')
    return {
      itens: Array.isArray(bruto.itens) ? bruto.itens.filter((i) => i && i.id && i.qtd > 0) : [],
      dados: bruto.dados && typeof bruto.dados === 'object' ? bruto.dados : {},
    }
  } catch {
    return { itens: [], dados: {} }
  }
}

const salvo = typeof localStorage !== 'undefined' ? carregar() : { itens: [], dados: {} }

export const useCarrinho = defineStore('carrinho', {
  state: () => ({
    itens: salvo.itens,
    /** Dados de entrega preenchidos na página do pedido. */
    dados: {
      nome: '',
      telefone: '',
      modo: cfgEntrega.faz ? 'entrega' : 'retirada', // 'entrega' | 'retirada'
      endereco: '',
      referencia: '',
      pagamento: 'Pix',
      troco: '',
      observacoes: '',
      ...salvo.dados,
    },
    /** Sobe a cada adição — dispara a animação do carrinho flutuante. */
    pulso: 0,
    /** Gaveta do carrinho aberta. */
    gaveta: false,
  }),

  getters: {
    quantidadeTotal: (s) => s.itens.reduce((t, i) => t + i.qtd, 0),
    subtotal: (s) => s.itens.reduce((t, i) => t + i.preco * i.qtd, 0),
    vazio: (s) => s.itens.length === 0,
    /** Quantas unidades deste produto já estão no carrinho (badge do card). */
    qtdDoItem: (s) => (id) => s.itens.filter((i) => i.id === id).reduce((t, i) => t + i.qtd, 0),
  },

  actions: {
    /**
     * Adiciona uma unidade. Itens com observações diferentes ocupam linhas
     * separadas — "1x Refri (Guaraná)" e "1x Refri (Coca)" não podem virar "2x Refri".
     */
    adicionar(produto, obs = '') {
      const linha = this.itens.find((i) => i.id === produto.id && (i.obs || '') === obs)
      if (linha) linha.qtd += 1
      else this.itens.push({ id: produto.id, nome: produto.nome, preco: produto.preco, qtd: 1, obs })
      this.pulso += 1
      this.persistir()
    },

    alterarQtd(indice, delta) {
      const linha = this.itens[indice]
      if (!linha) return
      linha.qtd += delta
      if (linha.qtd <= 0) this.itens.splice(indice, 1)
      this.persistir()
    },

    remover(indice) {
      this.itens.splice(indice, 1)
      this.persistir()
    },

    definirObs(indice, obs) {
      if (this.itens[indice]) {
        this.itens[indice].obs = obs
        this.persistir()
      }
    },

    limpar() {
      this.itens = []
      this.persistir()
    },

    abrirGaveta() { this.gaveta = true },
    fecharGaveta() { this.gaveta = false },

    persistir() {
      try {
        localStorage.setItem(CHAVE, JSON.stringify({ itens: this.itens, dados: this.dados }))
      } catch {
        /* modo privado / cota cheia: o carrinho segue funcionando só na memória */
      }
    },

    /** O que falta preencher para poder enviar. Vazio = pode enviar. */
    pendencias() {
      const faltando = []
      if (this.vazio) faltando.push('Escolha pelo menos um item do cardápio')
      if (!this.dados.nome.trim()) faltando.push('Informe seu nome')
      if (this.dados.modo === 'entrega' && !this.dados.endereco.trim()) {
        faltando.push('Informe o endereço de entrega')
      }
      return faltando
    },

    /** Mensagem que vai para o WhatsApp. Texto puro — o wa.me codifica depois. */
    mensagemPedido() {
      const d = this.dados
      const linhas = [`*Pedido ${empresa.nome}*`, '']

      this.itens.forEach((i) => {
        linhas.push(`${i.qtd}x ${i.nome} — ${formatarPreco(i.preco * i.qtd)}`)
        if (i.obs) linhas.push(`   ↳ ${i.obs}`)
      })

      linhas.push('', `*Total: ${formatarPreco(this.subtotal)}*`)
      if (d.modo === 'entrega' && cfgEntrega.taxa == null) {
        linhas.push('(taxa de entrega a combinar)')
      } else if (d.modo === 'entrega' && cfgEntrega.taxa) {
        linhas.push(`(+ ${formatarPreco(cfgEntrega.taxa)} de entrega)`)
      }

      linhas.push('', `Nome: ${d.nome.trim()}`)
      if (d.telefone.trim()) linhas.push(`Telefone: ${d.telefone.trim()}`)
      linhas.push(`Entrega/Retirada: ${d.modo === 'entrega' ? 'Entrega' : 'Retirar no local'}`)
      if (d.modo === 'entrega') {
        linhas.push(`Endereço: ${d.endereco.trim()}`)
        if (d.referencia.trim()) linhas.push(`Referência: ${d.referencia.trim()}`)
      }
      linhas.push(`Pagamento: ${d.pagamento}`)
      if (d.pagamento === 'Dinheiro' && d.troco.trim()) linhas.push(`Troco para: ${d.troco.trim()}`)
      if (d.observacoes.trim()) linhas.push(`Observações: ${d.observacoes.trim()}`)

      return linhas.join('\n')
    },
  },
})
