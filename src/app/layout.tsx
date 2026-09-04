import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sourav Sarkar — AI Evals & Product",
  description:
    "Notes and practice on AI evaluation, product management, and the systems behind useful AI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
