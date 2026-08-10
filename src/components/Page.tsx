import type { ReactNode } from "react";
import { LedgerRules } from "./Ledger";
import { T } from "./Text";
import "./Page.css";

/**
 * Interior page shell.
 *
 * The ruling is the whole point of the design, so it runs here the same way it
 * runs on Home: a numbered gutter plus vertical rules at the column boundaries,
 * full height, beneath the content. Rows sit inside those columns rather than
 * floating in an unruled expanse, which is what makes a list of publications
 * read as a worksheet instead of a stack of text.
 */
export function Page({
  title,
  standfirst,
  children,
}: {
  title: string;
  standfirst?: string;
  children: ReactNode;
}) {
  return (
    <article className="page">
      <LedgerRules at={["var(--gutter)", "var(--col-2)", "var(--col-3)"]} />

      <header className="page__head row">
        <div className="row__gutter" />
        <div className="row__body">
          <h1>{title}</h1>
          {standfirst && (
            <p className="page__standfirst measure">
              <T v={standfirst} />
            </p>
          )}
        </div>
      </header>
      {children}
    </article>
  );
}

/**
 * Column headings for a ruled list. A worksheet labels its columns; this is
 * that, and it is the reason the middle and right columns read as data rather
 * than as stray text. Only rendered where the columns actually exist.
 */
export function RowHeader({ cols }: { cols: [string, string, string] }) {
  return (
    <li className="rows__header" aria-hidden="true">
      <div className="entry">
        <span />
        <span className="label">{cols[0]}</span>
        <span className="label">{cols[1]}</span>
        <span className="label entry__links-head">{cols[2]}</span>
      </div>
    </li>
  );
}

/**
 * A numbered band. The heading sits in the body column beside its numeral;
 * children are dropped at full page width so a ruled list can span every
 * column, including the gutter.
 */
export function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="section">
      <div className="section__head">
        <h2 className="section__title">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/** Prose, fact lists, and button rows: anything that is not a ruled list. */
export function SectionBody({ children }: { children: ReactNode }) {
  return <div className="section__body">{children}</div>;
}
