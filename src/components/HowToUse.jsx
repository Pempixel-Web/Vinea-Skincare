import './HowToUse.css';

const STEPS = [
  { n: '01', title: 'Part', body: 'Part your hair into sections across the scalp.' },
  { n: '02', title: 'Drop', body: 'Apply one drop of Vinea to each section, directly on the scalp.' },
  { n: '03', title: 'Massage', body: 'Gently massage each section until the oil is absorbed.' },
];

export default function HowToUse() {
  return (
    <section className="section how-to" id="how-it-works">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2 className="h-display-2">A routine that takes less time to do than to explain.</h2>
        </div>

        <ol className="how-to__track">
          {STEPS.map((step) => (
            <li className="how-to__step" key={step.n}>
              <span className="how-to__number">{step.n}</span>
              <h3 className="h-display-3">{step.title}</h3>
              <p className="body-text">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="how-to__note">
          Avoid contact with eyes. Discontinue use if irritation occurs. Keep out of reach of
          children. Store in a cool, dry place.
        </p>
      </div>
    </section>
  );
}
