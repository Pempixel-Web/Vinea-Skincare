import "./WhyJoinWaitlist.css";

const VALUE_PROPS = [
  {
    title: "Priority access at launch",
    body: "Waitlist members get the first opportunity to purchase when Vinea becomes available.",
  },
  {
    title: "Launch updates, before anyone else",
    body: "Be the first to know when Vinea is ready \u2014 no guessing, no missing it.",
  },
  {
    title: "Exclusive announcements",
    body: "Waitlist-only updates as we get closer to launch.",
  },
  {
    title: "Scalp & hair care education",
    body: "Practical, responsible information on scalp health while you wait.",
  },
];

export default function WhyJoinWaitlist() {
  return (
    <section className="section why-join" id="why-join">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Why join now</span>
          <h2 className="h-display-2">
            Vinea isn{"\u2019"}t available yet {"\u2014"} here{"\u2019"}s what
            joining gets you.
          </h2>
        </div>

        <div className="grid why-join__grid">
          {VALUE_PROPS.map((v) => (
            <div className="why-join__item" key={v.title}>
              <h3 className="h-display-3">{v.title}</h3>
              <p className="body-text">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
