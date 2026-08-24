import WaitlistForm from './WaitlistForm';
import { INSTAGRAM_PRIORITY_WAITLIST_URL, ANALYTICS_EVENTS } from '../config/site';
import { track } from '../lib/analytics';
import './FinalCTA.css';

export default function FinalCTA() {
  return (
    <section className="section section--forest final-cta" id="join">
      <div className="container final-cta__inner">
        <div className="final-cta__copy">
          <span className="eyebrow">Vinea launches soon</span>
          <h2 className="h-display-1">Start your scalp, start your hair.</h2>
          <p className="lede">
            Vinea hasn{"\u2019"}t launched yet {"\u2014"} the waitlist is the only way to get priority access
            when it does. Join now and be first in line.
          </p>
          <a
            href={INSTAGRAM_PRIORITY_WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline"
            onClick={() => track(ANALYTICS_EVENTS.INSTAGRAM_CLICK, { context: 'final-cta' })}
          >
            Join the Vinea Priority Waitlist
          </a>
        </div>

        <div className="final-cta__form">
          <WaitlistForm id="final-waitlist" />
        </div>
      </div>
    </section>
  );
}
