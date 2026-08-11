/* ============================================================
   ÚNICO ponto de troca de contato / dados da lanchonete.
   Mexeu aqui, mudou em todas as páginas e na mensagem do WhatsApp.
   ============================================================ */

export const empresa = {
  // O nome que aparece em TODO o site (header, títulos, mensagem do pedido).
  // Confirmado pelo Leonardo em 11/08/2026: é "Maria Lanches", igual à logo.
  nome: 'Maria Lanches',
  razaoSocial: '66.870.166 Maria Cristina Pereira Dias',
  cnpj: '66.870.166/0001-77',
  tagline: 'Sua melhor opção fora de casa!',
  cidade: 'São Paulo',
  uf: 'SP',
}

export const contato = {
  // ⚠️ TROCAR: DDI + DDD + número, só dígitos. É para cá que vai todo pedido.
  whatsapp: '5511900000000',
  // ⚠️ TROCAR ou deixar vazio ('') — some do rodapé sozinho.
  email: '',
  // ⚠️ TROCAR: @ do Instagram, sem o @. Vazio some sozinho.
  instagram: '',
  // ⚠️ TROCAR: endereço completo. Vazio = site assume "só entrega".
  endereco: 'Rua Exemplo, 123 — Vila Exemplo, São Paulo/SP',
  // Link do mapa. Vazio esconde o botão "Ver no mapa".
  mapa: '',
}

/** Horário de funcionamento. `fechado: true` some da lista de dias abertos. */
export const horarios = [
  { dia: 'Segunda', abre: '18:00', fecha: '23:30' },
  { dia: 'Terça', fechado: true },
  { dia: 'Quarta', abre: '18:00', fecha: '23:30' },
  { dia: 'Quinta', abre: '18:00', fecha: '23:30' },
  { dia: 'Sexta', abre: '18:00', fecha: '00:30' },
  { dia: 'Sábado', abre: '18:00', fecha: '00:30' },
  { dia: 'Domingo', abre: '18:00', fecha: '23:00' },
]

/** Entrega. `taxa: null` = "a combinar" (não inventa valor na mensagem). */
export const entrega = {
  faz: true,
  taxa: null,
  bairrosAtendidos: '', // ex.: 'Vila Exemplo, Jardim Exemplo e adjacências'
  tempoMedio: '30 a 50 min',
  retiradaNoLocal: true,
}

export const pagamentos = ['Dinheiro', 'Pix', 'Cartão na entrega']

export function waLink(mensagem = `Olá! Vim pelo site da ${empresa.nome}.`) {
  return `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

export function instagramLink() {
  return `https://instagram.com/${contato.instagram}`
}

/** WhatsApp formatado para leitura: (11) 90000-0000 */
export function whatsappLegivel() {
  const d = contato.whatsapp.replace(/\D/g, '').slice(2) // tira o 55
  if (d.length < 10) return contato.whatsapp
  const ddd = d.slice(0, 2)
  const r = d.slice(2)
  const meio = r.length === 9 ? r.slice(0, 5) : r.slice(0, 4)
  const fim = r.length === 9 ? r.slice(5) : r.slice(4)
  return `(${ddd}) ${meio}-${fim}`
}

/** Dia da semana de hoje no formato usado em `horarios`. */
function diaDeHoje() {
  return ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][new Date().getDay()]
}

/**
 * Está aberto agora? Considera horário que vira a madrugada (18:00 → 00:30):
 * depois da meia-noite o expediente ainda é o do dia anterior.
 */
export function statusAgora(agora = new Date()) {
  const min = agora.getHours() * 60 + agora.getMinutes()
  const paraMin = (t) => {
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
  }
  const nomes = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const achar = (nome) => horarios.find((h) => h.dia === nome)

  const hoje = achar(nomes[agora.getDay()])
  const ontem = achar(nomes[(agora.getDay() + 6) % 7])

  // Expediente de ontem que atravessou a meia-noite.
  if (ontem && !ontem.fechado && paraMin(ontem.fecha) < paraMin(ontem.abre)) {
    if (min < paraMin(ontem.fecha)) return { aberto: true, fecha: ontem.fecha }
  }
  if (!hoje || hoje.fechado) return { aberto: false, proximo: proximoDiaAberto(agora) }

  const abre = paraMin(hoje.abre)
  const fecha = paraMin(hoje.fecha)
  const viraNoite = fecha < abre
  const aberto = viraNoite ? min >= abre : min >= abre && min < fecha
  return aberto
    ? { aberto: true, fecha: hoje.fecha }
    : { aberto: false, proximo: min < abre ? { dia: 'hoje', abre: hoje.abre } : proximoDiaAberto(agora) }
}

function proximoDiaAberto(agora) {
  const nomes = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  for (let i = 1; i <= 7; i++) {
    const d = horarios.find((h) => h.dia === nomes[(agora.getDay() + i) % 7])
    if (d && !d.fechado) return { dia: i === 1 ? 'amanhã' : d.dia.toLowerCase(), abre: d.abre }
  }
  return null
}

export { diaDeHoje }
