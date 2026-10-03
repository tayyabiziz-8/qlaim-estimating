import { useEffect, useRef, useState } from 'react'

/**
 * Scroll reveal: fades and lifts an element the first time it enters the
 * viewport. Built on IntersectionObserver plus a CSS transition (see
 * `.reveal` in index.css), so it adds no dependency and stays off the main
 * thread while scrolling. One shared observer serves every Reveal on a page.
 *
 *   <Reveal>...</Reveal>                       lift + fade
 *   <Reveal delay={120}>...</Reveal>           stagger siblings
 *   <Reveal variant="fade">...</Reveal>        fade only
 *   <Reveal variant="scale">...</Reveal>       fade + tiny zoom (images)
 *
 * People with "reduce motion" turned on see everything immediately.
 */

let sharedObserver = null
const onEnter = new WeakMap()

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          onEnter.get(entry.target)?.()
          sharedObserver.unobserve(entry.target)
          onEnter.delete(entry.target)
        }
      },
      // Trigger a little before the element is fully on screen.
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
  }
  return sharedObserver
}

export default function Reveal({ as: Tag = 'div', delay = 0, variant = 'up', className = '', style, children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }
    const observer = getObserver()
    onEnter.set(el, () => setVisible(true))
    observer.observe(el)
    return () => {
      observer.unobserve(el)
      onEnter.delete(el)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
