import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { villas, CATEGORIES, categoryLabel } from "@/lib/villas";
import { VillaCard } from "@/components/VillaCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/villas/")({
  validateSearch: z.object({
    category: z.string().optional(),
    sort: z.enum(["bhk-asc", "bhk-desc"]).optional(),
  }),
  head: () => ({
    meta: [
      { title: "All Villas in Goa — Malina Holidays" },
      { name: "description", content: "Browse every Malina Holidays villa in Goa, filtered by collection." },
      { property: "og:title", content: "All Villas in Goa — Malina Holidays" },
      { property: "og:description", content: "Browse every Malina Holidays villa in Goa, filtered by collection." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VillasPage,
});

function VillasPage() {
  const { category, sort } = Route.useSearch();
  const list = [...(category ? villas.filter((v) => v.categories.includes(category)) : villas)];
  if (sort === "bhk-asc") list.sort((a, b) => a.bedrooms - b.bedrooms);
  else if (sort === "bhk-desc") list.sort((a, b) => b.bedrooms - a.bedrooms);
  const chip = (active: boolean) =>
    cn("rounded-full border px-4 py-2 text-sm font-medium transition-colors", active ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-gold");

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10">
      <h1 className="text-4xl font-bold">{category ? categoryLabel(category) : "All Villas"}</h1>
      <p className="mt-2 text-muted-foreground">{list.length} villas in Goa</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link to="/villas" search={{}} className={chip(!category)}>All</Link>
        {CATEGORIES.map((c) => (
          <Link key={c.id} to="/villas" search={{ category: c.id }} className={chip(category === c.id)}>{c.label}</Link>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">Sort by BHK:</span>
        <Link to="/villas" search={{ category }} className={cn("rounded-full border px-3 py-1.5 font-medium transition-colors", !sort ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-gold")}>Default</Link>
        <Link to="/villas" search={{ category, sort: "bhk-asc" }} className={cn("rounded-full border px-3 py-1.5 font-medium transition-colors", sort === "bhk-asc" ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-gold")}>BHK: Low to High</Link>
        <Link to="/villas" search={{ category, sort: "bhk-desc" }} className={cn("rounded-full border px-3 py-1.5 font-medium transition-colors", sort === "bhk-desc" ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-gold")}>BHK: High to Low</Link>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((v) => <VillaCard key={v.slug} villa={v} />)}
      </div>
    </div>
  );
}
