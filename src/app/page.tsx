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
    period: "OCT 2025 — NOW",
    title: "Product Manager, Enterprise AI Platform",
    company: "EY, AI Center of Excellence",
    description:
      "Own an AI-native data platform for GenAI insights and agentic decisioning. Built its eval and guardrail layer: 1,000+ human-labelled cases, production review sampling, PII redaction, and model routing that cut inference cost 40%.",
    impact:
      "Across BPO, aerospace, healthcare, and insurance: 90% automated QA across 50,000+ daily interactions; a Honeywell solution lifted CSAT 83% → 97%.",
  },
  {
    period: "APR 2024 — OCT 2025",
    title: "Product Manager, AI Data Platform",
    company: "Nielsen Media",
    description:
      "Owned the roadmap for Nielsen’s audio data platform, including Python ETL microservices, an S3 data lake, and a 12-node EMR-Spark pipeline handling multi-terabyte daily volume.",
    impact:
      "Reduced data lag 70%, sustained 99.9%+ uptime at P99, and reduced platform cost 15%.",
  },
  {
    period: "JUN 2022 — MAR 2024",
    title: "Product Manager, B2B Subscription",
    company: "Eblity",
    description:
      "Found product-market fit for a subscription product for educational institutions, shaping customer discovery, pricing, growth roadmap, and partnerships.",
    impact:
      "Grew revenue 35% year over year; partnerships returned 250% ROI.",
  },
  {
    period: "NOV 2020 — JAN 2022",
    title: "Associate Product Manager, Consumer Platform",
    company: "Sparklin",
    description:
      "Took a consumer product through launch and iteration, using experiments across acquisition and engagement to guide product decisions.",
    impact:
      "Increased user acquisition 30% month over month and engagement 15% month over month.",
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
              From consumer platforms and B2B SaaS to data infrastructure and
              enterprise AI, my work has been grounded in a single habit:
              measure what matters before scaling what works.
            </p>
          </div>
          <div className="timeline">
            {journey.map((item) => (
              <article key={item.period}>
                <span>{item.period}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="company">{item.company}</p>
                  <p>{item.description}</p>
                  <p className="impact">{item.impact}</p>
                </div>
              </article>
            ))}
          </div>
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
        <p className="section-label">IN THEIR WORDS</p>
        <div className="recognition-grid">
          <article className="quote-card">
            <span className="quote-mark">“</span>
            <p>
              Sourav consistently stood out for his ownership and clarity of
              thought. He has a strong ability to break down ambiguous
              problems, align stakeholders, and drive execution end-to-end.
            </p>
            <div className="reviewer">
              <a href="https://www.linkedin.com/in/sameeksha-nath/" target="_blank" rel="noreferrer">
                Sameeksha Nath <Arrow />
              </a>
              <span>Senior Product Manager, Nielsen</span>
            </div>
          </article>
          <article className="quote-card">
            <span className="quote-mark">“</span>
            <p>
              He demonstrates solid product sense and a clear point of view,
              is dependable with ambiguous work, and consistently follows
              through to get things done.
            </p>
            <div className="reviewer">
              <a href="https://www.linkedin.com/in/siddhirawool/" target="_blank" rel="noreferrer">
                Siddhi Rawool <Arrow />
              </a>
              <span>Product &amp; cross-functional feedback</span>
            </div>
          </article>
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
      </section>

      <footer className="shell">
        <span>© {new Date().getFullYear()} SOURAV SARKAR</span>
        <span>AIEVALSGUY.XYZ</span>
      </footer>
    </main>
  );
}
