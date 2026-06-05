import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import aboutBride from "@/assets/about-bride.jpg";
import heroBride from "@/assets/hero-bride.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
});

type Item = { src: string; cat: string; alt: string };

const items: Item[] = [
  { src: heroBride, cat: "Bridal", alt: "Red bridal lehenga" },
  { src: g1, cat: "Bridal", alt: "Pink bridal portrait" },
  { src: g2, cat: "Reception", alt: "Champagne reception gown" },
  { src: g3, cat: "Henna", alt: "Bridal henna" },
  { src: g4, cat: "Hair Styling", alt: "Bridal updo with flowers" },
  { src: g5, cat: "Engagement", alt: "Pastel engagement look" },
  { src: g6, cat: "Editorial", alt: "Editorial beauty closeup" },
  { src: aboutBride, cat: "Editorial", alt: "Rose gold smokey eye" },
  { src: g1, cat: "Bridal", alt: "Bridal" },
  { src: g4, cat: "Hair Styling", alt: "Hair" },
  { src: g2, cat: "Reception", alt: "Reception" },
  { src: g5, cat: "Engagement", alt: "Engagement" },
];

const cats = ["All", "Bridal", "Reception", "Engagement", "Henna", "Hair Styling", "Editorial"] as const;

function Gallery() {
  const [active, setActive] = useState<(typeof cats)[number]>("All");
  const [lightbox, setLightbox] = useState<Item | null>(null);
  const filtered = active === "All" ? items : items.filter((i) => i.cat === active);

  return (
    <>
      <section className="pt-40 pb-12 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal><SectionLabel>The Gallery</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl leading-[1.02] md:text-8xl">
              A cinematic
              <span className="italic text-gradient-luxe"> archive</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-10 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.25em] transition ${
                  active === c
                    ? "border-transparent bg-gradient-luxe text-primary-foreground shadow-luxe"
                    : "border-border bg-card hover:border-champagne"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
            {filtered.map((it, i) => (
              <button
                key={i}
                onClick={() => setLightbox(it)}
                className="group relative block w-full overflow-hidden rounded-sm break-inside-avoid focus:outline-none"
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className="w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 text-left text-ivory opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-champagne">{it.cat}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-noir/90 p-6 backdrop-blur-md animate-fade-up"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-champagne/40 text-ivory"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[88vh] max-w-[92vw] rounded-sm object-contain shadow-luxe"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
