/**
 * Renders a content string, highlighting it if it is still an unfilled
 * `[INSERT ...]` placeholder. Once src/content.ts holds real copy, every
 * highlight disappears without touching a single component.
 */
export function T({ v }: { v: string }) {
  if (v.startsWith('[INSERT')) {
    return (
      <span className="insert" data-placeholder="true">
        {v}
      </span>
    )
  }
  return <>{v}</>
}
