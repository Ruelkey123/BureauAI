'use client'

import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('[data-reveal]').forEach((node, i) => {
            const delay = parseInt(node.getAttribute('data-delay') || '0')
            setTimeout(() => {
              node.classList.remove('opacity-0', 'translate-y-6')
              node.classList.add('opacity-100', 'translate-y-0')
            }, delay)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
