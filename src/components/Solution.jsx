import DropletMotif from './DropletMotif';
import './DropletMotif.css';
import './Solution.css';

export default function Solution() {
  return (
    <section className="section section--stone solution">
      <div className="container solution__grid">
        <div className="solution__visual">
          <DropletMotif />
        </div>

        <div className="solution__copy">
          <span className="eyebrow">Vinea, in one idea</span>
          <h2 className="h-display-2">Scalp-first, by design.</h2>
          <p className="body-text">
            Vinea was formulated around one idea: hair that looks healthier starts with a scalp
            that{"\u2019"}s cared for first. Instead of another leave-in for the strands, Vinea combines
            eleven natural oils {"\u2014"} jojoba, argan, castor, rosemary, and more {"\u2014"} with liposomal
            vitamins A, C, and E, niacinamide, and botanical extracts, applied directly where hair
            actually grows.
          </p>
          <p className="body-text">
            One drop per section, massaged in. That{"\u2019"}s the entire routine.
          </p>
        </div>
      </div>
    </section>
  );
}
