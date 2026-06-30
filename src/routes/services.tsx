import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/services")({
  component: Services,
});

const bridal = [
  { label: "Soft Glam Bridal Makeup" },
  { label: "Full Glam Bridal Makeup" },
  { label: "Natural Bridal Makeup" },
  { label: "Traditional Bridal Makeup" },
  { label: "Bridal Hairstyling" },
  { label: "Makeup & Hair Combo" },
];

const henna = [
  { label: "Bridal Henna (Full)" },
  { label: "Non-Bridal / Party Henna" },
  { label: "Custom Heritage Designs" },
];

const aesthetics = [
  { label: "Eyebrow Threading & Shaping" },
  { label: "Facial" },
  { label: "Hydra Facial" },
  { label: "Waxing" },
];

const hair = [
  { label: "Hair Cut" },
  { label: "Hair Colour" },
  { label: "Hot Oil Massage" },
  { label: "Hair Spa" },
  { label: "Keratin Treatment" },
  { label: "Botox Treatment" },
  { label: "Nano-Plastia Treatment" },
];

const styling = [
  { label: "Flat Iron (no blowout) — from $30" },
  { label: "Blowout with Curls — $75" },
  { label: "Curls Only — $50" },
  { label: "Curls Set — $75" },
  { label: "Curls Set with Front Setting — from $99" },
  { label: "Regular Updo / Simple Hairdo — from $50" },
  { label: "Hair Extension Installation — $45" },
];

const addons = [
  { label: "Saree Draping", price: "$25" },
  { label: "Dupatta Setting", price: "$25" },
  { label: "Jewellery Setting", price: "$25" },
  { label: "Hair Extension Installation", price: "$45" },
  { label: "Eyelashes Application", price: "$25" },
  { label: "Wedding Day Touch-up", price: "$75/hr" },
];

const earlyMorning = [
  { time: "6:00 – 7:00 am", charge: "+ $50" },
  { time: "5:00 – 6:00 am", charge: "+ $75" },
  { time: "4:00 – 5:00 am", charge: "+ $100" },
  { time: "Before 4:00 am", charge: "+ $150" },
];

const waiting = [
  { time: "First 15 min", charge: "Included" },
  { time: "15 – 30 min", charge: "+ $50" },
  { time: "30 – 60 min", charge: "+ $100" },
];

function ServiceBlock({ title, items }: { title: string; items: { label: string }[] }) {
  return (
    <Reveal>
      <div className="hover-lift group relative overflow-hidden rounded-sm border border-border bg-card p-8">
        <div className="absolute right-0 top-0 h-24 w-24 -translate-y-12 translate-x-12 rounded-full bg-gradient-luxe opacity-0 blur-3xl transition group-hover:opacity-40" />
        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-champagne/60 text-champagne">
          <Sparkles size={15} />
        </div>
        <h3 className="font-display text-2xl mb-4">{title}</h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.label} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check size={13} className="mt-0.5 shrink-0 text-rose-gold" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function Services() {
  return (
    <>
      <section className="pt-40 pb-16 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal><SectionLabel>Our Services</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl leading-[1.02] md:text-8xl">
              Services tailored to
              <span className="italic text-gradient-luxe"> the woman, not the trend</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-muted-foreground">
              Kotha Moni and her team bring decades of experience to every look — from soft glam bridal to full hair treatments and aesthetics.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-28 pt-12">
        <div className="mx-auto max-w-7xl px-6 md:px-10 space-y-16">

          {/* Bridal Services */}
          <div>
            <Reveal><SectionLabel>Bridal Services</SectionLabel></Reveal>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ServiceBlock title="Bridal Makeup" items={bridal.slice(0, 4)} />
              <ServiceBlock title="Bridal Hair & Combos" items={bridal.slice(4)} />
              <ServiceBlock title="Henna Services" items={henna} />
            </div>
          </div>

          {/* Aesthetics & Hair */}
          <div>
            <Reveal><SectionLabel>Aesthetics &amp; Hair</SectionLabel></Reveal>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ServiceBlock title="Aesthetics" items={aesthetics} />
              <ServiceBlock title="Hair Treatments" items={hair} />
              <ServiceBlock title="Hairstyling" items={styling} />
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <Reveal><SectionLabel>Add-Ons</SectionLabel></Reveal>
            <Reveal>
              <div className="mt-6 rounded-sm border border-border bg-card p-8">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {addons.map((a) => (
                    <div key={a.label} className="flex items-center justify-between border-b border-border/60 py-3 text-sm">
                      <span className="flex items-center gap-2 text-foreground">
                        <Check size={13} className="text-rose-gold shrink-0" />{a.label}
                      </span>
                      <span className="font-display text-rose-gold ml-4">{a.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Surcharges */}
          <div>
            <Reveal><SectionLabel>Surcharges</SectionLabel></Reveal>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Reveal>
                <div className="rounded-sm border border-border bg-card p-8">
                  <h3 className="font-display text-2xl mb-2">Early Morning Surcharge</h3>
                  <p className="text-sm text-muted-foreground mb-6">Applied when makeup start time is before 7:00 am.</p>
                  <div className="space-y-3">
                    {earlyMorning.map((e) => (
                      <div key={e.time} className="flex justify-between border-b border-border/60 py-2 text-sm">
                        <span className="text-foreground">{e.time}</span>
                        <span className="font-display text-rose-gold">{e.charge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-sm border border-border bg-card p-8">
                  <h3 className="font-display text-2xl mb-2">Waiting Charge</h3>
                  <p className="text-sm text-muted-foreground mb-6">15 minutes is included in every package.</p>
                  <div className="space-y-3">
                    {waiting.map((w) => (
                      <div key={w.time} className="flex justify-between border-b border-border/60 py-2 text-sm">
                        <span className="text-foreground">{w.time}</span>
                        <span className="font-display text-rose-gold">{w.charge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* CTA */}
          <Reveal>
            <div className="rounded-sm border border-border bg-card p-10 text-center md:p-16">
              <h2 className="font-display text-4xl">Ready to book your look?</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Begin with a consultation. We'll craft a custom proposal for your day.
              </p>
              <Link to="/booking" className="mt-8 inline-flex rounded-full bg-gradient-luxe px-10 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-luxe">
                Book Now
              </Link>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}
