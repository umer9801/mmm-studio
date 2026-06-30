import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Crown } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/packages")({
  component: Packages,
});

const packages = [
  {
    name: "Trial / Semi-Bridal",
    tag: "Makeup Only",
    price: "$199",
    blurb: "Full or soft glam — perfect for trials and semi-bridal events.",
    features: [
      "Full / Soft Glam Makeup",
      "Hairstyling",
      "Premium Lashes",
      "Saree / Dupatta Setting",
      "Jewellery Setting",
      "Hair Pins",
    ],
    variants: [
      { label: "Hair Only", price: "$149" },
      { label: "Makeup & Hair", price: "$299" },
    ],
  },
  {
    name: "Bridal Party",
    tag: "Bridesmaid & Family",
    price: "$149",
    blurb: "Makeup only — hair and combo options available.",
    features: [
      "Full / Soft Glam Makeup",
      "Premium Lashes",
      "Professional Finish",
    ],
    variants: [
      { label: "Hair Only", price: "$99" },
      { label: "Makeup & Hair", price: "$225" },
    ],
    featured: true,
  },
  {
    name: "Regular Party",
    tag: "Everyday Events & Celebrations",
    price: "$125",
    blurb: "Regular finish makeup for everyday events and celebrations.",
    features: [
      "Regular Finish Makeup",
      "Regular Lashes",
    ],
    variants: [
      { label: "Hairstyling", price: "From $50" },
    ],
    note: "Hairstyle price depends on hair style, length & extensions. Regular updos, simple hairdo, curls, volume, hair clips/pins.",
  },
  {
    name: "Special Event Combo",
    tag: "E-shoot · Engagement · Baby Shower · Family Wedding",
    price: "$350",
    blurb: "For e-shoots, engagements, baby showers, sister/brother or daughter/son weddings.",
    features: [
      "Full / Soft Glam Makeup",
      "Hairstyling",
      "Premium Lashes",
      "Saree / Dupatta Setting",
      "Jewellery Setting",
      "Hair Clips / Pins",
    ],
  },
];

function Packages() {
  return (
    <>
      <section className="pt-40 pb-12 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal><SectionLabel>Pricing</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl leading-[1.02] md:text-8xl">
              Packages
              <span className="italic text-gradient-luxe"> curated with intent</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-muted-foreground">
              Every booking is tailored after your consultation. Prices below are starting points.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20 pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">

          {/* Main packages */}
          <div className="grid gap-6 lg:grid-cols-4">
            {packages.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <div className={`relative flex h-full flex-col rounded-sm p-8 transition ${
                  p.featured
                    ? "border-2 border-champagne bg-card shadow-luxe scale-[1.02]"
                    : "border border-border bg-card hover-lift"
                }`}>
                  {p.featured && (
                    <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-luxe px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-primary-foreground">
                      <Crown size={11} /> Most Requested
                    </div>
                  )}
                  <div className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">{p.tag}</div>
                  <h3 className="mt-2 font-display text-2xl">{p.name}</h3>
                  <div className="mt-3 font-display text-4xl text-gradient-luxe">{p.price}</div>
                  <p className="mt-2 text-sm italic text-muted-foreground">{p.blurb}</p>
                  <div className="my-5 gold-divider" />
                  <ul className="space-y-2.5 text-sm flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check size={13} className="mt-0.5 shrink-0 text-rose-gold" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {p.variants && p.variants.length > 0 && (
                    <div className="mt-5 space-y-1.5">
                      {p.variants.map((v) => (
                        <div key={v.label} className="flex justify-between text-xs text-muted-foreground border-t border-border/60 pt-1.5">
                          <span>{v.label}</span>
                          <span className="font-display text-foreground">{v.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {p.note && (
                    <p className="mt-3 text-[11px] text-champagne italic">✓ {p.note}</p>
                  )}
                  <Link
                    to="/booking"
                    className={`mt-6 inline-flex justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.2em] transition ${
                      p.featured
                        ? "bg-gradient-luxe text-primary-foreground shadow-glow"
                        : "border border-border hover:bg-gradient-luxe hover:text-primary-foreground"
                    }`}
                  >
                    Book Now
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Add-ons */}
          <Reveal>
            <div className="mt-12 rounded-sm border border-border bg-card p-8">
              <div className="text-[10px] uppercase tracking-[0.3em] text-rose-gold mb-2">Add-Ons</div>
              <h3 className="font-display text-2xl mb-6">À La Carte</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Saree Draping", price: "$25" },
                  { label: "Dupatta Setting", price: "$25" },
                  { label: "Jewellery Setting", price: "$25" },
                  { label: "Hair Extension Installation", price: "$45" },
                  { label: "Eyelashes Application", price: "$25" },
                ].map((a) => (
                  <div key={a.label} className="flex items-center justify-between border-b border-border/60 py-3 text-sm">
                    <span className="flex items-center gap-2">
                      <Check size={13} className="text-rose-gold shrink-0" />{a.label}
                    </span>
                    <span className="font-display text-rose-gold ml-4">{a.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-10 text-center text-sm text-muted-foreground">
              Travel and destination weddings available worldwide. Bespoke proposals on request.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
