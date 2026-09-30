import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Route changes keep the old scroll position by default, which drops people
// into the middle of the next page (for example, footer links to the legal
// pages). Reset to the top on every path change, but leave #hash jumps alone.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
