export type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "stats"; items: { value: string; label: string }[] }
  | { kind: "quote"; text: string }
  | { kind: "image"; src: string; alt: string }
  | { kind: "carousel"; images: { src: string; alt: string }[] }
  | { kind: "links"; items: { label: string; href: string }[] };

export type Entry = {
  id: string;
  title: string;
  meta?: string;
  note?: string;
  href?: string;
  blocks: Block[];
};

export type Folder = {
  id: string;
  label: string;
  hint: string;
  link?: { label: string; href: string };
  entries: Entry[];
};

export const identity = {
  name: "Sourav Sarkar",
  role: "AI product manager — evals, agentic systems, data platforms.",
  bio: [
    "I own the measurement layer: the evals, guardrails and routing that decide whether an AI system is allowed to ship.",
    "Today at EY's AI Center of Excellence, putting GenAI into production inside client environments across BPO, aerospace, healthcare and insurance. Before that, Nielsen's audio data platform.",
  ],
  place: "Bangalore, India",
  contact: [
    { label: "Email", value: "sourav.work20@gmail.com", href: "mailto:sourav.work20@gmail.com" },
    { label: "LinkedIn", value: "sourav-sarkar", href: "https://www.linkedin.com/in/sourav-sarkar-324943143/" },
    { label: "Substack", value: "souravsarkar", href: "https://souravsarkar.substack.com/" },
  ],
};

export const overview = {
  portrait: {
    src: "/sourav-sarkar.png",
    alt: "Sourav Sarkar reading at a cafe",
  },
  headline: "Nothing ships without proof it works.",
  lede: "I take GenAI from prototype to production inside enterprises that cannot afford to be wrong. Four live deployments in my first year at EY — across BPO, aerospace, healthcare and insurance — each one through an eval and guardrail layer that client security, risk and procurement sign off on before rollout.",
  stats: [
    { value: "5+", label: "years in product, across AI, data and B2B SaaS" },
    { value: "4", label: "enterprise AI deployments in year one at EY" },
    { value: "40%", label: "lower inference cost, quality held" },
  ],
  outcomes: [
    {
      metric: "83% → 97%",
      text: "CSAT on an agentic case-resolution system for Honeywell Aerospace, past a 93% contractual threshold. The contract was renewed.",
    },
    {
      metric: "10% → 90%",
      text: "QA coverage at Everise across 50,000+ interactions a day, at 92% scoring parity with human auditors.",
    },
    {
      metric: "~$0.02 → ~$0.50",
      text: "Revenue per call at Firstsource, from decision support delivered to agents mid-conversation.",
    },
  ],
  writing: {
    text: "I write about making AI measurable: what to evaluate, how to grade it, and the data platforms underneath.",
    topics: ["AI evals", "AI product management", "Data platforms", "Weekly AI briefings"],
  },
  proof: [
    "Siddhi Rawool — Director, Generative AI CoE, EY India",
    "Sameeksha Nath — Senior Product Manager, Nielsen",
    "EY Client Extraordinaire — May 2026",
  ],
};

const work: Entry[] = [
  {
    id: "ey",
    title: "Product Manager, Enterprise AI Platform",
    meta: "EY, AI Center of Excellence · Oct 2025 — Present",
    note: "Data transformation, GenAI insights and agentic decisioning, deployed inside client environments.",
    blocks: [
      {
        kind: "p",
        text: "I own EY's AI-native data platform and the eval and guardrail layer every deployment runs through. Client security and risk teams review that layer before anything goes live.",
      },
      {
        kind: "stats",
        items: [
          { value: "4", label: "live deployments in year one" },
          { value: "1,000+", label: "human-labelled eval cases" },
          { value: "40%", label: "lower inference cost from routing" },
        ],
      },
      {
        kind: "list",
        items: [
          "Offline scoring, production sampling for human review, PII redaction and model routing, owned end to end.",
          "Delivery inside locked-down client environments where data cannot leave the network.",
          "Sectors shipped into: BPO, aerospace repair and overhaul, healthcare BPM, insurance.",
        ],
      },
    ],
  },
  {
    id: "nielsen",
    title: "Product Manager, AI Data Platform",
    meta: "Nielsen Media · Apr 2024 — Oct 2025",
    note: "Roadmap for the core audio data platform and the pipeline underneath it.",
    blocks: [
      {
        kind: "p",
        text: "I owned the roadmap for Nielsen's audio data platform, and wrote a fair amount of it. The work was equal parts product and infrastructure: what the data promised downstream, and whether the pipeline could keep that promise.",
      },
      {
        kind: "stats",
        items: [
          { value: "70%", label: "reduction in data lag" },
          { value: "99.9%+", label: "uptime at P99" },
          { value: "15%", label: "lower platform cost" },
        ],
      },
      {
        kind: "list",
        items: [
          "Shipped the embedded analytics that closed multi-year enterprise contracts on a $650M audio measurement line, which grew 5% year over year.",
          "Designed and wrote the Python microservices behind ETL orchestration on an S3 data lake and a 12-node EMR-Spark pipeline handling multi-terabyte days.",
          "Negotiated data SLAs with data science and operations: P95 lag under five minutes, above 99% accuracy.",
        ],
      },
    ],
  },
  {
    id: "eblity",
    title: "Product Manager, B2B Subscription",
    meta: "Eblity · Jun 2022 — Mar 2024",
    note: "Found product-market fit for a subscription product sold to educational institutions.",
    blocks: [
      {
        kind: "p",
        text: "Customer discovery, pricing and the growth roadmap for a B2B subscription sold into institutions, with the long sales cycles that come with them.",
      },
      {
        kind: "stats",
        items: [
          { value: "35%", label: "revenue growth year over year" },
          { value: "250%", label: "ROI on institutional partnerships" },
          { value: "45%", label: "faster setup" },
        ],
      },
      {
        kind: "list",
        items: [
          "A/B tested signup and landing pages; client acquisition up 20% month over month.",
          "Worked alongside sales and marketing through institutional procurement cycles.",
        ],
      },
    ],
  },
  {
    id: "sparklin",
    title: "Associate Product Manager, Consumer Platform",
    meta: "Sparklin · Nov 2020 — Jan 2022",
    note: "Ran a consumer product end to end, through launch and iteration.",
    blocks: [
      {
        kind: "p",
        text: "My first product role, and where the habit started: ship, measure, and let the experiment settle the argument.",
      },
      {
        kind: "stats",
        items: [
          { value: "30%", label: "user acquisition, month over month" },
          { value: "15%", label: "engagement, month over month" },
        ],
      },
    ],
  },
];

const deployments: Entry[] = [
  {
    id: "everise",
    title: "Automated QA at 50,000 interactions a day",
    meta: "Everise — BPO for Apple, Microsoft, Airbus",
    note: "From a 10% manual sample to 90% automated auditing, without customer data leaving the network.",
    blocks: [
      {
        kind: "p",
        text: "Everise audited roughly a tenth of its interactions by hand. We took auditing to 90% coverage across more than 50,000 interactions a day, running entirely inside their locked-down VDI environment.",
      },
      {
        kind: "stats",
        items: [
          { value: "90%", label: "of interactions audited, up from 10%" },
          { value: "92%", label: "scoring parity with human auditors" },
          { value: "50,000+", label: "interactions a day" },
        ],
      },
      {
        kind: "p",
        text: "Parity with human auditors was the number that made the system acceptable. Without it, coverage would have been a statistic nobody trusted.",
      },
    ],
  },
  {
    id: "honeywell",
    title: "Agentic case resolution for repair and overhaul",
    meta: "Honeywell Aerospace",
    note: "Tool calling with human review on low-confidence cases, against a contractual CSAT threshold.",
    blocks: [
      {
        kind: "p",
        text: "Scoped and shipped a case-resolution agent with Honeywell's service team, with tool calling and a human in the loop wherever the model was not confident.",
      },
      {
        kind: "stats",
        items: [
          { value: "83% → 97%", label: "CSAT" },
          { value: "93%", label: "contractual threshold" },
          { value: "Renewed", label: "contract outcome" },
        ],
      },
    ],
  },
  {
    id: "firstsource",
    title: "In-call decision support",
    meta: "Firstsource — healthcare BPM",
    note: "Support during live calls that helped agents qualify and win higher-value work.",
    blocks: [
      {
        kind: "p",
        text: "Decision support in front of agents mid-call, so they could resolve queries faster and move into higher-value work rather than simply closing tickets.",
      },
      {
        kind: "stats",
        items: [{ value: "~$0.02 → ~$0.50", label: "revenue per call" }],
      },
    ],
  },
  {
    id: "insurance",
    title: "A conversational agent on live policy data",
    meta: "Insurance carrier",
    note: "Queries live policy data mid-conversation to personalise what it tells the customer.",
    blocks: [
      {
        kind: "p",
        text: "Most conversational agents answer from a static corpus. This one runs live database queries during the conversation, so the answer reflects the policy the customer actually holds.",
      },
      {
        kind: "stats",
        items: [
          { value: "+28%", label: "first-contact resolution, client reported" },
          { value: "−60%", label: "wait times" },
        ],
      },
    ],
  },
];

const evals: Entry[] = [
  {
    id: "bar",
    title: "The bar: nothing ships without proof it works",
    note: "Why the measurement layer exists, and who it is really for.",
    blocks: [
      {
        kind: "p",
        text: "Enterprise AI does not fail because the model is weak. It fails because nobody can show, in terms a risk function accepts, that the system behaves. The eval layer is the argument you hand to the people who can stop your launch.",
      },
      {
        kind: "p",
        text: "That reframes the work. Evals are not a QA chore at the end of a roadmap; they are the artefact that gets AI past security, risk and procurement.",
      },
    ],
  },
  {
    id: "offline",
    title: "Offline scoring against a labelled set",
    note: "A 1,000+ case human-labelled set, scored before anything reaches production.",
    blocks: [
      {
        kind: "p",
        text: "Every change is scored against a human-labelled set of more than a thousand cases. It is slow to build and unglamorous to maintain, and it is the only thing that turns a subjective 'this feels better' into a number two teams can argue about.",
      },
    ],
  },
  {
    id: "sampling",
    title: "Human review on sampled production traffic",
    note: "5% of live traffic sampled, because the labelled set ages the moment you ship.",
    blocks: [
      {
        kind: "p",
        text: "Five percent of production traffic is sampled for human review. Offline sets describe the world you imagined; sampling describes the one you got. When the two disagree, the labelled set is what needs updating.",
      },
    ],
  },
  {
    id: "guardrails",
    title: "Guardrails and PII redaction",
    note: "Redaction at the boundary, in environments where data cannot leave the network.",
    blocks: [
      {
        kind: "p",
        text: "Redaction and guardrails are what make deployment possible inside client environments — locked-down VDI, no customer data crossing the network boundary. This is the part client security and risk teams read line by line.",
      },
    ],
  },
  {
    id: "routing",
    title: "Model routing under a cost ceiling",
    note: "40% lower inference cost, held to the same quality bar.",
    blocks: [
      {
        kind: "p",
        text: "Routing cut inference cost by 40%. The constraint that mattered was not the saving; it was proving quality did not move while the saving happened — which is only checkable if the eval layer already exists.",
      },
    ],
  },
  {
    id: "parity",
    title: "Parity as the acceptance criterion",
    note: "92% scoring parity with human auditors is what made automation acceptable.",
    blocks: [
      {
        kind: "p",
        text: "When AI replaces human judgement, coverage is not the headline number — agreement is. At Everise, 92% scoring parity with human auditors was the threshold that let automated QA stand in for people.",
      },
    ],
  },
];

const writingPosts: { title: string; date: string; note: string; href: string }[] = [
  {
    title: "Data Platform Foundation: 101",
    date: "Aug 2026",
    note: "Unified infrastructure for collection, processing, storage and distribution — and why the enterprise now depends on it.",
    href: "https://souravsarkar.substack.com/p/data-platform-foundation-101",
  },
  {
    title: "This week in AI",
    date: "Apr 2026",
    note: "Weekly AI updates: actionable tips, top startups and state-of-the-art breakthroughs in ten minutes.",
    href: "https://souravsarkar.substack.com/p/this-week-in-ai-862",
  },
  {
    title: "This week in AI",
    date: "Apr 2026",
    note: "Weekly AI updates: actionable tips, networking opportunities and breakthroughs worth your attention.",
    href: "https://souravsarkar.substack.com/p/this-week-in-ai-186",
  },
  {
    title: "This week in AI",
    date: "Apr 2026",
    note: "The first edition of the weekly roundup.",
    href: "https://souravsarkar.substack.com/p/this-week-in-ai",
  },
  {
    title: "Human Evals: an intro to evals for enterprise-grade AI product building",
    date: "Dec 2025",
    note: "Moving beyond vibes to build a rigorous grading system for the un-measurable.",
    href: "https://souravsarkar.substack.com/p/human-evals-an-intro-evals-for-enterprise",
  },
  {
    title: "On Mentorship",
    date: "May 2025",
    note: "Long term, long term, long term.",
    href: "https://souravsarkar.substack.com/p/on-mentorship",
  },
  {
    title: "Thoughts on PM using AI",
    date: "May 2025",
    note: "A two-minute read on where AI actually helps a product manager.",
    href: "https://souravsarkar.substack.com/p/thoughts-on-ai-pming-quick-read-2",
  },
  {
    title: "Product Insights: A Curated Guide",
    date: "Apr 2025",
    note: "Must-follow resources for product builders.",
    href: "https://souravsarkar.substack.com/p/product-insights-a-curated-guide",
  },
  {
    title: "Uber One: dynamic pricing for the value-conscious Indian user",
    date: "Jan 2025",
    note: "A teardown of Uber's mass-premium subscription and what it assumes about price sensitivity.",
    href: "https://souravsarkar.substack.com/p/uber-one-an-experiment-for-dynamic",
  },
  {
    title: "Concept Edition 1: Lindy Effect",
    date: "Jun 2022",
    note: "What the Lindy effect is, why it matters, and how it affects the things you build.",
    href: "https://souravsarkar.substack.com/p/concept-edition-1-lindy-effect",
  },
  {
    title: "Plan events on WhatsApp",
    date: "Jun 2022",
    note: "A product concept: lightweight plans for the group chat where plans already happen.",
    href: "https://souravsarkar.substack.com/p/plan-events-in-whatsapp",
  },
  {
    title: "HexaHealth",
    date: "Mar 2022",
    note: "Product note on zero-cost assistance for surgeries.",
    href: "https://souravsarkar.substack.com/p/hexahealth",
  },
  {
    title: "Jar App",
    date: "Mar 2022",
    note: "Product note on building a habit of investing in gold, a rupee at a time.",
    href: "https://souravsarkar.substack.com/p/jar-app",
  },
  {
    title: "Audius",
    date: "Mar 2022",
    note: "Product note on a decentralized platform connecting artists directly with fans.",
    href: "https://souravsarkar.substack.com/p/audius",
  },
  {
    title: "Rewatch",
    date: "Mar 2022",
    note: "Product note on making a team's video content searchable and useful.",
    href: "https://souravsarkar.substack.com/p/rewatch",
  },
  {
    title: "Typefully",
    date: "Mar 2022",
    note: "Product note on writing and scheduling for people who publish in public.",
    href: "https://souravsarkar.substack.com/p/typefully",
  },
];

const writing: Entry[] = writingPosts.map((post, i) => ({
  id: `post-${i}`,
  title: post.title,
  meta: post.date,
  note: post.note,
  href: post.href,
  blocks: [
    { kind: "p", text: post.note },
    { kind: "links", items: [{ label: "Read on Substack", href: post.href }] },
  ],
}));

const feedback: Entry[] = [
  {
    id: "siddhi",
    title: "Siddhi Rawool",
    meta: "Director, Generative AI Center of Excellence, EY India · manages Sourav directly",
    note: "On product judgment, ownership, execution and cross-functional leadership.",
    href: "https://www.linkedin.com/in/siddhirawool/",
    blocks: [
      {
        kind: "carousel",
        images: [
          {
            src: "/proof/siddhi-feedback-1.png",
            alt: "Manager feedback from Siddhi Rawool on Sourav's product judgment, ownership, execution, collaboration and communication.",
          },
          {
            src: "/proof/siddhi-feedback-2.png",
            alt: "Additional manager feedback from Siddhi Rawool describing Sourav as a force multiplier for delivery.",
          },
        ],
      },
      { kind: "links", items: [{ label: "Siddhi on LinkedIn", href: "https://www.linkedin.com/in/siddhirawool/" }] },
    ],
  },
  {
    id: "sameeksha",
    title: "Sameeksha Nath",
    meta: "Senior Product Manager, Nielsen · managed Sourav directly",
    note: "On ownership, clarity of thought, and driving execution end to end.",
    href: "https://www.linkedin.com/in/sameeksha-nath/",
    blocks: [
      {
        kind: "image",
        src: "/proof/sameeksha-nath.png",
        alt: "LinkedIn recommendation from Sameeksha Nath, Senior Product Manager at Nielsen, dated 3 May 2026, describing Sourav's ownership, clarity of thought, and ability to break down ambiguous problems and drive execution end to end.",
      },
      { kind: "links", items: [{ label: "Sameeksha on LinkedIn", href: "https://www.linkedin.com/in/sameeksha-nath/" }] },
    ],
  },
];

const awards: Entry[] = [
  {
    id: "client-extraordinaire",
    title: "Client Extraordinaire",
    meta: "EY · 01 May 2026",
    note: "Presented by Rohan Sachdev, Consulting Services Leader.",
    blocks: [
      {
        kind: "image",
        src: "/awards/ey-client-extraordinaire.jpg",
        alt: "EY Client Extraordinaire award certificate presented to Sourav Sarkar, dated 01 May 2026",
      },
    ],
  },
];

const toolkit: Entry[] = [
  {
    id: "ai",
    title: "AI and evals",
    note: "The measurement layer, and the systems it governs.",
    blocks: [
      {
        kind: "list",
        items: [
          "Eval design and offline scoring",
          "Guardrails and PII redaction",
          "Agentic workflows with tool calling and human-in-the-loop",
          "RAG and semantic layer design",
          "Model routing and LLM cost control",
        ],
      },
    ],
  },
  {
    id: "data",
    title: "Data and platform",
    note: "What I can build myself rather than only specify.",
    blocks: [
      {
        kind: "list",
        items: [
          "Python, SQL, Spark",
          "AWS — S3, EMR, Athena",
          "Microservices and ETL pipelines",
          "Semantic data modelling and real-time data systems",
          "Embedded analytics and self-serve BI",
        ],
      },
    ],
  },
  {
    id: "product",
    title: "Product craft",
    note: "Getting things shipped in environments that resist shipping.",
    blocks: [
      {
        kind: "list",
        items: [
          "0→1 delivery in regulated environments",
          "Roadmap ownership and pricing",
          "Go-to-market and A/B testing",
          "SLA negotiation",
          "Direct work with client security, risk and operations teams",
        ],
      },
    ],
  },
  {
    id: "education",
    title: "Education",
    meta: "2016 — 2020",
    note: "B.Tech, Electronics & Communication.",
    blocks: [
      { kind: "p", text: "RCC Institute of Information Technology — B.Tech, Electronics & Communication." },
      { kind: "p", text: "Top startup, TiECON Kolkata." },
    ],
  },
];

const workArchive: Entry[] = [
  ...work,
  ...deployments.map((entry) => ({
    ...entry,
    meta: `SELECTED DEPLOYMENT · ${entry.meta}`,
  })),
  ...evals.map((entry) => ({
    ...entry,
    meta: "EVALUATION PRACTICE",
  })),
  ...toolkit.map((entry) => ({
    ...entry,
    meta: entry.meta ? `FOUNDATION · ${entry.meta}` : "CAPABILITIES",
  })),
];

const proofOfWork: Entry[] = [
  ...feedback.map((entry) => ({
    ...entry,
    meta: `FEEDBACK · ${entry.meta}`,
  })),
  ...awards.map((entry) => ({
    ...entry,
    meta: `AWARD · ${entry.meta}`,
  })),
];

export const folders: Folder[] = [
  {
    id: "work",
    label: "work",
    hint: "Roles, selected deployments, evaluation practice and capabilities.",
    entries: workArchive,
  },
  {
    id: "writing",
    label: "writing",
    hint: "Essays and product notes.",
    link: { label: "souravsarkar.substack.com", href: "https://souravsarkar.substack.com/" },
    entries: writing,
  },
  {
    id: "proof",
    label: "proof of work",
    hint: "Recognition and feedback from people I have worked with.",
    entries: proofOfWork,
  },
];

const seenTitles = new Set<string>();

export const recentWriting = writing
  .filter((entry) => {
    const key = entry.title.toLowerCase();
    if (seenTitles.has(key)) return false;
    seenTitles.add(key);
    return true;
  })
  .slice(0, 3)
  .map(({ id, title, meta }) => ({ id, title, meta }));

export function blockText(entry: Entry): string {
  return entry.blocks
    .map((block) => {
      switch (block.kind) {
        case "p":
        case "quote":
          return block.text;
        case "list":
          return block.items.join(" ");
        case "stats":
          return block.items.map((item) => `${item.value} ${item.label}`).join(" ");
        case "links":
          return block.items.map((item) => item.label).join(" ");
        case "image":
          return block.alt;
        case "carousel":
          return block.images.map((image) => image.alt).join(" ");
      }
    })
    .join(" ");
}
