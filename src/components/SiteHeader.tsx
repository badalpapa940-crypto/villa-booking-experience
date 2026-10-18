import { Link } from "@tanstack/react-router";
import { PHONE_DISPLAY, PHONE_TEL, CATEGORIES } from "@/lib/villas";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="font-serif text-2xl font-bold">
          Malina <span className="text-gold">Holidays</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-gold" }}>
            Home
          </Link>
          <Link to="/villas" activeProps={{ className: "text-gold" }}>
            Villas
          </Link>
          <a href={`tel:${PHONE_TEL}`} className="hidden sm:inline">{PHONE_DISPLAY}</a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-20 max-w-7xl rounded-t-3xl bg-primary px-8 py-12 text-primary-foreground">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <h4 className="mb-4 tracking-widest text-gold">COLLECTIONS</h4>
          <ul className="space-y-2">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to="/villas" search={{ category: c.id }}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 tracking-widest text-gold">SUPPORT</h4>
          <ul className="space-y-2">
            <li><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></li>
            <li><a href={`https://wa.me/918287840116`} target="_blank" rel="noreferrer">WhatsApp</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 tracking-widest text-gold">MALINA HOLIDAYS</h4>
          <p className="text-primary-foreground/60">Curating exceptional villa experiences across Goa.</p>
        </div>
      </div>
      <p className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/60">
        © 2026 Malina Holidays. All rights reserved.
      </p>
    </footer>
  );
}
