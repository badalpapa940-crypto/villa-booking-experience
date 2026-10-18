import { Link } from "@tanstack/react-router";
import { MapPin, Star } from "lucide-react";
import { type Villa, categoryLabel, formatINR } from "@/lib/villas";

export function VillaCard({ villa }: { villa: Villa }) {
  return (
    <Link to="/villas/$slug" params={{ slug: villa.slug }} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
        <img
          src={villa.images[0]}
          alt={villa.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {villa.categories[0] && (
          <span className="absolute left-3 top-3 rounded-md bg-gold/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
            {categoryLabel(villa.categories[0])}
          </span>
        )}
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-primary/70 px-2 py-1 text-xs font-semibold text-primary-foreground">
          <Star className="h-3 w-3 fill-current" /> {villa.rating}
        </span>
      </div>
      <p className="mt-3 flex items-center gap-1 text-sm text-gold">
        <MapPin className="h-3.5 w-3.5" /> {villa.location}, Goa
      </p>
      <h3 className="mt-1 text-lg font-semibold">{villa.name}</h3>
      <p className="text-sm text-muted-foreground">
        {villa.bedrooms} BR · Upto {villa.guests} Guests
      </p>
      <p className="mt-2 text-lg font-bold">
        {formatINR(villa.price)} <span className="text-sm font-normal text-muted-foreground">/night</span>
      </p>
    </Link>
  );
}
