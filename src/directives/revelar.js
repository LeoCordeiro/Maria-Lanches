/* Revela o elemento quando ele entra na viewport.
   v-revelar         → sem atraso
   v-revelar="120"   → 120 ms de atraso (para escalonar grades)

   Quem tem `prefers-reduced-motion` recebe o elemento já visível: nada some
   da página, só não anima. */

const semMovimento =
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

const observador =
  typeof IntersectionObserver !== 'undefined' && !semMovimento
    ? new IntersectionObserver(
        (entradas, obs) => {
          entradas.forEach((e) => {
            if (!e.isIntersecting) return
            const atraso = Number(e.target.dataset.atraso || 0)
            setTimeout(() => e.target.classList.add('visivel'), atraso)
            obs.unobserve(e.target)
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
      )
    : null

export default {
  mounted(el, binding) {
    el.classList.add('revelar')
    el.dataset.atraso = binding.value || 0
    if (observador) observador.observe(el)
    else el.classList.add('visivel')
  },
  unmounted(el) {
    if (observador) observador.unobserve(el)
  },
}
