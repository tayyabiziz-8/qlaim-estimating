import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Route changes keep the old scroll position by default, which drops people
// into the middle of the next page. Reset to the top on every path change.
// For links with a #hash (for example the navbar "Contact" link to
// /#contact) scroll to that element once the new page has rendered.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return undefined
    }
    let frame
    let tries = 0
    const id = decodeURIComponent(hash.slice(1))
    const seek = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (tries++ < 20) {
        frame = requestAnimationFrame(seek) // page may still be rendering
      }
    }
    seek()
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
