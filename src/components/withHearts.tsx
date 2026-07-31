import type { ReactNode } from 'react'

export function withHearts(text: string): ReactNode {
  const parts = text.split(/(💙|❤️|❤|♥)/g)
  return parts.map((part, i) => {
    if (part === '💙' || part === '❤️' || part === '❤' || part === '♥') {
      return (
        <span key={i} className="text-heart">
          ♥
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}
