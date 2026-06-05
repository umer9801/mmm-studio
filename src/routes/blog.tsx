import { createFileRoute, Link } from "@tanstack/react-router";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g6 from "@/assets/gallery-6.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/blog")({
  component: Blog,
});

const posts = [
  { t: "The Soft-Glam Era: 2026 Bridal Makeup Trends", c: "Trends", img: blog1, d: "Inside the bridal palette redefining Toronto weddings — luminous skin, satin lips, and architectural eyes." },
  { t: "The 90-Day Bridal Skin Ritual", c: "Skincare", img: blog2, d: "A studio-tested routine engineered for camera-ready radiance on your day." },
  { t: "Toronto Bridal Fashion Week: Notes from Backstage", c: "Fashion", img: blog3, d: "Backstage with this season's most influential South-Asian designers." },
  { t: "Henna Stories: Heritage Meets Modernity", c: "Henna", img: g1, d: "How we design mehndi as wearable architecture for the modern bride." },
  { t: "The Art of the Reception Look", c: "Tips", img: g6, d: "A second look that doesn't repeat the first — a roadmap." },
];

function Blog() {
  const [feature, ...rest] = posts;
  return (
    <>
      <section className="pt-40 pb-12 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal><SectionLabel>The Journal</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl leading-[1.02] md:text-8xl">
              Editorial
              <span className="italic text-gradient-luxe"> field notes</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-28 pt-12">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <Link to="/blog" className="group grid gap-8 overflow-hidden rounded-sm border border-border bg-card md:grid-cols-2">
              <div className="aspect-[4/3] overflow-hidden md:aspect-auto">
                <img src={feature.img} alt={feature.t} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">{feature.c} · Featured</div>
                <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{feature.t}</h2>
                <p className="mt-4 text-muted-foreground">{feature.d}</p>
                <span className="mt-8 reveal-line w-fit text-xs uppercase tracking-[0.3em]">Read essay →</span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.06}>
                <Link to="/blog" className="hover-lift group block overflow-hidden rounded-sm border border-border bg-card">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={p.t} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-7">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">{p.c}</div>
                    <h3 className="mt-3 font-display text-2xl leading-snug">{p.t}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.d}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
