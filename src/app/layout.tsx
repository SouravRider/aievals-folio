import type { Metadata } from "next";
import { identity } from "@/content/site";
import "./globals.css";

const description =
  "Sourav Sarkar builds the eval and guardrail layer behind enterprise AI: offline scoring, human review sampling, redaction and model routing. Notes on AI evals, product management and strategy.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aievalsguy.xyz"),
  title: "Sourav Sarkar — AI evals, product, strategy",
  description,
  openGraph: {
    title: "Sourav Sarkar — AI evals, product, strategy",
    description,
    url: "https://aievalsguy.xyz",
    siteName: "aievalsguy",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Sourav Sarkar — AI evals, product, strategy", description },
};

const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  jobTitle: "AI Product Manager",
  email: "sourav.work20@gmail.com",
  url: "https://aievalsguy.xyz",
  address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" },
  sameAs: ["https://www.linkedin.com/in/sourav-sarkar-324943143/", "https://souravsarkar.substack.com/"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
