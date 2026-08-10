import portrait from "../assets/bridget-stomberg.jpg";
import { hero, site } from "../content";
import { LedgerRules } from "../components/Ledger";
import { MiniFooter } from "../components/MiniFooter";
import { T } from "../components/Text";
import { Link } from "../router";
import { useRouter } from "../router-context";
import "./Home.css";

export function Home() {
  /**
   * First-load motion, kept to first load. navCount is zero on the server
   * render and on hydration, so the entrance plays exactly once per page load
   * and never again when a reader returns to Home from another route.
   */
  const { navCount } = useRouter();
  const animate = navCount === 0;

  return (
    <div className="home" data-animate={animate || undefined}>
      <section className="hero" aria-labelledby="hero-headline">
        {/* Only the gutter rule. The interior rules used to run at 52% and
            78%, straight across the photograph; the rules layer is now inset
            to stop where the image begins, so nothing is ruled over her. */}
        <LedgerRules at={["var(--gutter)"]} animated={animate} />

        <img
          className="hero__portrait"
          src={portrait}
          width={1600}
          height={1067}
          alt="Bridget Stomberg, arms folded, in a lavender herringbone blazer against a window wall of daylight."
          fetchPriority="high"
        />

        <div className="hero__copy">
          <h1 className="hero__headline" id="hero-headline">
            {hero.headline.map((line) => (
              <span className="hero__line" key={line}>
                <span className="hero__lineInner">{line}</span>
              </span>
            ))}
          </h1>

          <p className="hero__role label">
            <T v={site.title} />
            <span className="hero__sep" aria-hidden="true">
              /
            </span>
            <T v={site.school} />
            <span className="hero__sep" aria-hidden="true">
              /
            </span>
            <T v={site.university} />
          </p>

          <p className="hero__standfirst measure">
            <T v={hero.standfirst} />
          </p>

          <div className="hero__actions">
            {hero.actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.solid
                    ? "field-button field-button--solid"
                    : "field-button"
                }
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MiniFooter />
    </div>
  );
}
