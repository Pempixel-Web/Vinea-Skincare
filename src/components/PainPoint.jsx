import './PainPoint.css';

const PAIN_POINTS = [
  {
    title: 'Your routine may stop at the strands',
    body: 'Shampoo, conditioner, serums and styling products are designed primarily around the hair you can see. But your scalp deserves attention too.',
  },
  {
    title: 'Your scalp deserves a routine of its own',
    body: 'The scalp is the foundation your hair grows from, yet its often treated as an afterthought. Vinea was created to change that',
  },
  {
    title: 'There is a simpler way to care for your scalp',
    body: 'Instead of adding another product to your hair, Vinea takes a scalp-first approach — giving you a simple routine designed specifically for the scalp.',
    
  },
];

export default function PainPoint() {
  return (
    <section className="section pain">
      <div className="container container--narrow">
        <div className="section-head">
          <span className="eyebrow">The gap in most routines</span>
          <h2 className="h-display-2">Your hair gets the attention. Your scalp often doesn't.</h2>
        </div>

        <div className="grid pain__grid">
          {PAIN_POINTS.map((point) => (
            <div className="pain__item" key={point.title}>
              <h3 className="h-display-3">{point.title}</h3>
              <p className="body-text">{point.body}</p>
              
            </div>
            
          ))}
        </div>
        <p className="pain__item">Your hair starts at the scalp. Start there.</p>
      </div>
    </section>
  );
}
