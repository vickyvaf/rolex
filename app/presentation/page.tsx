"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Metadata } from "next";

// ── Types ──────────────────────────────────────────────────────────────────

interface SlideProps {
  children: React.ReactNode;
  index: number;
  active: boolean;
  ambient?: string;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function Slide({ children, index, active, ambient }: SlideProps) {
  return (
    <div
      className="slide"
      data-index={index}
      style={{
        minWidth: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: ambient ?? "none",
        }}
      />

      {/* Content wrapper */}
      <div
        style={{
          width: "100%",
          maxWidth: 1060,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Animate children in when slide is active */}
        <div
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SlideLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.6rem",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "var(--gold)",
        marginBottom: 18,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          display: "block",
          width: 28,
          height: 1,
          background: "var(--gold)",
        }}
      />
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-bodoni), 'Playfair Display', serif",
        fontSize: "clamp(2rem, 4vw, 3.2rem)",
        fontWeight: 400,
        lineHeight: 1.1,
        marginBottom: 18,
      }}
    >
      {children}
    </h2>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return (
    <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>
      {children}
    </em>
  );
}

function Body({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <p
      style={{
        fontSize: "1rem",
        color: "var(--text-muted)",
        lineHeight: 1.85,
        maxWidth: 640,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function Card({
  num,
  tag,
  title,
  children,
}: {
  num: string;
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid rgba(255,255,255,0.05)",
        padding: "32px 26px",
        position: "relative",
        transition: "border-color 0.3s, transform 0.3s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(200,169,110,0.25)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.05)";
        (e.currentTarget as HTMLDivElement).style.transform = "none";
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          fontSize: "0.52rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold-dark)",
        }}
      >
        {tag}
      </span>
      <div
        style={{
          fontFamily: "var(--font-bodoni), serif",
          fontSize: "2.8rem",
          color: "rgba(200,169,110,0.13)",
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        {num}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-bodoni), serif",
          fontSize: "1.1rem",
          fontWeight: 400,
          marginBottom: 8,
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.75 }}>
        {children}
      </p>
    </div>
  );
}

function TechCard({
  icon,
  title,
  badge,
  children,
}: {
  icon: string;
  title: React.ReactNode;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid rgba(255,255,255,0.04)",
        padding: "28px 22px",
        transition: "background 0.3s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background = "var(--surface2)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background = "var(--surface)")
      }
    >
      <span style={{ fontSize: "1.8rem", display: "block", marginBottom: 12 }}>
        {icon}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-bodoni), serif",
          fontSize: "1rem",
          fontWeight: 400,
          marginBottom: 6,
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
        {children}
      </p>
      <span
        style={{
          display: "inline-block",
          marginTop: 10,
          fontSize: "0.52rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          background: "rgba(200,169,110,0.1)",
          color: "var(--gold)",
          padding: "3px 9px",
          borderRadius: 2,
        }}
      >
        {badge}
      </span>
    </div>
  );
}



function ArchBox({
  title,
  desc,
  highlight,
}: {
  title: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        flex: 1,
        background: highlight ? "rgba(200,169,110,0.06)" : "var(--surface)",
        border: `1px solid ${
          highlight ? "rgba(200,169,110,0.18)" : "rgba(255,255,255,0.05)"
        }`,
        padding: "18px 16px",
        textAlign: "center",
        transition: "border-color 0.3s",
      }}
    >
      <h4
        style={{
          fontFamily: "var(--font-bodoni), serif",
          fontSize: "0.88rem",
          fontWeight: 400,
          marginBottom: 3,
        }}
      >
        {title}
      </h4>
      <p style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{desc}</p>
    </div>
  );
}

function CodeBlock() {
  return (
    <div
      style={{
        background: "#0d0d0d",
        border: "1px solid rgba(200,169,110,0.1)",
        borderRadius: 6,
        padding: "24px",
        fontFamily: "'SF Mono','Fira Code',monospace",
        fontSize: "0.76rem",
        lineHeight: 1.9,
        color: "#777",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(to right,var(--gold-dark),var(--gold),var(--gold-dark))",
        }}
      />
      {[
        ["comment", "// Map scroll → frame index"],
        ["normal", ""],
        [
          "mixed",
          [
            ["keyword", "const "],
            ["prop", "sequence"],
            ["normal", " = { "],
            ["prop", "frame"],
            ["normal", ": "],
            ["num", "0"],
            ["normal", " };"],
          ],
        ],
        ["normal", ""],
        [
          "mixed",
          [
            ["keyword", "const "],
            ["prop", "tl"],
            ["normal", " = "],
            ["func", "gsap"],
            ["normal", "."],
            ["func", "timeline"],
            ["normal", "({"],
          ],
        ],
        ["normal", "  scrollTrigger: {"],
        ["normal", '    start: "top top",'],
        ["normal", '    end: "+=1200%",'],
        ["normal", "    pin: true,"],
        ["normal", "    scrub: 2.5,"],
        ["normal", "  },"],
        ["normal", "});"],
        ["normal", ""],
        [
          "mixed",
          [
            ["prop", "tl"],
            ["normal", "."],
            ["func", "to"],
            ["normal", "("],
            ["prop", "sequence"],
            ["normal", ", {"],
          ],
        ],
        ["normal", "  frame: images.length - 1,"],
        ["normal", '  snap: "frame",'],
        ["normal", '  ease: "none",'],
        ["normal", "  onUpdate: render,"],
        ["normal", "}, 0);"],
      ].map((line, i) => {
        if (line[0] === "comment")
          return (
            <span
              key={i}
              style={{
                display: "block",
                color: "#3e3d3a",
                fontStyle: "italic",
              }}
            >
              {line[1] as string}
            </span>
          );
        if (line[0] === "normal")
          return (
            <span key={i} style={{ display: "block" }}>
              {line[1] as string}
            </span>
          );
        if (line[0] === "mixed") {
          const parts = line[1] as [string, string][];
          const colors: Record<string, string> = {
            keyword: "#c79bde",
            func: "#6acdee",
            prop: "#c8a96e",
            num: "#e5c07b",
            normal: "#777",
          };
          return (
            <span key={i} style={{ display: "block" }}>
              {parts.map(([type, text], j) => (
                <span key={j} style={{ color: colors[type] ?? "#777" }}>
                  {text}
                </span>
              ))}
            </span>
          );
        }
        return null;
      })}
    </div>
  );
}

// ── Frames visual ──────────────────────────────────────────────────────────

const frameBgs = [
  "linear-gradient(135deg,#1a1a1a,#2a2218)",
  "linear-gradient(135deg,#1e1c14,#2e2510)",
  "linear-gradient(135deg,#c8a96e22,#c8a96e08)",
  "linear-gradient(135deg,#1b1b18,#252318)",
  "linear-gradient(135deg,#171715,#201f18)",
];

function FramesDemo() {
  return (
    <div
      style={{
        background: "var(--surface2)",
        border: "1px solid rgba(200,169,110,0.1)",
        borderRadius: 8,
        padding: "24px 20px 44px",
        position: "relative",
        display: "flex",
        gap: 6,
        alignItems: "stretch",
      }}
    >
      {frameBgs.map((bg, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            aspectRatio: "16/9",
            borderRadius: 3,
            background: bg,
            border:
              i === 2
                ? "1px solid rgba(200,169,110,0.4)"
                : "1px solid rgba(200,169,110,0.1)",
            boxShadow:
              i === 2 ? "0 0 10px rgba(200,169,110,0.1)" : "none",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              bottom: 4,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "0.46rem",
              color: "var(--gold-dark)",
              letterSpacing: "0.1em",
            }}
          >
            {String(i + 1).padStart(3, "0")}
          </span>
        </div>
      ))}
      <span
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "0.56rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold-dark)",
          whiteSpace: "nowrap",
        }}
      >
        frame-001.jpg → frame-300.jpg
      </span>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

const TOTAL = 6;

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= TOTAL) return;
      setCurrent(idx);
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${idx * 100}vw)`;
      }
    },
    []
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(current + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(current - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
    touchStartX.current = null;
  };

  return (
    <>
      {/* ── Page-scoped styles ── */}
      <style>{`
        .presentation-root {
          --gold: #c8a96e;
          --gold-light: #e8c98e;
          --gold-dark: #8a6a3a;
          --surface: #111111;
          --surface2: #1a1a1a;
          --text-muted: #9a9590;
          --text-dim: #4a4740;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #0a0a0a;
          color: #f0ede8;
          position: relative;
        }
        .slides-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.7s cubic-bezier(0.77,0,0.175,1);
          will-change: transform;
        }
        .nav-btn {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          z-index: 200;
          background: rgba(10,10,10,0.7);
          border: 1px solid rgba(200,169,110,0.15);
          color: #c8a96e;
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
          backdrop-filter: blur(6px);
          font-size: 1.1rem;
        }
        .nav-btn:hover {
          background: rgba(200,169,110,0.12);
          border-color: #c8a96e;
          transform: translateY(-50%) scale(1.08);
        }
        .nav-btn:disabled { opacity: 0.2; cursor: default; pointer-events: none; }
        @media (max-width: 780px) {
          .slide { padding: 40px 28px !important; }
        }
      `}</style>

      <div
        className="presentation-root"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* ── TRACK ── */}
        <div className="slides-track" ref={trackRef}>

          {/* SLIDE 1 — Hero */}
          <Slide
            index={0}
            active={current === 0}
            ambient="radial-gradient(ellipse 70% 60% at 50% 55%,rgba(200,169,110,0.09) 0%,transparent 70%)"
          >
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 18 }}>
                Project Presentation
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-bodoni),'Playfair Display',serif",
                  fontSize: "clamp(3rem,7vw,6.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  marginBottom: 20,
                }}
              >
                Scroll-Driven<br />
                <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Image Sequence</em>
              </h1>
              <div style={{ width: 50, height: 1, background: "linear-gradient(to right,transparent,var(--gold),transparent)", margin: "0 auto 20px" }} />
              <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.85, maxWidth: 560, textAlign: "center" }}>
                A deep dive into the technique of rendering frame-by-frame animations
                synchronized with scroll position — creating seamless, cinematic experiences on the web.
              </p>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-dim)", marginTop: 32 }}>
                6 slides · use arrows or keyboard
              </p>
            </div>
          </Slide>

          {/* SLIDE 2 — What Is It */}
          <Slide
            index={1}
            active={current === 1}
            ambient="radial-gradient(ellipse 60% 50% at 20% 50%,rgba(200,169,110,0.06) 0%,transparent 60%)"
          >
            <SlideLabel>01 — What Is It</SlideLabel>
            <SectionTitle>
              An <Em>Image Sequence</Em><br />Is a Filmstrip for the Web
            </SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 70, alignItems: "center", marginTop: 16 }}>
              <div>
                <Body style={{ maxWidth: "none" }}>
                  An <strong style={{ color: "#f0ede8" }}>image sequence</strong> is a collection of still images
                  where each frame represents a moment in an animation. Instead of a video file,
                  the browser renders each frame on a{" "}
                  <code style={{ color: "var(--gold)" }}>&lt;canvas&gt;</code> element
                  and switches frames based on the user&apos;s scroll position.
                </Body>
                <Body style={{ maxWidth: "none", marginTop: 14 }}>
                  This technique powers cinematic scroll effects on high-end product pages —
                  an object appears to rotate or animate purely in response to how far you&apos;ve scrolled.
                </Body>
              </div>
              <FramesDemo />
            </div>
          </Slide>

          {/* SLIDE 3 — How It Works */}
          <Slide
            index={2}
            active={current === 2}
            ambient="radial-gradient(ellipse 60% 50% at 80% 50%,rgba(200,169,110,0.06) 0%,transparent 60%)"
          >
            <SlideLabel>02 — How It Works</SlideLabel>
            <SectionTitle>
              Three Phases of<br /><Em>Frame Rendering</Em>
            </SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, marginTop: 30 }}>
              <Card num="①" tag="Phase 01" title="Preload All Frames">
                All 300 JPEG frames are loaded into JavaScript{" "}
                <code>Image</code> objects in parallel. Once every image fires
                its <code>onload</code>, the first frame paints to canvas and
                the scroll timeline arms itself.
              </Card>
              <Card num="②" tag="Phase 02" title="Pin & Scrub">
                GSAP&apos;s ScrollTrigger pins the canvas in the viewport. As
                the user scrolls through 12× viewport height, a scrub value of
                2.5 smoothly interpolates the timeline — frame follows scroll
                without snapping.
              </Card>
              <Card num="③" tag="Phase 03" title="Draw Frame on Canvas">
                A GSAP tween mutates a plain object&apos;s <code>frame</code>{" "}
                property from 0 to 299. On every update, the render function
                clears the canvas and draws the current image with cover
                scaling.
              </Card>
            </div>
          </Slide>

          {/* SLIDE 4 — Scroll Mechanic */}
          <Slide
            index={3}
            active={current === 3}
            ambient="radial-gradient(ellipse 60% 50% at 50% 50%,rgba(200,169,110,0.05) 0%,transparent 65%)"
          >
            <SlideLabel>03 — Scroll Mechanic</SlideLabel>
            <SectionTitle>
              GSAP <Em>ScrollTrigger</Em><br />at the Core
            </SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 20 }}>
              <CodeBlock />
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {[
                  { icon: "📌", title: "Pin", desc: "Canvas stays fixed in viewport while scroll distance advances — keeping the animation visible throughout." },
                  { icon: "🎛️", title: "Scrub 2.5", desc: "Adds inertia — the animation lags slightly behind scroll, giving a buttery, momentum-driven feel." },
                  { icon: "🖼️", title: 'Snap: "frame"', desc: "Ensures the tweened value always lands on a whole integer — never a fractional frame index." },
                  { icon: "✍️", title: "Layered Text", desc: "Three fromTo tweens placed at specific frame offsets reveal overlay text at precisely the right moments." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 36, height: 36, border: "1px solid rgba(200,169,110,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1rem" }}>
                      {icon}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "var(--font-bodoni),serif", fontSize: "0.95rem", fontWeight: 400, marginBottom: 3 }}>{title}</h4>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Slide>

          {/* SLIDE 5 — Tech Stack + Perf */}
          <Slide
            index={4}
            active={current === 4}
            ambient="radial-gradient(ellipse 60% 50% at 50% 50%,rgba(200,169,110,0.05) 0%,transparent 65%)"
          >
            <SlideLabel>04 — Tech Stack & Performance</SlideLabel>
            <SectionTitle>
              Built With <Em>Modern Tools</Em>
            </SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, marginTop: 24 }}>
              <TechCard icon="⚡" badge="Framework" title={<>Next.js <span style={{ color: "var(--gold)" }}>16.2.4</span></>}>
                App Router + React <strong style={{ color: "#f0ede8" }}>19.2.4</strong>. The image sequence runs as a <code>&quot;use client&quot;</code> component to access browser APIs.
              </TechCard>
              <TechCard icon="🎬" badge="Animation" title={<>GSAP <span style={{ color: "var(--gold)" }}>^3.15.0</span></>}>
                <code>ScrollTrigger</code> plugin handles pin, scrub, and timeline sync with scroll position.
              </TechCard>
              <TechCard icon="🖼️" badge="Rendering" title="HTML Canvas API">
                Native Canvas renders each frame with cover-mode aspect ratio math. Frames pre-processed by <strong style={{ color: "#f0ede8" }}>Jimp ^1.6.1</strong>.
              </TechCard>
              <TechCard icon="🎨" badge="Styling" title={<>Tailwind CSS <span style={{ color: "var(--gold)" }}>^4</span></>}>
                Latest Tailwind with <code>@tailwindcss/postcss</code>, TypeScript <strong style={{ color: "#f0ede8" }}>^5</strong> & <strong style={{ color: "#f0ede8" }}>pnpm 9.15.9</strong>.
              </TechCard>
            </div>

          </Slide>

          {/* SLIDE 6 — Architecture */}
          <Slide
            index={5}
            active={current === 5}
            ambient="radial-gradient(ellipse 60% 50% at 50% 50%,rgba(200,169,110,0.05) 0%,transparent 65%)"
          >
            <SlideLabel>05 — Architecture</SlideLabel>
            <SectionTitle>
              Component <Em>Data Flow</Em>
            </SectionTitle>
            <Body>
              A single self-contained React component owns the canvas, image cache, and GSAP
              timeline — keeping all animation logic co-located.
            </Body>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 24 }}>
              <div style={{ display: "flex", gap: 2 }}>
                <ArchBox highlight title="User Scroll" desc="Browser scroll event" />
              </div>
              <div style={{ textAlign: "center", color: "var(--gold-dark)", fontSize: "1.1rem", padding: "2px 0" }}>↓</div>
              <div style={{ display: "flex", gap: 2 }}>
                <ArchBox highlight title="GSAP ScrollTrigger" desc="Translates scroll position → timeline progress" />
              </div>
              <div style={{ textAlign: "center", color: "var(--gold-dark)", fontSize: "1.1rem", padding: "2px 0" }}>↓</div>
              <div style={{ display: "flex", gap: 2 }}>
                <ArchBox title="Frame Object" desc="{ frame: 0…299 } tweened by GSAP" />
                <ArchBox title="Text Refs" desc="textRef1 / 2 / 3 — faded in/out at key frames" />
              </div>
              <div style={{ textAlign: "center", color: "var(--gold-dark)", fontSize: "1.1rem", padding: "2px 0" }}>↓</div>
              <div style={{ display: "flex", gap: 2 }}>
                <ArchBox highlight title="render()" desc="Clears canvas → draws imgObjects[frame] with cover scaling" />
              </div>
              <div style={{ textAlign: "center", color: "var(--gold-dark)", fontSize: "1.1rem", padding: "2px 0" }}>↓</div>
              <div style={{ display: "flex", gap: 2 }}>
                <ArchBox title="<canvas>" desc="Full-viewport, cover-scaled current frame" />
                <ArchBox title="Overlay Text" desc="Absolutely positioned, animated independently" />
              </div>
            </div>
          </Slide>

        </div>
        {/* /track */}

        {/* ── PREV BUTTON ── */}
        <button
          className="nav-btn"
          style={{ left: 28 }}
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          aria-label="Previous slide"
        >
          ←
        </button>

        {/* ── NEXT BUTTON ── */}
        <button
          className="nav-btn"
          style={{ right: 28 }}
          onClick={() => goTo(current + 1)}
          disabled={current === TOTAL - 1}
          aria-label="Next slide"
        >
          →
        </button>

        {/* ── DOTS ── */}
        <div
          style={{
            position: "fixed",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            zIndex: 200,
          }}
        >
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                padding: 0,
                background:
                  i === current
                    ? "var(--gold)"
                    : "rgba(200,169,110,0.2)",
                transform: i === current ? "scale(1.4)" : "scale(1)",
                transition: "background 0.4s, transform 0.4s",
              }}
            />
          ))}
        </div>

        {/* ── SLIDE BADGE ── */}
        <div
          style={{
            position: "fixed",
            top: 28,
            right: 36,
            zIndex: 200,
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
          }}
        >
          <span
            style={{
              color: "var(--gold)",
              fontFamily: "var(--font-bodoni),serif",
              fontSize: "0.9rem",
            }}
          >
            {current + 1}
          </span>{" "}
          / {TOTAL}
        </div>

        {/* ── KEY HINT ── */}
        <div
          style={{
            position: "fixed",
            bottom: 70,
            right: 36,
            zIndex: 200,
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {["←", "→"].map((k) => (
            <span
              key={k}
              style={{
                border: "1px solid var(--text-dim)",
                borderRadius: 3,
                padding: "1px 6px",
                fontSize: "0.6rem",
              }}
            >
              {k}
            </span>
          ))}
          <span>navigate</span>
        </div>
      </div>
    </>
  );
}
