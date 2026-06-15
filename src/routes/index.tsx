import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import heroBride from "@/assets/hero.jpeg";
import aboutBride from "@/assets/2.jpeg";
import gallery1 from "@/assets/3.jpeg";
import gallery2 from "@/assets/4.jpeg";
import gallery3 from "@/assets/5.jpeg";
import gallery4 from "@/assets/6.jpeg";
import gallery5 from "@/assets/7.jpeg";
import gallery6 from "@/assets/8.jpeg";
import { Particles } from "@/components/site/Particles";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/")({
  component: Home,
});

const services = [
  { title: "Bridal Makeup", desc: "Signature couture bridal looks engineered to last from ceremony to send-off." },
  { title: "Hairstyling", desc: "Precision cuts, colour, hot oil massage, and restorative hair spa treatments." },
  { title: "Bridal & Non-Bridal Henna", desc: "Intricate heritage mehndi for brides, parties, and celebrations." },
  { title: "Hair Treatment", desc: "Keratin, Botox, and rebonding for silky, healthy, radiant hair." },
  { title: "Threading & Waxing", desc: "Expert eyebrow shaping and smooth, precise hair removal." },
  { title: "Facial & Hydra Facial", desc: "Deep cleansing and rejuvenating facials for a luminous complexion." },
];

const galleryPreview = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const slogans = [
  "Best Aesthetics Makeup & Hair Stylist in Toronto",
  "Where Every Bride Becomes a Masterpiece",
  "Bridal Artistry — Crafted for You",
  "Toronto's Most Trusted Bridal Beauty Studio",
  "Timeless Transformations for Your Perfect Day",
  "Pakistani · Indian · Bengali Bridal Specialists",
  "20+ Years of Bridal Excellence in Toronto",
];

function RotatingSlogan() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 text-base leading-relaxed text-ivory/80 whitespace-nowrap"
        >
          {slogans[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function Counter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  return (
    <Reveal>
      <div className="text-center md:text-left">
        <div className="font-display text-5xl text-gradient-luxe md:text-6xl">
          {value}{suffix}
        </div>
        <div className="mt-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </div>
      </div>
    </Reveal>
  );
}

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBride}
            alt="Luxury bridal portrait"
            className="h-full w-full animate-kenburns object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.18_0.005_60/0.3)_0%,oklch(0.18_0.005_60/0.55)_60%,oklch(0.18_0.005_60/0.85)_100%)]" />
        </div>
        <Particles count={22} />

        <div className="relative z-10 flex h-full items-center px-6 md:px-10">
          <div className="mx-auto max-w-7xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="glass-dark max-w-2xl rounded-sm p-10 text-ivory md:p-14"
            >
              <div className="mb-6 flex items-center gap-3">
                <Sparkles size={14} className="text-champagne" />
                <span className="text-[11px] uppercase tracking-[0.4em] text-champagne">
                  Toronto · Best Aesthetics Studio
                </span>
              </div>
              <h1 className="font-display text-5xl leading-[1.05] text-ivory md:text-7xl">
                Best Aesthetics Makeup
                <br />
                <span className="italic text-gradient-luxe">&amp; Hair Stylist</span>
                <br />
                in Toronto
              </h1>
              <div className="mt-6 max-w-lg">
                <RotatingSlogan />
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-luxe px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-luxe transition hover:shadow-glow"
                >
                  Book Appointment
                  <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 rounded-full border border-champagne/40 px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-ivory transition hover:bg-ivory/10"
                >
                  View Bridal Portfolio
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/70"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
            <div className="h-12 w-px overflow-hidden bg-ivory/20">
              <motion.div
                className="h-1/2 w-full bg-champagne"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* BRAND INTRO */}
      <section className="relative overflow-hidden bg-ivory py-28 md:py-40">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2 md:px-10">
          <Reveal>
            <div className="relative">
              <img
                src={aboutBride}
                alt="Bridal closeup"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-sm object-cover shadow-luxe"
              />
              <div className="glass absolute -bottom-8 -right-6 hidden w-64 rounded-sm p-6 md:block">
                <div className="font-display text-3xl text-gradient-luxe">800+</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Brides transformed
                </div>
              </div>
              <div className="glass absolute -left-6 -top-6 hidden w-56 rounded-sm p-5 md:block">
                <div className="flex gap-0.5 text-champagne">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="mt-2 font-display text-sm italic">
                  "An artist of rare vision."
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal><SectionLabel>The Atelier</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-5xl leading-[1.05] md:text-6xl">
                A studio devoted to the
                <span className="italic text-gradient-luxe"> art of becoming</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                MMM Studio is Moni's intimate Toronto atelier — a sanctuary where bridal
                beauty is approached as couture. Each look is composed in layers, hand-tailored
                to your features, your fabric, and your story.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="mt-8 grid gap-3 text-sm">
                {[
                  "20+ years of bridal & beauty experience",
                  "Hand-curated premium product library",
                  "Licensed hairstylist with 40+ years of expertise",
                  "Private 1:1 consultation before every booking",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="h-px w-6 bg-champagne" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* counters */}
        <div className="mx-auto mt-24 grid max-w-6xl grid-cols-2 gap-10 border-y border-border px-6 py-12 md:grid-cols-4 md:px-10">
          <Counter value={24} suffix="K+" label="Instagram family" />
          <Counter value={800} suffix="+" label="Bridal looks" />
          <Counter value={100} suffix="%" label="Recommended" />
          <Counter value={86} suffix="+" label="Five-star reviews" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-gradient-soft py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Reveal><SectionLabel>Couture Services</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-5xl leading-[1.05] md:text-6xl">
                  Every detail,
                  <br />
                  <span className="italic text-gradient-luxe">composed in light</span>.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link to="/services" className="reveal-line text-xs uppercase tracking-[0.3em]">
                Discover all services →
              </Link>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="hover-lift group relative overflow-hidden rounded-sm border border-border bg-card p-8">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-luxe opacity-0 transition group-hover:opacity-100" />
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-champagne/60 text-champagne">
                    <Sparkles size={16} />
                  </div>
                  <h3 className="font-display text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="mt-6 text-[11px] uppercase tracking-[0.3em] text-rose-gold">
                    Inquire →
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="bg-ivory py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal><SectionLabel>Selected Work</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl leading-[1.05] md:text-6xl">
              Brides, captured in
              <span className="italic text-gradient-luxe"> ceremony</span>.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryPreview.map((src, i) => (
              <Reveal key={i} delay={(i % 4) * 0.06}>
                <div className={`group relative overflow-hidden rounded-sm ${i === 0 || i === 3 ? "row-span-2 aspect-[3/5]" : "aspect-[3/4]"}`}>
                  <img
                    src={src}
                    alt={`Bridal look ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  {/* Watermark */}
                  <span className="pointer-events-none absolute bottom-2 right-3 font-display text-[11px] italic tracking-widest text-white/50 select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    MMM Studio
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-gradient-luxe hover:text-primary-foreground"
            >
              Enter the gallery
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL CTA */}
      <section className="relative overflow-hidden bg-[oklch(0.16_0.005_60)] py-28 text-ivory md:py-40">
        <div className="absolute inset-0 opacity-30">
          <img src={gallery2} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-noir/70" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
          <Reveal>
            <div className="mb-6 flex justify-center gap-1 text-champagne">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-3xl italic leading-relaxed md:text-5xl">
              "Moni made me feel like the most beautiful version of myself.
              The artistry, the calm, the elegance — flawless from start to finish."
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 text-[11px] uppercase tracking-[0.3em] text-champagne">
              — Priya S., Toronto Bride 2024
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              to="/booking"
              className="mt-12 inline-flex items-center gap-2 rounded-full bg-gradient-luxe px-10 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-luxe"
            >
              Reserve Your Date
              <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
