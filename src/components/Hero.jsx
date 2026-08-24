import ProductImage from './ProductImage';
import WaitlistForm from './WaitlistForm';
import { IMAGES, BRAND, INSTAGRAM_PRIORITY_WAITLIST_URL, ANALYTICS_EVENTS } from '../config/site';
import { track } from '../lib/analytics';
import './Hero.css';

export default function Hero() {
  return (
    <header className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__wordmark">{BRAND.name}</div>

          <h1 className="hero__headline">
            Healthier-looking hair starts with a healthier scalp.
          </h1>

          <p className="hero__subhead">
            Most hair routines focus on the strands while overlooking the scalp underneath. Vinea takes a scalp-first approach — combining jojoba, argan, and rosemary with liposomal vitamins to support a healthy scalp environment and give your hair a better foundation to grow from. Join the waitlist for priority access when we launch.
          </p>

          <div className="hero__form-card">
            <WaitlistForm id="hero-waitlist" />
          </div>

          <a
            href={INSTAGRAM_PRIORITY_WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__instagram-link"
            onClick={() => track(ANALYTICS_EVENTS.INSTAGRAM_CLICK, { context: 'hero' })}
          >
            Prefer Instagram? Join the Vinea Priority Waitlist {" \u2192"}
          </a>
        </div>

        <div className="hero__visual">
          <ProductImage src={IMAGES.heroProduct} alt="Vinea Scalp Health & Hair Growth Oil bottle" ratio="5 / 5" />
          <div className="hero__visual-tag">
            <span className="eyebrow" style={{ marginBottom: 0 }}>
              {BRAND.size}
            </span>
            <p>Vinea Scalp Health & Hair Growth Oil. <br></br> Priority access · Waitlist open now.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
