import { INSTAGRAM_PRIORITY_WAITLIST_URL, ANALYTICS_EVENTS } from '../config/site';
import { track } from '../lib/analytics';
import './InstagramCTA.css';

export default function InstagramCTA() {
  return (
    <section className="instagram-cta">
      <div className="container instagram-cta__inner">
        <div>
          <span className="eyebrow">Vinea Priority Waitlist</span>
          <h2 className="h-display-2">Want to stay even closer to the Vinea launch?</h2>
          <p className="body-text">
            Join the Vinea Priority Waitlist on Instagram for launch updates, product news, early
            announcements, and Vinea content {"\u2014"} straight from the source.
          </p>
        </div>

        <a
          href={INSTAGRAM_PRIORITY_WAITLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary instagram-cta__btn"
          onClick={() => track(ANALYTICS_EVENTS.INSTAGRAM_CLICK, { context: 'dedicated-section' })}
        >
          Join the Vinea Priority Waitlist
        </a>
      </div>
    </section>
  );
}
