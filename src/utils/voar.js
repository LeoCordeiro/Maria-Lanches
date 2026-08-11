/* Momento coreografado do site: o item sai do botão "Adicionar" e voa até o
   carrinho flutuante, num arco (não em linha reta — linha reta lê como
   transição de framework, arco lê como coisa jogada).

   Web Animations API pura: nenhuma lib, nada fica no DOM depois. */

const SEM_MOVIMENTO = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export function voarParaCarrinho(origem, emoji = '🍔') {
  if (!origem || SEM_MOVIMENTO()) return
  const alvo = document.getElementById('fab-carrinho')
  if (!alvo || typeof document.body.animate !== 'function') return

  const a = origem.getBoundingClientRect()
  const b = alvo.getBoundingClientRect()
  const tamanho = 44

  const bolha = document.createElement('div')
  bolha.className = 'item-voando'
  bolha.textContent = emoji
  bolha.setAttribute('aria-hidden', 'true')
  bolha.style.width = `${tamanho}px`
  bolha.style.height = `${tamanho}px`
  bolha.style.left = `${a.left + a.width / 2 - tamanho / 2}px`
  bolha.style.top = `${a.top + a.height / 2 - tamanho / 2}px`
  document.body.appendChild(bolha)

  const dx = b.left + b.width / 2 - (a.left + a.width / 2)
  const dy = b.top + b.height / 2 - (a.top + a.height / 2)

  const anim = bolha.animate(
    [
      { transform: 'translate(0,0) scale(1) rotate(0)', opacity: 1 },
      // pico do arco: sobe antes de cair no carrinho
      { transform: `translate(${dx * 0.55}px, ${dy * 0.35 - 70}px) scale(1.12) rotate(150deg)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.35) rotate(340deg)`, opacity: 0.2 },
    ],
    { duration: 640, easing: 'cubic-bezier(0.4, 0, 0.5, 1)' }
  )

  anim.onfinish = () => bolha.remove()
  anim.oncancel = () => bolha.remove()
  // Rede de segurança: se o relógio de animação estiver congelado (aba em
  // segundo plano, webview embutida), `onfinish` nunca dispara e cada clique
  // deixaria uma bolha presa na tela.
  setTimeout(() => bolha.remove(), 1200)
}
