"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  blockText,
  folders,
  identity,
  overview,
  recentWriting,
  type Block,
  type Entry,
  type Folder,
} from "@/content/site";
import { ArrowIcon, BackIcon, CloseIcon, FolderIcon, MoonIcon, SearchIcon, SunIcon } from "./icons";

type Theme = "light" | "dark";
type Offset = { x: number; y: number };
type Size = { w: number; h: number };

const NOTE_COUNT = folders.reduce((total, folder) => total + folder.entries.length, 0);

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Desk() {
  const [theme, setTheme] = useState<Theme>("light");
  const [tabs, setTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selection, setSelection] = useState<Record<string, string | null>>({});
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [size, setSize] = useState<Size | null>(null);
  const [sheetY, setSheetY] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [isMac, setIsMac] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const noteRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dragRef = useRef<{ x: number; y: number; left: number; top: number; w: number; h: number } | null>(null);
  const resizeRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const sheetRef = useRef<{ y: number } | null>(null);

  useEffect(() => {
    const stored = document.documentElement.dataset.theme;
    if (stored === "dark" || stored === "light") setTheme(stored);
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.userAgent));
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing modes reject writes; the in-memory theme still applies.
    }
  }, []);

  const openFolder = useCallback((folderId: string, entryId?: string) => {
    const folder = folders.find((item) => item.id === folderId);
    setTabs((current) => (current.includes(folderId) ? current : [...current, folderId]));
    setActiveTab(folderId);
    setSelection((current) => ({
      ...current,
      [folderId]: entryId ?? folder?.entries[0]?.id ?? null,
    }));
  }, []);

  const closeTab = useCallback(
    (folderId: string) => {
      setTabs((current) => {
        const next = current.filter((id) => id !== folderId);
        if (activeTab === folderId) {
          const index = current.indexOf(folderId);
          setActiveTab(next[Math.max(0, index - 1)] ?? null);
        }
        return next;
      });
    },
    [activeTab],
  );

  const closeNote = useCallback(() => {
    setTabs([]);
    setActiveTab(null);
    setSheetY(0);
  }, []);

  const index = useMemo(
    () =>
      folders.flatMap((folder) =>
        folder.entries.map((entry) => ({
          folder,
          entry,
          haystack: [folder.label, entry.title, entry.meta ?? "", entry.note ?? "", blockText(entry)]
            .join(" ")
            .toLowerCase(),
        })),
      ),
    [],
  );

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return index.filter((item) => item.haystack.includes(term)).slice(0, 30);
  }, [index, query]);

  useEffect(() => setCursor(0), [query]);

  const activeFolder = folders.find((folder) => folder.id === activeTab) ?? null;
  const activeEntryId = activeTab ? selection[activeTab] ?? null : null;
  const activeEntry = activeFolder?.entries.find((entry) => entry.id === activeEntryId) ?? null;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const inField =
        !!target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
        return;
      }

      if (event.key === "Escape") {
        if (paletteOpen) {
          setPaletteOpen(false);
        } else if (activeTab && selection[activeTab]) {
          setSelection((current) => ({ ...current, [activeTab]: null }));
        } else if (tabs.length) {
          closeNote();
        }
        return;
      }

      if (inField || event.metaKey || event.ctrlKey || event.altKey) return;

      if (/^[a-z0-9]$/i.test(event.key)) {
        event.preventDefault();
        setQuery(event.key);
        setPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeTab, closeNote, paletteOpen, selection, tabs.length]);

  useEffect(() => {
    if (paletteOpen) inputRef.current?.focus();
    else setQuery("");
  }, [paletteOpen]);

  useEffect(() => {
    if (!isDesktop) {
      setOffset({ x: 0, y: 0 });
      setSize(null);
    }
  }, [isDesktop]);

  const onBarPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    if (!isDesktop) {
      onGripPointerDown(event);
      return;
    }
    const element = noteRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: rect.left - offset.x,
      top: rect.top - offset.y,
      w: rect.width,
      h: rect.height,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onBarPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDesktop) {
      onGripPointerMove(event);
      return;
    }
    const start = dragRef.current;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    setOffset({
      x: clamp(dx, 150 - start.w - start.left, window.innerWidth - 150 - start.left),
      y: clamp(dy, 12 - start.top, window.innerHeight - 90 - start.top),
    });
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDesktop) {
      onGripPointerUp(event);
      return;
    }
    if (!dragRef.current) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onResizePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDesktop) return;
    const element = noteRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    resizeRef.current = { x: event.clientX, y: event.clientY, w: rect.width, h: rect.height };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onResizePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const start = resizeRef.current;
    if (!start) return;
    setSize({
      w: clamp(start.w + (event.clientX - start.x), 420, window.innerWidth - 80),
      h: clamp(start.h + (event.clientY - start.y), 340, window.innerHeight - 60),
    });
  };

  const endResize = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!resizeRef.current) return;
    resizeRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onGripPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isDesktop) return;
    sheetRef.current = { y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onGripPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!sheetRef.current) return;
    setSheetY(Math.max(0, event.clientY - sheetRef.current.y));
  };

  const onGripPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!sheetRef.current) return;
    sheetRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (sheetY > 110) closeNote();
    else setSheetY(0);
  };

  const onListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const items = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>(".entry-row") ?? []);
    if (!items.length) return;
    event.preventDefault();
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    const step = event.key === "ArrowDown" ? 1 : -1;
    const next = current === -1 ? 0 : (current + step + items.length) % items.length;
    items[next]?.focus();
  };

  const noteOpen = tabs.length > 0 && activeFolder !== null;

  return (
    <>
      <a className="skip" href="#index">
        Skip to the index
      </a>

      <div className="desk">
        <aside className="ident">
          <div className="ident-top">
            <h1 className="ident-name">
              <button type="button" onClick={closeNote} aria-label="Return to overview">
                {identity.name}
              </button>
            </h1>
            <div className="tools">
              <button
                type="button"
                className="tool-btn"
                aria-label="Search everything"
                aria-expanded={paletteOpen}
                onClick={() => setPaletteOpen(true)}
              >
                <SearchIcon className="glyph" />
              </button>
              <div className="theme" role="group" aria-label="Appearance">
                <span className="theme-thumb" aria-hidden="true" data-theme={theme} />
                <button
                  type="button"
                  aria-label="Light mode"
                  aria-pressed={theme === "light"}
                  onClick={() => applyTheme("light")}
                >
                  <SunIcon className="glyph glyph-sm" />
                </button>
                <button
                  type="button"
                  aria-label="Dark mode"
                  aria-pressed={theme === "dark"}
                  onClick={() => applyTheme("dark")}
                >
                  <MoonIcon className="glyph glyph-sm" />
                </button>
              </div>
            </div>
          </div>

          <p className="ident-role">{identity.role}</p>
          {identity.bio.map((line) => (
            <p className="ident-bio" key={line.slice(0, 24)}>
              {line}
            </p>
          ))}

          <ul className="index" id="index">
            {folders.map((folder) => {
              const open = tabs.includes(folder.id);
              return (
                <li key={folder.id}>
                  <button
                    type="button"
                    className="index-item"
                    data-open={open}
                    data-active={activeTab === folder.id}
                    aria-expanded={open}
                    onClick={() => openFolder(folder.id)}
                  >
                    <FolderIcon className="glyph folder-glyph" />
                    <span className="index-label">{folder.label}</span>
                    <span className="index-count">{folder.entries.length}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <dl className="contact">
            <dt className="sr-only">Location</dt>
            <dd className="contact-place">{identity.place}</dd>
            {identity.contact.map((item) => (
              <div className="contact-row" key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  <a href={item.href} target={item.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
                    {item.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <p className="colophon">aievalsguy.xyz</p>
        </aside>

        <main className="stage" aria-label="Notes">
          {!noteOpen && (
            <section className="welcome">
              <div className="welcome-head">
                <div className="welcome-intro">
                  <p className="eyebrow">AI evals · product · strategy</p>
                  <h2 className="welcome-line">{overview.headline}</h2>
                  <p className="welcome-body">{overview.lede}</p>
                  <div className="welcome-actions">
                    <button type="button" className="cta cta-primary" onClick={() => openFolder("work")}>
                      See the work
                      <ArrowIcon className="glyph glyph-xs" />
                    </button>
                    <button type="button" className="cta" onClick={() => openFolder("proof")}>
                      Proof of work
                      <ArrowIcon className="glyph glyph-xs" />
                    </button>
                  </div>
                </div>
                <div className="welcome-visuals">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="portrait"
                    src={overview.portrait.src}
                    alt={overview.portrait.alt}
                    width={400}
                    height={400}
                  />
                  <button
                    type="button"
                    className="featured-award"
                    onClick={() => openFolder("proof", "client-extraordinaire")}
                    aria-label="View the EY Client Extraordinaire award certificate"
                  >
                    <span className="award-kicker">Recognition · EY</span>
                    <span className="award-title">Client Extraordinaire</span>
                    <span className="award-copy">
                      Awarded for serving as a trusted business advisor and
                      creating value for the client.
                    </span>
                    <span className="award-link">
                      View award
                      <ArrowIcon className="glyph glyph-xs" />
                    </span>
                  </button>
                </div>
              </div>

              <dl className="welcome-stats">
                {overview.stats.map((stat) => (
                  <div key={stat.value}>
                    <dt>{stat.value}</dt>
                    <dd>{stat.label}</dd>
                  </div>
                ))}
              </dl>

              <div className="overview-grid">
                <section className="card">
                  <p className="card-label">Selected outcomes</p>
                  <ul className="outcome-list">
                    {overview.outcomes.map((outcome) => (
                      <li key={outcome.metric}>
                        <span className="outcome-metric">{outcome.metric}</span>
                        <span className="outcome-text">{outcome.text}</span>
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="card-link" onClick={() => openFolder("work")}>
                    Roles, deployments and evals
                    <ArrowIcon className="glyph glyph-xs" />
                  </button>
                </section>

                <section className="card">
                  <p className="card-label">Writing</p>
                  <p className="card-body">{overview.writing.text}</p>
                  <ul className="topic-list">
                    {overview.writing.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                  <ul className="recent-list">
                    {recentWriting.map((post) => (
                      <li key={post.id}>
                        <button type="button" onClick={() => openFolder("writing", post.id)}>
                          <span className="recent-title">{post.title}</span>
                          <span className="recent-date">{post.meta}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="card-link" onClick={() => openFolder("writing")}>
                    Read 16 posts
                    <ArrowIcon className="glyph glyph-xs" />
                  </button>
                </section>

                <section className="card">
                  <p className="card-label">Proof of work</p>
                  <ul className="proof-list">
                    {overview.proof.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <button type="button" className="card-link" onClick={() => openFolder("proof")}>
                    See the receipts
                    <ArrowIcon className="glyph glyph-xs" />
                  </button>
                </section>
              </div>

              <div className="welcome-foot">
                <p className="welcome-cta">
                  Working on a hard AI problem?{" "}
                  <a href="mailto:sourav.work20@gmail.com">sourav.work20@gmail.com</a>
                </p>
                <p className="welcome-hint">
                  Search {NOTE_COUNT} notes with <kbd>{isMac ? "⌘" : "Ctrl"}</kbd>
                  <kbd>K</kbd>
                </p>
              </div>
            </section>
          )}

          {noteOpen && activeFolder && (
            <>
              {!isDesktop && <button type="button" className="scrim" aria-label="Close notes" onClick={closeNote} />}
              <article
                className="note"
                ref={noteRef}
                data-sheet={!isDesktop}
                style={
                  isDesktop
                    ? { transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`, width: size?.w, height: size?.h }
                    : { transform: `translate3d(0, ${sheetY}px, 0)` }
                }
              >
                <div
                  className="sheet-grip"
                  onPointerDown={onGripPointerDown}
                  onPointerMove={onGripPointerMove}
                  onPointerUp={onGripPointerUp}
                  onPointerCancel={onGripPointerUp}
                >
                  <span />
                </div>

                <div
                  className="note-bar"
                  onPointerDown={onBarPointerDown}
                  onPointerMove={onBarPointerMove}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  onDoubleClick={() => {
                    setOffset({ x: 0, y: 0 });
                    setSize(null);
                  }}
                >
                  <div className="tabs" role="tablist" aria-label="Open folders">
                    {tabs.map((tabId) => {
                      const folder = folders.find((item) => item.id === tabId) as Folder;
                      return (
                        <div className="tab" key={tabId} data-active={tabId === activeTab}>
                          <button
                            type="button"
                            role="tab"
                            aria-selected={tabId === activeTab}
                            onClick={() => setActiveTab(tabId)}
                          >
                            {folder.label}
                          </button>
                          <button type="button" className="tab-close" aria-label={`Close ${folder.label}`} onClick={() => closeTab(tabId)}>
                            <CloseIcon className="glyph glyph-xs" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <button type="button" className="tool-btn note-close" aria-label="Close notes" onClick={closeNote}>
                    <CloseIcon className="glyph glyph-sm" />
                  </button>
                </div>

                <div className="note-body" data-view={activeEntry ? "reader" : "list"}>
                  <div className="pane pane-list">
                    <div className="pane-head">
                      <p className="pane-hint">{activeFolder.hint}</p>
                      {activeFolder.link && (
                        <a className="pane-link" href={activeFolder.link.href} target="_blank" rel="noreferrer">
                          {activeFolder.link.label}
                          <ArrowIcon className="glyph glyph-xs" />
                        </a>
                      )}
                    </div>
                    <ul className="entry-list" ref={listRef} onKeyDown={onListKeyDown}>
                      {activeFolder.entries.map((entry) => (
                        <li key={entry.id}>
                          <button
                            type="button"
                            className="entry-row"
                            aria-current={entry.id === activeEntryId}
                            onClick={() =>
                              setSelection((current) => ({ ...current, [activeFolder.id]: entry.id }))
                            }
                          >
                            <span className="entry-title">{entry.title}</span>
                            {entry.meta && <span className="entry-meta">{entry.meta}</span>}
                            {entry.note && <span className="entry-note">{entry.note}</span>}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pane pane-read">
                    {activeEntry ? (
                      <Reader
                        entry={activeEntry}
                        onBack={() => setSelection((current) => ({ ...current, [activeFolder.id]: null }))}
                      />
                    ) : (
                      <p className="pane-empty">Pick a note from {activeFolder.label} to read it here.</p>
                    )}
                  </div>
                </div>

                {isDesktop && (
                  <button
                    type="button"
                    className="resize"
                    aria-label="Resize notes"
                    onPointerDown={onResizePointerDown}
                    onPointerMove={onResizePointerMove}
                    onPointerUp={endResize}
                    onPointerCancel={endResize}
                  />
                )}
              </article>
            </>
          )}
        </main>
      </div>

      {paletteOpen && (
        <div className="palette" role="dialog" aria-modal="true" aria-label="Search">
          <button type="button" className="palette-scrim" aria-label="Close search" onClick={() => setPaletteOpen(false)} />
          <div className="palette-box">
            <div className="palette-field">
              <SearchIcon className="glyph" />
              <input
                ref={inputRef}
                value={query}
                placeholder={`Search ${NOTE_COUNT} notes`}
                aria-label="Search notes"
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setCursor((value) => Math.min(value + 1, Math.max(0, results.length - 1)));
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setCursor((value) => Math.max(0, value - 1));
                  }
                  if (event.key === "Enter" && results[cursor]) {
                    const hit = results[cursor];
                    openFolder(hit.folder.id, hit.entry.id);
                    setPaletteOpen(false);
                  }
                }}
              />
              <kbd>esc</kbd>
            </div>
            {query.trim() !== "" && (
              <div className="palette-results">
                {results.length === 0 ? (
                  <p className="palette-empty">
                    Nothing matches “{query.trim()}”. Try a company, a metric, or a topic like evals.
                  </p>
                ) : (
                  <ul>
                    {results.map((hit, position) => (
                      <li key={`${hit.folder.id}-${hit.entry.id}`}>
                        <button
                          type="button"
                          data-cursor={position === cursor}
                          onMouseEnter={() => setCursor(position)}
                          onClick={() => {
                            openFolder(hit.folder.id, hit.entry.id);
                            setPaletteOpen(false);
                          }}
                        >
                          <span className="result-title">{hit.entry.title}</span>
                          <span className="result-meta">
                            {hit.folder.label}
                            {hit.entry.meta ? ` · ${hit.entry.meta}` : ""}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Reader({ entry, onBack }: { entry: Entry; onBack: () => void }) {
  return (
    <article className="reader">
      <button type="button" className="back" onClick={onBack}>
        <BackIcon className="glyph glyph-xs" />
        All notes
      </button>
      <h2 className="reader-title">{entry.title}</h2>
      {entry.meta && <p className="reader-meta">{entry.meta}</p>}
      <div className="reader-body">
        {entry.blocks.map((block, i) => (
          <BlockView block={block} key={i} />
        ))}
      </div>
    </article>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul className="b-list">
          {block.items.map((item) => (
            <li key={item.slice(0, 28)}>{item}</li>
          ))}
        </ul>
      );
    case "stats":
      return (
        <dl className="b-stats">
          {block.items.map((item) => (
            <div key={item.label}>
              <dt>{item.value}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>
      );
    case "quote":
      return <blockquote className="b-quote">{block.text}</blockquote>;
    case "image":
      // eslint-disable-next-line @next/next/no-img-element
      return <img className="b-image" src={block.src} alt={block.alt} loading="lazy" />;
    case "carousel":
      return <ImageCarousel images={block.images} />;
    case "links":
      return (
        <p className="b-links">
          {block.items.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
              <ArrowIcon className="glyph glyph-xs" />
            </a>
          ))}
        </p>
      );
  }
}

function ImageCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    setIndex((next + images.length) % images.length);
  };

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Manager feedback"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(index - 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(index + 1);
        }
      }}
    >
      <div className="carousel-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="b-image" src={images[index].src} alt={images[index].alt} loading="lazy" />
      </div>
      <div className="carousel-controls">
        <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous feedback">
          <BackIcon className="glyph glyph-xs" />
          <span className="control-label">Previous</span>
        </button>
        <span aria-live="polite">
          {index + 1} / {images.length}
        </span>
        <button type="button" onClick={() => goTo(index + 1)} aria-label="Next feedback">
          <span className="control-label">Next</span>
          <BackIcon className="glyph glyph-xs carousel-next" />
        </button>
      </div>
      <div className="carousel-dots" role="group" aria-label="Choose feedback">
        {images.map((image, position) => (
          <button
            type="button"
            key={image.src}
            aria-label={`Show feedback ${position + 1}`}
            aria-current={position === index}
            onClick={() => setIndex(position)}
          />
        ))}
      </div>
    </div>
  );
}
