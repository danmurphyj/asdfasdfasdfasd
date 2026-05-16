// $MONEY — interactive era-swapping landing
const { useState, useEffect, useMemo, useRef } = React;


const ERAS = [
  {
    id: "stone",
    num: "01",
    year: "2,000,000 BC",
    name: "STONE AGE",
    tag: "BEFORE COINS",
    blurb: "When trade meant clubs, bones, and shiny rocks.",
    img:   "/photo1.png",  
    video: "/stone.mp4",  
    palette: { bg: "#2a1810", fg: "#f4d4a8", accent: "#d97757", glow: "rgba(217, 119, 87, .9)" },
  },
  {
    id: "food",
    num: "02",
    year: "10,000 BC",
    name: "BARTER ERA",
    tag: "WHEAT WAS MONEY",
    blurb: "Wheat for cattle. Fish for figs. Hunger was money.",
    img:   "/photo2.png",   
    video: "/food.mp4",   
    palette: { bg: "#3d2410", fg: "#fcd97a", accent: "#f4a020", glow: "rgba(244, 160, 32, .85)" },
  },
  {
    id: "coin",
    num: "03",
    year: "600 BC — 2025",
    name: "CASH ERA",
    tag: "GOLD STANDARD",
    blurb: "Kings, banks, fiat, the whole Wall Street circus.",
    img:   "photo3.png",   
    video: "/coin-bg.mp4",   
    palette: { bg: "#2a0a14", fg: "#e8b04a", accent: "#c8362a", glow: "rgba(232, 176, 74, .85)" },
  },
  {
    id: "solana",
    num: "04",
    year: "2026 → ∞",
    name: "SOLANA ERA",
    tag: "ON-CHAIN",
    blurb: "Blockspace cheap. Dreams cheap. Time to load up.",
    img:   "/photo4.png",   
    video: "/solana-bg.mp4",   
    palette: { bg: "#08081a", fg: "#14F195", accent: "#9945FF", glow: "rgba(153, 69, 255, .9)" },
  },
];

const TICKER = "$MONEY";
const CONTRACT = "GhFuVwnn2hp5nSMEcADgLG3qDvNwsDwsgDJX3RRmpump";
const SOCIALS = {
  tg: "https://t.me/money_memecoin",
  x: "https://x.com/money_memecoin",
  dex: "https://dexscreener.com/solana/3qdt4pndyycnzia2bbhv61t6szacvlqx4qyomughkww6",
};
const BUY_URL = "https://swap.pump.fun/?input=So11111111111111111111111111111111111111112&output=GhFuVwnn2hp5nSMEcADgLG3qDvNwsDwsgDJX3RRmpump";


function StoneBg({ hasVideo }) {
  const puffs = [0, 1, 2, 3, 4];
  return (
    <div className={"bg-layer" + (hasVideo ? "" : " bg-stone")}>
      {puffs.map((i) => (
        <div
          key={i}
          className="stone-smoke"
          style={{
            left: `${-20 + i * 22}%`,
            animationDelay: `${i * 4.4}s`,
            animationDuration: `${18 + (i % 3) * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

function FoodBg({ hasVideo }) {
  const grains = Array.from({ length: 28 });
  return (
    <div className={"bg-layer" + (hasVideo ? "" : " bg-food")}>
      {grains.map((_, i) => (
        <div
          key={i}
          className="grain"
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i * 0.5) % 14}s`,
            animationDuration: `${10 + (i % 5) * 2}s`,
            transform: `scale(${0.6 + (i % 4) * 0.25})`,
          }}
        />
      ))}
    </div>
  );
}

function CoinBg({ hasVideo }) {
  const coins = Array.from({ length: 22 });
  return (
    <div className={"bg-layer" + (hasVideo ? "" : " bg-coin")}>
      {coins.map((_, i) => (
        <div
          key={i}
          className="coin"
          style={{
            left: `${(i * 43) % 100}%`,
            animationDelay: `${(i * 0.4) % 8}s`,
            animationDuration: `${6 + (i % 5)}s`,
            transform: `scale(${0.7 + (i % 3) * 0.3})`,
          }}
        />
      ))}
    </div>
  );
}

function SolanaBg({ hasVideo }) {
  const charsRef = useRef("01ABCDEF$MONEY◆◇▲▼▮▯◯•".split(""));
  const cols = 28;
  const columns = useMemo(() => {
    return Array.from({ length: cols }, (_, c) => {
      const length = 14 + (c % 10);
      let s = "";
      for (let i = 0; i < length; i++) {
        s += charsRef.current[(c * 7 + i * 11) % charsRef.current.length] + "\n";
      }
      return { text: s, dur: 6 + (c % 7), delay: -(c * 0.6), left: `${(c / cols) * 100}%` };
    });
  }, []);
  return (
    <div className={"bg-layer" + (hasVideo ? "" : " bg-solana")}>
      {columns.map((col, i) => (
        <div
          key={i}
          className="matrix"
          style={{
            left: col.left,
            animationDuration: `${col.dur}s`,
            animationDelay: `${col.delay}s`,
            opacity: 0.3 + (i % 5) * 0.1,
          }}
        >
          {col.text}
        </div>
      ))}
    </div>
  );
}


function VideoBg({ eraId }) {
  return (
    <>
      {ERAS.map((e) =>
        e.video ? (
          <video
            key={e.id}
            src={e.video}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              opacity: eraId === e.id ? 1 : 0,
              transition: "opacity 700ms ease",
              pointerEvents: "none",
            }}
          />
        ) : null
      )}
    </>
  );
}

function Bg({ eraId }) {
  const hasVideo = Object.fromEntries(ERAS.map((e) => [e.id, !!e.video]));
  return (
    <>
      <VideoBg eraId={eraId} />
      <div style={{ opacity: eraId === "stone"  ? 1 : 0, transition: "opacity 700ms ease" }}><StoneBg  hasVideo={hasVideo.stone}  /></div>
      <div style={{ opacity: eraId === "food"   ? 1 : 0, transition: "opacity 700ms ease" }}><FoodBg   hasVideo={hasVideo.food}   /></div>
      <div style={{ opacity: eraId === "coin"   ? 1 : 0, transition: "opacity 700ms ease" }}><CoinBg   hasVideo={hasVideo.coin}   /></div>
      <div style={{ opacity: eraId === "solana" ? 1 : 0, transition: "opacity 700ms ease" }}><SolanaBg hasVideo={hasVideo.solana} /></div>
    </>
  );
}


const SocialIcon = ({ kind }) => {
  if (kind === "tg") {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    );
  }
  if (kind === "x") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M3 3h4.5l4.2 6 4.8-6H21l-7.2 8.6L21.6 21H17l-4.6-6.5L7 21H3l7.7-9.3L3 3z" />
      </svg>
    );
  }
  if (kind === "dex") {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 3 3 5-7" />
        <path d="M14 6h5v5" />
      </svg>
    );
  }
  return null;
};

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (_) {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <>
      {copied ? <span className="ca-copied">COPIED</span> : null}
      <button className="ca-copy" onClick={onCopy} aria-label="Copy contract">
        {copied ? (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        )}
      </button>
    </>
  );
}


function App() {
  const [eraIdx, setEraIdx] = useState(3);
  const era = ERAS[eraIdx];

  useEffect(() => {
    document.body.dataset.era = era.id;
  }, [era.id]);

  const cssVars = {
    "--era-bg": era.palette.bg,
    "--era-fg": era.palette.fg,
    "--era-accent": era.palette.accent,
    color: era.palette.fg,
  };

  const shortCa = CONTRACT.length > 14 ? CONTRACT.slice(0, 6) + "..." + CONTRACT.slice(-6) : CONTRACT;

  return (
    <div style={cssVars}>
      <Bg eraId={era.id} />

      {}
      <div className="marquee" aria-hidden style={{ color: era.palette.fg }}>
        <div className="marquee-track">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>{TICKER} • {era.name} • PAYING SINCE {ERAS[0].year} • </span>
          ))}
        </div>
      </div>

      <div className="shell" data-screen-label="01 Landing">
        {}
        <div className="nav">
          <div className="logo" style={{ color: era.palette.fg }}>
            <span className="logo-coin" style={{ color: era.palette.accent }} />
            $MONEY
          </div>
          <div className="socials">
            <a className="social-btn" href={SOCIALS.dex} target="_blank" rel="noreferrer" title="Dex"><SocialIcon kind="dex" /></a>
            <a className="social-btn" href={SOCIALS.tg}  target="_blank" rel="noreferrer" title="Telegram"><SocialIcon kind="tg" /></a>
            <a className="social-btn" href={SOCIALS.x}   target="_blank" rel="noreferrer" title="X"><SocialIcon kind="x" /></a>
          </div>
        </div>

        {}
        <div className="stage">
          <div className="character-frame">
            <div className="character-glow" style={{ background: `radial-gradient(circle, ${era.palette.glow}, transparent 60%)` }} />

            {}
            {ERAS.map((e) => (
              <div
                key={e.id}
                style={{
                  position: "absolute", inset: 0,
                  opacity: e.id === era.id ? 1 : 0,
                  transform: e.id === era.id ? "scale(1)" : "scale(.94)",
                  transition: "opacity 500ms ease, transform 500ms ease",
                  pointerEvents: e.id === era.id ? "auto" : "none",
                }}
              >
                {e.img ? (
                  <img
                    src={e.img}
                    alt={e.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "14px" }}
                  />
                ) : (
                  <div style={{
                    width: "100%", height: "100%", borderRadius: "14px",
                    background: "rgba(255,255,255,.06)",
                    border: "1px dashed rgba(255,255,255,.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", color: "rgba(255,255,255,.35)",
                    textAlign: "center", padding: "8px",
                  }}>
                    {e.id}.img<br />не задан
                  </div>
                )}
              </div>
            ))}

            <div className="ring" />
          </div>

          <div className="title-block">
            <div className="era-tag" style={{ color: era.palette.fg }}>{era.tag} · {era.year}</div>
            <div className="ticker-title" style={{ color: era.palette.fg }}>$MONEY</div>
            <div className="tagline" style={{ color: era.palette.fg }}>{era.blurb}</div>
          </div>

          {}
          <div className="actions">
            <button
              className="btn-buy"
              onClick={() => window.open(BUY_URL, "_blank")}
              style={{ background: era.palette.fg, color: era.palette.bg }}
            >
              BUY $MONEY
            </button>
            <div className="ca" style={{ color: era.palette.fg, borderColor: `${era.palette.fg}33` }}>
              <span className="ca-label">CA</span>
              <span title={CONTRACT}>{shortCa}</span>
              <CopyButton value={CONTRACT} />
            </div>
          </div>

          {}
          <div className="era-bar">
            {ERAS.map((e, i) => (
              <button
                key={e.id}
                className={"era-btn" + (i === eraIdx ? " active" : "")}
                onClick={() => setEraIdx(i)}
                style={i === eraIdx ? { "--era-fg": era.palette.fg, "--era-bg": era.palette.bg } : {}}
              >
                <div className="era-num">{e.num}</div>
                <div className="era-year">{e.year}</div>
                <div className="era-name">{e.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
