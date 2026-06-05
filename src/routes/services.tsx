import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/services")({
  component: Services,
});

const services = [
  { t: "Bridal Makeup", d: "Couture bridal artistry engineered for ceremony, photography, and twelve hours of flawless grace.", price: "From $450" },
  { t: "Hairstyling", d: "Precision cuts, rich colour, nourishing hot oil massage, and restorative hair spa treatments.", price: "From $120" },
  { t: "Bridal & Non-Bridal Henna", d: "Intricate heritage mehndi for brides, parties, and celebrations — from delicate to statement designs.", price: "From $150" },
  { t: "Hair Treatment", d: "Transformative keratin, Botox, and rebonding treatments for silky, healthy, radiant hair.", price: "From $200" },
  { t: "Eyebrow Threading & Waxing", d: "Expert shaping and smooth, precise hair removal for a polished, defined finish.", price: "From $15" },
  { t: "Facial & Hydra Facial", d: "Deep cleansing, hydrating, and rejuvenating facials for a luminous, camera-ready complexion.", price: "From $120" },
];

function Services() {
  return (
    <>
      <section className="pt-40 pb-16 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal><SectionLabel>Couture Menu</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl leading-[1.02] md:text-8xl">
              Services tailored to
              <span className="italic text-gradient-luxe"> the woman, not the trend</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-28 pt-12">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.t} delay={(i % 2) * 0.08}>
                <div className="hover-lift group relative overflow-hidden rounded-sm border border-border bg-card p-8 md:p-10">
                  <div className="absolute right-0 top-0 h-24 w-24 -translate-y-12 translate-x-12 rounded-full bg-gradient-luxe opacity-0 blur-3xl transition group-hover:opacity-40" />
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-champagne/60 text-champagne">
                        <Sparkles size={15} />
                      </div>
                      <h3 className="font-display text-3xl">{s.t}</h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Investment</div>
                      <div className="mt-1 font-display text-xl text-gradient-luxe">{s.price}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 rounded-sm border border-border bg-card p-10 text-center md:p-16">
              <h2 className="font-display text-4xl">Ready to design your bridal look?</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Begin with a private consultation. We'll craft a custom proposal aligned to your day.
              </p>
              <Link to="/booking" className="mt-8 inline-flex rounded-full bg-gradient-luxe px-10 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-luxe">
                Book Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
