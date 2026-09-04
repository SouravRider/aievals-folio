const Arrow = () => <span aria-hidden="true">↗</span>;

const perspectives = [
  {
    number: "01",
    title: "AI evaluation",
    text: "Making quality measurable—before models meet the people who depend on them.",
  },
  {
    number: "02",
    title: "AI product",
    text: "Turning emerging capability into focused products with a reason to exist.",
  },
  {
    number: "03",
    title: "AI strategy",
    text: "Finding the highest-leverage problems, and the evidence needed to pursue them.",
  },
];

const journey = [
  {
    period: "NOW",
    title: "AI product & evaluation",
    description:
      "Building a practice around reliable AI systems, product judgment, and evaluation-led development.",
  },
  {
    period: "FOCUS",
    title: "From models to outcomes",
    description:
      "Working at the intersection of infrastructure, applied AI, and the human workflows products need to improve.",
  },
  {
    period: "APPROACH",
    title: "Evidence over intuition",
    description:
      "Combining user insight, rigorous measurement, and clear product strategy to make AI genuinely useful.",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <a className="wordmark" href="#top" aria-label="Sourav Sarkar home">
          SS<span>·</span>AI
        </a>
        <div className="nav-links">
          <a href="#journey">Journey</a>
          <a href="#writing">Writing</a>
          <a href="mailto:sourav.work20@gmail.com">Contact</a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <p className="eyebrow">AI EVALS · PRODUCT · STRATEGY</p>
        <h1>
          Building the
          <br />
          <em>evidence</em> behind
          <br />
          better AI.
        </h1>
        <div className="hero-bottom">
          <p className="intro">
            I’m Sourav Sarkar, an AI product leader exploring how evaluation,
            product craft, and strategy can help AI earn its place in the real
            world.
          </p>
          <a className="circle-link" href="#writing" aria-label="Read writing">
            <Arrow />
          </a>
        </div>
      </section>

      <section className="marquee" aria-label="Topics">
        <div>AI EVALUATION <i>✦</i> PRODUCT THINKING <i>✦</i> USEFUL INTELLIGENCE <i>✦</i> AI EVALUATION <i>✦</i></div>
      </section>

      <section className="lens shell">
        <p className="section-label">THE LENS</p>
        <div className="perspective-grid">
          {perspectives.map((item) => (
            <article className="perspective" key={item.number}>
              <span>{item.number}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="journey-shell" id="journey">
        <div className="shell">
          <p className="section-label light">PROFESSIONAL JOURNEY</p>
          <div className="journey-heading">
            <h2>A product career shaped by the questions AI makes possible.</h2>
            <p>
              My work sits between what models can do and what people need them
              to do. That means asking better questions, designing sharper
              feedback loops, and never mistaking a demo for a product.
            </p>
          </div>
          <div className="timeline">
            {journey.map((item) => (
              <article key={item.period}>
                <span>{item.period}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="journey-note">
            A detailed experience timeline is being curated from Sourav’s
            professional record.
          </p>
        </div>
      </section>

      <section className="writing shell" id="writing">
        <p className="section-label">FIELD NOTES</p>
        <div className="writing-card">
          <div>
            <p className="kicker">ON SUBSTACK</p>
            <h2>Notes on building AI that deserves to be trusted.</h2>
            <p>
              Essays on AI evaluation, product management, infrastructure, and
              the decisions that shape intelligent systems.
            </p>
          </div>
          <a
            className="button"
            href="https://souravsarkar.substack.com/"
            target="_blank"
            rel="noreferrer"
          >
            Visit the newsletter <Arrow />
          </a>
        </div>
      </section>

      <section className="recognition shell">
        <p className="section-label">RECOGNITION</p>
        <div className="recognition-grid">
          <div className="quote-card">
            <span className="quote-mark">“</span>
            <p>
              Manager feedback and selected awards will live here—adding the
              voices and moments that have shaped my work.
            </p>
            <span className="caption">COMING SOON</span>
          </div>
          <div className="contact-card">
            <p className="kicker">LET’S CONNECT</p>
            <h2>Working on a hard AI problem?</h2>
            <a href="mailto:sourav.work20@gmail.com">sourav.work20@gmail.com <Arrow /></a>
            <a
              href="https://www.linkedin.com/in/sourav-sarkar-324943143/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer className="shell">
        <span>© {new Date().getFullYear()} SOURAV SARKAR</span>
        <span>AIEVALSGUY.XYZ</span>
      </footer>
    </main>
  );
}
