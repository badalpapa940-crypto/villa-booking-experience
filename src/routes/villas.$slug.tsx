import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Bath, BedDouble, ChevronLeft, ChevronRight, MapPin, MessageCircle, Phone, Star, Users, Check } from "lucide-react";
import { villas, categoryLabel, formatINR, PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from "@/lib/villas";
import { BookingForm } from "@/components/BookingForm";

export const Route = createFileRoute("/villas/$slug")({
  loader: ({ params }) => {
    const villa = villas.find((v) => v.slug === params.slug);
    if (!villa) throw notFound();
    return { villa };
  },
  head: ({ loaderData }) => {
    const v = loaderData?.villa;
    if (!v) return { meta: [{ title: "Villa not found — Malina Holidays" }, { name: "robots", content: "noindex" }] };
    const desc = `${v.bedrooms} bedroom villa in ${v.location}, Goa for up to ${v.guests} guests. From ${formatINR(v.price)}/night.`;
    return {
      meta: [
        { title: `${v.name} — Malina Holidays` },
        { name: "description", content: desc },
        { property: "og:title", content: `${v.name} — Malina Holidays` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image", content: v.images[0] },
        { name: "twitter:image", content: v.images[0] },
      ],
    };
  },
  component: VillaPage,
});

function VillaPage() {
  const { villa: v } = Route.useLoaderData();
  const [i, setI] = useState(0);
  const n = v.images.length;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <Link to="/villas" className="inline-flex items-center gap-2 font-medium"><ArrowLeft className="h-4 w-4" /> Back to villas</Link>

      <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-3xl bg-muted">
        <img src={v.images[i]} alt={v.name} className="h-full w-full object-cover" />
        <span className="absolute right-4 top-4 rounded-full bg-primary/70 px-3 py-1 text-sm font-semibold text-primary-foreground">{i + 1} / {n}</span>
        <button aria-label="Previous photo" onClick={() => setI((i - 1 + n) % n)} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-card p-3"><ChevronLeft /></button>
        <button aria-label="Next photo" onClick={() => setI((i + 1) % n)} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-card p-3"><ChevronRight /></button>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
        {v.images.map((src, idx) => (
          <button key={src} onClick={() => setI(idx)} className={`h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 ${idx === i ? "border-gold" : "border-transparent"}`}>
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {v.categories.map((c) => (
          <Link key={c} to="/villas" search={{ category: c }} className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase text-primary-foreground">{categoryLabel(c)}</Link>
        ))}
      </div>
      <h1 className="mt-4 text-4xl font-bold md:text-5xl">{v.name}</h1>
      <p className="mt-2 flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4 text-gold" /> {v.location}, Goa</p>
      <p className="mt-2 flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-gold text-gold" /> <b>{v.rating}</b></p>

      <div className="mt-6 flex flex-wrap gap-8 rounded-3xl bg-muted p-6">
        <Stat icon={<Users />} value={`Upto ${v.guests}`} label="Guests" />
        <Stat icon={<BedDouble />} value={v.bedrooms} label="Bedrooms" />
        <Stat icon={<Bath />} value={v.bedrooms} label="Bathrooms" />
      </div>

      <section className="mt-10 border-t pt-10">
        <h2 className="text-2xl font-bold">About the Villa</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {v.name} is a beautiful {v.bedrooms}-bedroom home in {v.location}, Goa, welcoming up to {v.guests} guests. Thoughtfully designed interiors, modern amenities and attentive service make it perfect for families and small groups looking for a relaxed luxury stay.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {["WiFi", "Daily housekeeping", "Inverter back-up", "24hrs security"].map((a) => (
            <p key={a} className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> {a}</p>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl bg-primary p-10 text-center text-primary-foreground">
        <p className="text-sm font-semibold tracking-widest">STARTING FROM</p>
        <p className="mt-2 font-serif text-5xl font-bold">{formatINR(v.price)}</p>
        <p className="mt-2 text-sm">per night, excluding taxes</p>
      </section>

      <section className="mt-8">
        <BookingForm villa={v.name} maxGuests={v.guests} />
      </section>

      <section className="mt-8 rounded-3xl border p-10 text-center">
        <h2 className="text-3xl font-bold">Contact Malina Holidays</h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">Interested in booking {v.name}? Our travel advisors are on hand to craft your perfect escape.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"><Phone className="h-4 w-4" /> {PHONE_DISPLAY}</a>
          <a href={whatsappUrl(`Hi, I'm interested in ${v.name}.`)} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-whatsapp px-6 py-3 font-semibold text-whatsapp-foreground"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gold">{icon}</span>
      <div><p className="font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>
    </div>
  );
}
