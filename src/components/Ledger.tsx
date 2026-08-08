import './Ledger.css'

/**
 * The rule overlay. Sits beneath everything, including the hero photograph,
 * so the hairlines read straight through the image's high-key background the
 * way ruling shows through a print on ledger stock.
 */
export function LedgerRules({
  at,
  animated = false,
}: {
  /** Left offsets, any CSS length or percentage. */
  at: string[]
  animated?: boolean
}) {
  return (
    <div className="rules" data-animated={animated || undefined} aria-hidden="true">
      {at.map((left, i) => (
        <span
          key={left}
          className="rules__line"
          style={{ left, animationDelay: `${i * 70}ms` }}
        />
      ))}
    </div>
  )
}

/** The numbered gutter cell. Two digits, tabular, top-aligned. */
export function GutterNumber({ n }: { n: string }) {
  return (
    <span className="gutter-number tabular" aria-hidden="true">
      {n}
    </span>
  )
}
