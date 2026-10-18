import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { villas, CATEGORIES } from "@/lib/villas";
import { VillaCard } from "@/components/VillaCard";

const slides = [
  { tag: "PRIVATE POOL", accent: "Escape", title: "Private Pool Villas", sub: "Wake up to your own pool in North Goa's greenest hideaways.", category: "private-pool", img: villas[3].images[0] },
  { tag: "WELLNESS & YOGA", accent: "Restore", title: "Wellness Retreats", sub: "Yoga, serene gardens and slow mornings for body and soul.", category: "wellness", img: villas[13].images[0] },
  { tag: "GRAND STAYS", accent: "Indulge", title: "Luxury Villas", sub: "Spacious 4 and 5 bedroom homes for families and friends.", category: "luxury", img: villas[24].images[0] },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Malina Holidays — Luxury Villas in Goa" },
      { name: "description", content: "Handpicked private pool, luxury and pet-friendly villas across Goa. Book directly on WhatsApp." },
      { property: "og:title", content: "Malina Holidays — Luxury Villas in Goa" },
      { property: "og:description", content: "Handpicked private pool, luxury and pet-friendly villas across Goa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];
  const trending = villas.filter((v) => v.rating >= 4.9).slice(0, 8);

  return (
    <div className="mx-auto max-w-7xl px-4">
      <section className="relative mt-4 h-[70vh] min-h-[480px] overflow-hidden rounded-3xl">
        <img src={s.img} alt={s.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-primary/80 via-primary/30 to-transparent" />
        <div className="relative flex h-full flex-col items-end justify-center px-8 text-right text-primary-foreground md:px-16">
          <span className="rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em]">{s.tag}</span>
          <p className="mt-4 font-serif text-6xl italic text-gold">{s.accent}</p>
          <h1 className="text-4xl font-bold md:text-6xl">{s.title}</h1>
          <p className="mt-4 max-w-md italic">{s.sub}</p>
          <Link
            to="/villas"
            search={{ category: s.category }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 font-semibold text-primary"
          >
            Explore Villas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <button aria-label="Previous" onClick={() => setI((i - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-primary/40 p-3 text-primary-foreground"><ChevronLeft /></button>
        <button aria-label="Next" onClick={() => setI((i + 1) % slides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-primary/40 p-3 text-primary-foreground"><ChevronRight /></button>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">Browse by Collection</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {CATEGORIES.map((c) => {
            const list = villas.filter((v) => v.categories.includes(c.id));
            return (
              <Link key={c.id} to="/villas" search={{ category: c.id }} className="group relative aspect-[16/10] overflow-hidden rounded-2xl">
                <img src={list[0]?.images[1] ?? list[0]?.images[0]} alt={c.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-primary-foreground">
                  <h3 className="text-xl font-bold">{c.label}</h3>
                  <p className="text-sm opacity-80">{list.length} villas</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Trending This Season</h2>
            <p className="text-muted-foreground">Most booked luxury villas in Goa right now</p>
          </div>
          <Link to="/villas" className="flex items-center gap-1 font-medium underline-offset-4 hover:underline">View All <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((v) => <VillaCard key={v.slug} villa={v} />)}
        </div>
      </section>
    </div>
  );
}
