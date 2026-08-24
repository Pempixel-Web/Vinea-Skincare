import { useState } from 'react';
import { BRAND } from '../config/site';
import './FAQ.css';

const FAQS = [
  {
    q: 'What is Vinea Scalp Health & Hair Growth Oil?',
    a: `A ${BRAND.size} scalp oil formulated with natural oils, liposomal vitamins, and botanical extracts, designed to support scalp health and promote healthier-looking, shinier hair.`,
  },
  {
    q: 'Who is Vinea for?',
    a: 'Anyone who wants to bring more intentional care to their scalp as part of their hair routine.',
  },
  {
    q: 'Can men use Vinea?',
    a: 'Yes \u2014 Vinea is formulated for both men and women.',
  },
  {
    q: 'How do I use it?',
    a: 'Part the hair, apply one drop to each section of the scalp, and gently massage until absorbed.',
  },
  {
    q: 'How much product is in the bottle?',
    a: `Each bottle contains ${BRAND.size}.`,
  },
  {
    q: 'What ingredients are included?',
    a: 'Eleven natural oils \u2014 including jojoba, argan, rosemary, and castor \u2014 plus a liposomal vitamin and botanical extract complex. The full ingredient list is available in the formula section above.',
  },
  {
    q: 'How often should I use it?',
    a: 'Vinea is designed to be used regularly as part of your routine. Full usage guidance will ship with the product.',
  },
  {
    q: 'When will Vinea launch?',
    a: 'Vinea is currently in pre-launch. Waitlist members will be the first to know the exact date.',
  },
  {
    q: 'How much will Vinea cost?',
    a: `Vinea will launch at $${BRAND.priceAfterLaunch}.`,
  },
  {
    q: 'What happens when I join the waitlist?',
    a: 'You\u2019ll receive launch updates and get priority access to purchase Vinea as soon as it\u2019s available.',
  },
  {
    q: 'Can I join the Instagram Priority Waitlist?',
    a: 'Yes \u2014 it\u2019s open to anyone who wants launch updates, product news, and early announcements in one place.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq" id="faq">
      <div className="container container--narrow">
        <div className="section-head">
          <span className="eyebrow">Frequently Asked Questions - FAQ</span>
          <h2 className="h-display-2">Everything you{"\u2019"}d want to know before joining.</h2>
        </div>

        <div className="faq__list">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className="faq__item" key={item.q}>
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq__icon" aria-hidden="true">{isOpen ? '\u2212' : '+'}</span>
                </button>
                {isOpen && (
                  <p id={`faq-answer-${i}`} className="faq__answer">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
