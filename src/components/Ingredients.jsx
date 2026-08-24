import { useState } from 'react';
import './Ingredients.css';

const FEATURED = [
  { name: 'Rosemary Oil', role: 'Scalp-invigorating', note: 'A traditional scalp-care botanical, included for its long history in hair rituals.' },
  { name: 'Castor Oil', role: 'Deeply emollient', note: 'A thick, nourishing oil that helps seal in moisture at the scalp.' },
  { name: 'Jojoba Oil', role: 'Structurally similar to sebum', note: 'Closely mirrors the scalp{"\u2019"}s natural oils, helping it absorb without feeling heavy.' },
  { name: 'Argan Oil', role: 'Rich in fatty acids', note: 'Prized for softness and shine, and a staple of hair oils for good reason.' },
  { name: 'Jasmine Oil', role: 'Botanical, aromatic', note: 'Rounds out the sensory experience of the formula.' },
  { name: 'Niacinamide', role: 'Scalp-conditioning', note: 'A familiar skincare vitamin, brought to the scalp for the same conditioning support.' },
  { name: 'Vitamin A', role: 'Liposomal delivery', note: 'Encapsulated for more targeted delivery to the scalp.' },
  { name: 'Vitamin C', role: 'Antioxidant support', note: 'Included as part of Vinea{"\u2019"}s antioxidant complex.' },
  { name: 'Vitamin E', role: 'Antioxidant support', note: 'A well-studied antioxidant included to help support the scalp environment.' },
  { name: 'Green Tea Extract', role: 'Antioxidant-rich', note: 'A botanical extract included for its antioxidant properties.' },
  { name: 'Ginseng Root Extract', role: 'Traditional botanical', note: 'Panax ginseng root, included as part of Vinea{"\u2019"}s botanical complex.' },
];

const FULL_LIST = [
  'Jojoba Oil', 'Argan Oil', 'Sweet Almond Oil', 'Castor Oil', 'Coconut Oil', 'Jasmine Oil',
  'Olive Oil', 'Rosemary Oil', 'Peppermint Oil', 'Tea Tree Oil', 'Lavender Oil',
  'Vitamin A (Retinyl Palmitate)', 'Vitamin C (Ascorbyl Palmitate)', 'Vitamin E', 'Niacinamide',
  'Panax Ginseng Root Extract', 'Green Tea Extract', 'Calendula Extract',
];

export default function Ingredients() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section ingredients" id="formula">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Inside the formula</span>
          <h2 className="h-display-2">Eleven oils. A liposomal vitamin complex. Nothing filler.</h2>
          <p className="lede">
            Vinea uses liposomal delivery for its vitamin complex, designed to help the formula
            reach the scalp rather than sitting on the surface.
          </p>
        </div>

        <div className="grid ingredients__grid">
          {FEATURED.map((item) => (
            <div className="ingredient-card" key={item.name}>
              <span className="ingredient-card__role">{item.role}</span>
              <h3 className="ingredient-card__name">{item.name}</h3>
              <p className="ingredient-card__note">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="ingredients__full">
          <button
            type="button"
            className="ingredients__toggle"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="full-ingredient-list"
          >
            {expanded ? 'Hide full ingredient list' : 'View full ingredient list'}
          </button>
          {expanded && (
            <ul id="full-ingredient-list" className="ingredients__full-list">
              {FULL_LIST.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
