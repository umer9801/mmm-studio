import { createFileRoute } from "@tanstack/react-router";
import founder from "@/assets/1.jpeg";
import aboutBride from "@/assets/2.jpeg";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/about")({
  component: About,
});

const timeline = [
  { y: "2005", t: "Journey begins", d: "Moni begins her career in bridal beauty, training across South Asia and the Middle East." },
  { y: "2014", t: "Toronto arrival", d: "Moni brings her artistry to Canada, building a reputation in the Toronto bridal scene." },
  { y: "2018", t: "MMM Studio founded", d: "A private atelier opens, offering intimate, premium bridal experiences." },
  { y: "2024", t: "800+ brides served", d: "Crosses 800 bridal transformations with a team of elite licensed professionals." },
];

function About() {
  return (
    <>
      <section className="relative pt-40 pb-20 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal><SectionLabel>The Artist</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl leading-[1.02] md:text-8xl">
              I create beauty that
              <br /><span className="italic text-gradient-luxe">remembers you</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-[1fr_1.2fr] md:px-10">
          <Reveal>
            <img src={founder} alt="Moni" loading="lazy" className="aspect-[3/4] w-full rounded-sm object-cover shadow-luxe" />
          </Reveal>
          <div className="flex flex-col justify-center">
            <Reveal delay={0.1}>
              <p className="font-display text-2xl italic leading-relaxed text-foreground/80 md:text-3xl">
                "Twenty years in beauty, and every bride still teaches me something new.
                That is the magic of this work."
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  With over 20 years of experience — including more than a decade serving
                  Canadian brides — Moni has built MMM Studio into a destination for women
                  who expect excellence. Her artistry blends international training with
                  an intimate understanding of Toronto's diverse bridal traditions.
                </p>
                <p>
                  She is joined by a licensed hairstylist with over 40 years of experience
                  and a Canadian professional license — bringing unparalleled expertise in
                  cuts, colour, treatments, and bridal styling. Together, they offer a
                  complete premium bridal experience under one roof.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
                <div>
                  <div className="font-display text-3xl text-gradient-luxe">20+</div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Years</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-gradient-luxe">800+</div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Brides</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-gradient-luxe">5★</div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Rated</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-gradient-soft py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal><SectionLabel>The Journey</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl">A studio in chapters.</h2>
          </Reveal>
          <div className="mt-16 space-y-10 border-l border-champagne/40 pl-8">
            {timeline.map((m, i) => (
              <Reveal key={m.y} delay={i * 0.08}>
                <div className="relative">
                  <span className="absolute -left-[42px] top-2 grid h-4 w-4 place-items-center rounded-full bg-gradient-luxe shadow-glow" />
                  <div className="text-[11px] uppercase tracking-[0.3em] text-rose-gold">{m.y}</div>
                  <h3 className="mt-1 font-display text-3xl">{m.t}</h3>
                  <p className="mt-2 text-muted-foreground">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[60vh] min-h-[420px]">
        <img src={aboutBride} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 to-transparent" />
        <div className="absolute inset-0 flex items-end p-10 md:p-20">
          <p className="max-w-2xl font-display text-3xl italic text-ivory md:text-5xl">
            "Beauty is the silent language between a bride and her mirror."
          </p>
        </div>
      </section>
    </>
  );
}
