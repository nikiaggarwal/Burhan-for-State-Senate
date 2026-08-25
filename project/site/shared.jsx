// ============================================================
// Burhan for Senate — shared chrome + primitives
// Loaded on every page. Exports to window.
// ============================================================
const { useState, useEffect, useRef } = React;

const ACTBLUE = "https://secure.actblue.com/donate/burhanwebsite";
const trackDonate = () => {
  const page = window.location.pathname.split('/').pop().replace('.html', '') || 'home';
  window.plausible && window.plausible('Donate Click', { props: { page } });
};

// ---- icons ----
function ArrowIcon({ color = "#fff", className = "ar" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill={color} aria-hidden="true">
      <path d="M 12.175 9 L 0 9 L 0 7 L 12.175 7 L 6.575 1.4 L 8 0 L 16 8 L 8 16 L 6.575 14.6 L 12.175 9 Z" />
    </svg>
  );
}
function PlayIcon({ color = "#003DA5" }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} aria-hidden="true"><path d="M5 3.5v17l15-8.5z" /></svg>
  );
}
function ChevronIcon({ color = "currentColor", className = "chev" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="2.4" aria-hidden="true">
      <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ---- social icons ----
const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/cllr.burhan.azeem", Icon: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" /></svg>
  ) },
  { label: "X", href: "https://x.com/realBurhanAzeem", Icon: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  ) },
  { label: "Bluesky", href: "https://bsky.app/profile/burhanazeem.bsky.social", Icon: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.81 9.498 7.823 4.308 4.267-4.308 1.172-6.498-2.74-7.078 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.479 0-.688-.139-1.861-.902-2.203-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" /></svg>
  ) },
  { label: "YouTube", href: "https://www.youtube.com/@BurhanAzeemMA", Icon: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M23 12s0-3.4-.4-5a3 3 0 0 0-2.1-2.1C18.9 4.4 12 4.4 12 4.4s-6.9 0-8.5.5A3 3 0 0 0 1.4 7 31 31 0 0 0 1 12s0 3.4.4 5A3 3 0 0 0 3.5 19c1.6.5 8.5.5 8.5.5s6.9 0 8.5-.5a3 3 0 0 0 2.1-2.1c.4-1.6.4-5 .4-5ZM9.8 15.5v-7l6 3.5Z" /></svg>
  ) },
  { label: "TikTok", href: "https://www.tiktok.com/@vicemayor_azeem", Icon: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M16.5 2h-3.2v13.6a3 3 0 1 1-2.6-3v-3.3a6.3 6.3 0 1 0 5.8 6.3V8.8a7.6 7.6 0 0 0 4.5 1.5V7a4.4 4.4 0 0 1-4.5-4.4V2Z" /></svg>
  ) },
];
function SocialLinks({ className = "fsocial" }) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

// ---- button ----
function Button({ variant = "orange", children, arrow, arrowColor, href, target, style, className = "", ...rest }) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowIcon color={arrowColor || (variant === "orange" ? "#003DA5" : "#fff")} />}
    </>
  );
  if (href) {
    return <a className={cls} href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} style={style} {...rest}>{inner}</a>;
  }
  return <button className={cls} style={style} {...rest}>{inner}</button>;
}

// ---- boxed section header ----
function BoxedHeader({ eyebrow, children, eyebrowClass = "", onOrange, style }) {
  return (
    <div className="col" style={{ gap: 8, alignItems: "flex-start", ...style }}>
      {eyebrow && <span className={`eyebrow ${eyebrowClass}`}>{eyebrow}</span>}
      <span className={`boxed${onOrange ? " on-orange" : ""}`}>{children}</span>
    </div>
  );
}

// ---- logo ----
function Logo() {
  return (
    <a className="logo" href="/">
      <span className="word">BURHAN</span>
      <span className="tag">2ND MIDDLESEX · STATE SENATE</span>
    </a>
  );
}

// ---- site header ----
function SiteHeader({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const hdrRef = useRef(null);
  const links = [
    { label: "Meet Burhan", href: "/receipts" },
    { label: "Vision", href: "/issues" },
    { label: "City Issues", href: "/cities" },
    { label: "Endorsements", href: "/endorsements" },
    { label: "Volunteer", href: "/volunteer" },
  ];

  useEffect(() => {
    function handleClick(e) {
      if (hdrRef.current && !hdrRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <header className={"hdr" + (menuOpen ? " menu-open" : "")} ref={hdrRef}>
        <Logo />
        <nav>
          <div className="navlinks">
            {links.map((l) => (
              <a key={l.label} href={l.href} className={active === l.label ? "active" : ""}>{l.label}</a>
            ))}
          </div>
          <Button variant="orange" href={ACTBLUE} target="_blank" style={{ fontSize: 17, padding: "9px 18px" }} onClick={trackDonate}>Donate</Button>
          <button
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </nav>
      </header>
      <div className={"mobile-menu" + (menuOpen ? " open" : "")} id="mobile-menu" role="dialog" aria-label="Navigation menu">
        {links.map((l) => (
          <a key={l.label} href={l.href} className={active === l.label ? "active" : ""}>{l.label}</a>
        ))}
        <a className="btn btn-orange" href={ACTBLUE} target="_blank" rel="noopener noreferrer" onClick={trackDonate}>Donate</a>
      </div>
    </>
  );
}

// ---- site footer (MORE IS POSSIBLE rallying band + copyright) ----
function SiteFooter({ headline = "More is possible", sub }) {
  return (
    <>
      <section className="fcta motif-bg">
        <Reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <h2>{headline}</h2>
          {sub && <p>{sub}</p>}
          <div className="fbtns">
            <Button variant="orange" href="/volunteer" arrow arrowColor="#003DA5">Volunteer</Button>
            <Button variant="red" href={ACTBLUE} target="_blank" arrow arrowColor="#fff" onClick={trackDonate}>Donate</Button>
          </div>
        </Reveal>
      </section>
      <div className="fcopy">
        <span>© 2026 Committee to Elect Burhan Azeem</span>
        <SocialLinks />
        <a href="/contact">Contact Us</a>
      </div>
    </>
  );
}

// ---- branded video thumbnail placeholder ----
function VideoThumb({ label = "Watch", className = "", style, children }) {
  return (
    <div className={`vthumb ${className}`} style={style}>
      {children}
      <span className="play"><PlayIcon color="#003DA5" /></span>
      {label && <span className="vlabel">{label}</span>}
    </div>
  );
}

// ---- reveal-on-scroll ----
function Reveal({ children, as = "div", className = "", style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < (window.innerHeight || 800) * 0.94) { setShown(true); return; }
    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.1 });
      io.observe(el);
    }
    const t = setTimeout(() => setShown(true), 1400);
    return () => { io && io.disconnect(); clearTimeout(t); };
  }, []);
  const Tag = as;
  return <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={style}>{children}</Tag>;
}

Object.assign(window, { ACTBLUE, trackDonate, ArrowIcon, PlayIcon, ChevronIcon, SocialLinks, Button, BoxedHeader, Logo, SiteHeader, SiteFooter, VideoThumb, Reveal });
