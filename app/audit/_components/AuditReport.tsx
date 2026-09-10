import type { ReactNode } from 'react'

/**
 * The audit API streams markdown in a narrow, known subset: `## headings`,
 * `**bold**`, `- bullets`, and `---` rules. Rendering that as pre-wrapped plain
 * text leaves the visitor reading literal asterisks, so we parse the subset we
 * actually emit rather than pulling in a markdown dependency.
 */

function inline(text: string, keyPrefix: string): ReactNode[] {
  // Split on **bold** while keeping the delimiters' contents.
  return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) => {
    if (chunk.startsWith('**') && chunk.endsWith('**') && chunk.length > 4) {
      return (
        <strong key={`${keyPrefix}-b${i}`} className="font-medium text-ink">
          {chunk.slice(2, -2)}
        </strong>
      )
    }
    return chunk
  })
}

export default function AuditReport({ markdown }: { markdown: string }) {
  const lines = markdown.split('\n')
  const blocks: ReactNode[] = []
  let bullets: string[] = []

  const flushBullets = () => {
    if (!bullets.length) return
    const items = bullets
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="mt-3">
        {items.map((b, i) => (
          <li
            key={`li-${blocks.length}-${i}`}
            className="rule-row py-2.5 text-sm font-light leading-relaxed text-ink-2"
          >
            {inline(b, `li-${blocks.length}-${i}`)}
          </li>
        ))}
      </ul>,
    )
    bullets = []
  }

  lines.forEach((raw, i) => {
    const line = raw.trimEnd()

    if (/^\s*[-*]\s+/.test(line)) {
      bullets.push(line.replace(/^\s*[-*]\s+/, ''))
      return
    }

    flushBullets()

    if (!line.trim()) return

    if (/^---+$/.test(line.trim())) {
      blocks.push(<hr key={`hr-${i}`} className="my-8 border-0 border-t border-hair" />)
      return
    }

    if (line.startsWith('## ')) {
      blocks.push(
        <h3
          key={`h-${i}`}
          className="display mt-9 text-md uppercase text-ink first:mt-0"
        >
          {line.slice(3)}
        </h3>,
      )
      return
    }

    if (line.startsWith('# ')) {
      blocks.push(
        <h3 key={`h-${i}`} className="display mt-9 text-lg uppercase text-ink first:mt-0">
          {line.slice(2)}
        </h3>,
      )
      return
    }

    blocks.push(
      <p
        key={`p-${i}`}
        className="mt-3.5 text-sm font-light leading-relaxed text-ink-2"
      >
        {inline(line, `p-${i}`)}
      </p>,
    )
  })

  flushBullets()

  return <div className="measure">{blocks}</div>
}
