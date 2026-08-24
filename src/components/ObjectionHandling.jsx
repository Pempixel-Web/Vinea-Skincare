import './ObjectionHandling.css';

const OBJECTIONS = [
  {
    q: 'Is this just another hair oil?',
    a: 'Most hair oils are formulated for the strands. Vinea is formulated to be applied to the scalp itself, which is where hair actually grows from.',
  },
  {
    q: 'Will it work for my hair type?',
    a: 'Vinea is designed for anyone who wants to support their scalp\u2019s health \u2014 it\u2019s suitable for men and women, and for any hair type.',
  },
  {
    q: 'Is it safe to use every day?',
    a: 'Vinea is designed for regular use as part of a routine. As with any topical product, discontinue use if irritation occurs and avoid contact with eyes.',
  },
];

export default function ObjectionHandling() {
  return (
    <section className="section section--stone objections">
      <div className="container container--narrow">
        <div className="section-head">
          <span className="eyebrow">Before you join</span>
          <h2 className="h-display-2">A few honest answers.</h2>
        </div>

        <div className="objections__list">
          {OBJECTIONS.map((o) => (
            <div className="objections__item" key={o.q}>
              <h3 className="h-display-3">{o.q}</h3>
              <p className="body-text">{o.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
