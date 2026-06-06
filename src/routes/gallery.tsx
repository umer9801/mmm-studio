import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import img1  from "@/assets/1.jpeg";
import img2  from "@/assets/2.jpeg";
import img3  from "@/assets/3.jpeg";
import img4  from "@/assets/4.jpeg";
import img5  from "@/assets/5.jpeg";
import img6  from "@/assets/6.jpeg";
import img7  from "@/assets/7.jpeg";
import img8  from "@/assets/8.jpeg";
import img9  from "@/assets/9.jpeg";
import img10 from "@/assets/10.jpeg";
import img11 from "@/assets/11.jpeg";
import img12 from "@/assets/12.jpeg";
import img13 from "@/assets/13.jpeg";
import img14 from "@/assets/14.jpeg";
import img15 from "@/assets/15.jpeg";
import img16 from "@/assets/16.jpeg";
import img17 from "@/assets/17.jpeg";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
});

type Item = { src: string; cat: string; alt: string };

const items: Item[] = [
  { src: img1,  cat: "Bridal",       alt: "Bridal portrait 1" },
  { src: img2,  cat: "Bridal",       alt: "Bridal portrait 2" },
  { src: img3,  cat: "Bridal",       alt: "Bridal portrait 3" },
  { src: img4,  cat: "Reception",    alt: "Reception look 1" },
  { src: img5,  cat: "Reception",    alt: "Reception look 2" },
  { src: img6,  cat: "Engagement",   alt: "Engagement look 1" },
  { src: img7,  cat: "Engagement",   alt: "Engagement look 2" },
  { src: img8,  cat: "Henna",        alt: "Bridal henna 1" },
  { src: img9,  cat: "Henna",        alt: "Bridal henna 2" },
  { src: img10, cat: "Hair Styling", alt: "Hair styling 1" },
  { src: img11, cat: "Hair Styling", alt: "Hair styling 2" },
  { src: img12, cat: "Editorial",    alt: "Editorial look 1" },
  { src: img13, cat: "Editorial",    alt: "Editorial look 2" },
  { src: img14, cat: "Bridal",       alt: "Bridal portrait 4" },
  { src: img15, cat: "Reception",    alt: "Reception look 3" },
  { src: img16, cat: "Engagement",   alt: "Engagement look 3" },
  { src: img17, cat: "Editorial",    alt: "Editorial look 3" },
];

function Gallery() {
  const [lightbox, setLightbox] = useState<Item | null>(null);
  const filtered = items;

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

      <section className="bg-ivory pb-28 pt-10">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Masonry grid */}
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

      {/* Lightbox */}
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
