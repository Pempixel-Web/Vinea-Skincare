import './Benefits.css';

const BENEFITS = [
  {
    title: 'Supports a healthy scalp environment',
    body: 'The formula is designed to help maintain the conditions a healthy scalp needs.',
  },
  {
    title: 'Helps keep the scalp hydrated',
    body: 'A blend of emollient oils designed to support scalp hydration where it\u2019s needed most.',
  },
  {
    title: 'Helps fortify hair at the follicle level',
    body: 'Formulated to support the follicle environment hair grows from.',
  },
  {
    title: 'Promotes healthier, shinier-looking hair',
    body: 'The visible outcome of consistent scalp care, over time.',
  },
  {
    title: 'Simple enough to actually stick to',
    body: 'One drop per section, massaged in {"\u2014"} designed to fit into a routine you {"\u2019"} ll keep.',
  },
];

export default function Benefits() {
  return (
    <section className="section section--stone benefits" id="benefits">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">What it {"\u2019"}s designed to do</span>
          <h2 className="h-display-2">Built around the scalp, for hair that looks the part.</h2>
        </div>

        <div className="grid benefits__grid">
          {BENEFITS.map((b, i) => (
            <div className="benefit-card" key={b.title}>
              <span className="benefit-card__index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h-display-3">{b.title}</h3>
              <p className="body-text">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
