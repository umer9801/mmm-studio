import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Crown } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/packages")({
  component: Packages,
});

const packages = [
  {
    name: "Silver",
    price: "$650",
    blurb: "An elegant essential.",
    features: ["Bridal Makeup", "Bridal Hair Styling", "Dupatta Setting", "Lash Application", "On-day Touch-up Kit"],
  },
  {
    name: "Gold",
    price: "$950",
    blurb: "Our most requested.",
    features: ["Everything in Silver", "Skin Prep Ritual (60 min)", "Jewelry Setting", "1 Trial Session", "Reception Touch-up"],
    featured: true,
  },
  {
    name: "Platinum",
    price: "$1,450",
    blurb: "Editorial-grade luxury.",
    features: ["Everything in Gold", "HD Airbrush Finish", "Saree / Lehenga Draping", "2 Trial Sessions", "Henna Consultation"],
  },
  {
    name: "Royal Luxury",
    price: "$2,200",
    blurb: "A complete couture experience.",
    features: ["Everything in Platinum", "Full Bridal Henna", "Engagement + Reception Looks", "Family Members Glam (×3)", "Dedicated 2-Artist Team"],
  },
];

function Packages() {
  return (
    <>
      <section className="pt-40 pb-12 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal><SectionLabel>Investment</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl leading-[1.02] md:text-8xl">
              Bridal packages,
              <span className="italic text-gradient-luxe"> curated with intent</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-muted-foreground">
              Each package is a starting point — every booking is tailored after your consultation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20 pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-6 lg:grid-cols-4">
            {packages.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <div
                  className={`relative flex h-full flex-col rounded-sm p-8 transition ${
                    p.featured
                      ? "border-2 border-champagne bg-card shadow-luxe scale-[1.02]"
                      : "border border-border bg-card hover-lift"
                  }`}
                >
                  {p.featured && (
                    <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-luxe px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-primary-foreground">
                      <Crown size={11} /> Most Loved
                    </div>
                  )}
                  <div className="text-[11px] uppercase tracking-[0.3em] text-rose-gold">{p.name}</div>
                  <div className="mt-4 font-display text-5xl text-gradient-luxe">{p.price}</div>
                  <p className="mt-2 text-sm italic text-muted-foreground">{p.blurb}</p>
                  <div className="my-6 gold-divider" />
                  <ul className="space-y-3 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check size={14} className="mt-1 shrink-0 text-rose-gold" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/booking"
                    className={`mt-8 inline-flex justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.2em] transition ${
                      p.featured
                        ? "bg-gradient-luxe text-primary-foreground shadow-glow"
                        : "border border-border hover:bg-gradient-luxe hover:text-primary-foreground"
                    }`}
                  >
                    Book {p.name}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-12 text-center text-sm text-muted-foreground">
              Travel and destination weddings available worldwide. Bespoke proposals on request.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
