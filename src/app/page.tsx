import Desk from "@/components/Desk";
import { folders, identity } from "@/content/site";

export default function Home() {
  return (
    <>
      <Desk />
      <noscript>
        <div className="fallback">
          <h1>{identity.name}</h1>
          <p>{identity.role}</p>
          {identity.bio.map((line) => (
            <p key={line.slice(0, 24)}>{line}</p>
          ))}
          <p>
            {identity.contact.map((item) => (
              <span key={item.label}>
                <a href={item.href}>{item.value}</a>{" "}
              </span>
            ))}
          </p>
          {folders.map((folder) => (
            <section key={folder.id}>
              <h2>{folder.label}</h2>
              <p>{folder.hint}</p>
              {folder.entries.map((entry) => (
                <article key={entry.id}>
                  <h3>{entry.href ? <a href={entry.href}>{entry.title}</a> : entry.title}</h3>
                  {entry.meta && <p>{entry.meta}</p>}
                  {entry.blocks.map((block, i) => {
                    if (block.kind === "p") return <p key={i}>{block.text}</p>;
                    if (block.kind === "quote") return <blockquote key={i}>{block.text}</blockquote>;
                    if (block.kind === "list")
                      return (
                        <ul key={i}>
                          {block.items.map((item) => (
                            <li key={item.slice(0, 28)}>{item}</li>
                          ))}
                        </ul>
                      );
                    if (block.kind === "stats")
                      return (
                        <ul key={i}>
                          {block.items.map((item) => (
                            <li key={item.label}>
                              {item.value} — {item.label}
                            </li>
                          ))}
                        </ul>
                      );
                    if (block.kind === "links")
                      return (
                        <p key={i}>
                          {block.items.map((item) => (
                            <a key={item.href} href={item.href}>
                              {item.label}
                            </a>
                          ))}
                        </p>
                      );
                    return null;
                  })}
                </article>
              ))}
            </section>
          ))}
        </div>
      </noscript>
    </>
  );
}
