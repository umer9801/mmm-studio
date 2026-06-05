import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/testimonials")({
  component: Testimonials,
});

const reviews = [
  { n: "Priya S.", r: "Bridal · 2024", q: "Moni made me feel like the most beautiful version of myself. The artistry, the calm, the elegance — flawless from start to finish." },
  { n: "Anika R.", r: "Reception · 2024", q: "Every detail was considered. My makeup lasted twelve hours of dancing and still looked editorial in every photo." },
  { n: "Saira K.", r: "Engagement · 2023", q: "She listens. She studies your face. She doesn't impose a trend — she designs your story. Worth every dollar." },
  { n: "Maya P.", r: "Bridal · 2024", q: "I've worked with artists across three cities. Moni is, simply, the best. Cinematic, warm, masterful." },
  { n: "Rhea T.", r: "Bridal · 2023", q: "My henna, my makeup, my hair — all under one roof and all incredible. The atelier itself feels like a luxury suite." },
  { n: "Zara M.", r: "Reception · 2024", q: "I cried when I saw myself. That's the moment every bride deserves." },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const cur = reviews[i];

  return (
    <>
      <section className="pt-40 pb-12 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal><SectionLabel>Brides Speak</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl leading-[1.02] md:text-8xl">
              Words from the
              <span className="italic text-gradient-luxe"> mirror</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3 md:px-10">
          {[
            { v: "100%", l: "Recommended" },
            { v: "86+", l: "5-Star reviews" },
            { v: "5.0", l: "Average rating" },
          ].map((s) => (
            <Reveal key={s.l}>
              <div className="rounded-sm border border-border bg-card p-10 text-center">
                <div className="font-display text-5xl text-gradient-luxe">{s.v}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-gradient-soft py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <Reveal>
            <div className="glass relative rounded-sm p-10 md:p-16">
              <div className="mb-6 flex gap-1 text-champagne">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} fill="currentColor" />)}
              </div>
              <p className="font-display text-2xl italic leading-relaxed md:text-3xl">"{cur.q}"</p>
              <div className="mt-8 text-[11px] uppercase tracking-[0.3em] text-rose-gold">
                {cur.n} · <span className="text-muted-foreground">{cur.r}</span>
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setI((i - 1 + reviews.length) % reviews.length)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-gradient-luxe hover:text-primary-foreground"
                  aria-label="Previous"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-2">
                  {reviews.map((_, k) => (
                    <button
                      key={k}
                      onClick={() => setI(k)}
                      className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-gradient-luxe" : "w-1.5 bg-border"}`}
                      aria-label={`Go to ${k + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setI((i + 1) % reviews.length)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-gradient-luxe hover:text-primary-foreground"
                  aria-label="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-28 pt-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3 md:px-10">
          {reviews.map((r, k) => (
            <Reveal key={k} delay={(k % 3) * 0.06}>
              <div className="hover-lift rounded-sm border border-border bg-card p-7">
                <div className="mb-3 flex gap-0.5 text-champagne">
                  {Array.from({ length: 5 }).map((_, n) => <Star key={n} size={12} fill="currentColor" />)}
                </div>
                <p className="font-display italic text-foreground/80">"{r.q}"</p>
                <div className="mt-6 text-[10px] uppercase tracking-[0.3em] text-rose-gold">
                  {r.n} · <span className="text-muted-foreground">{r.r}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
