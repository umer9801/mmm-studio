import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/faq")({
  component: FAQ,
});

const faqs = [
  { q: "How far in advance should I book?", a: "We recommend reserving your bridal date 6–12 months in advance, especially for peak wedding season (May–October). A 30% deposit secures your date." },
  { q: "Do you offer trials?", a: "Yes. Trials are included in our Gold, Platinum, and Royal packages. Trials can also be booked separately for $185 and credited to your final invoice when you book." },
  { q: "Do you travel to my venue?", a: "Absolutely. We service all of the GTA at no extra charge. Travel beyond Toronto and destination weddings are available with a custom proposal." },
  { q: "What products do you use?", a: "A curated library of luxury and editorial-grade products including Charlotte Tilbury, Pat McGrath, Dior, NARS, MAC Pro, Huda Beauty, and Suqqu." },
  { q: "Can you accommodate multiple looks in one day?", a: "Yes. Many brides choose 2–3 looks (ceremony, reception, send-off). Pricing is adjusted to include touch-ups and changeovers." },
  { q: "Do you offer makeup for guests and family?", a: "Of course. Family glam can be added to any package or booked individually. We staff a second or third artist for larger parties." },
  { q: "What is your cancellation policy?", a: "Deposits are non-refundable but transferable to a future date within 12 months, subject to availability." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className="pt-40 pb-12 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal><SectionLabel>Questions</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl leading-[1.02] md:text-8xl">
              Everything,
              <span className="italic text-gradient-luxe"> considered</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-28 pt-12">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between py-6 text-left"
                  >
                    <span className="font-display text-xl md:text-2xl">{f.q}</span>
                    <Plus
                      size={18}
                      className={`shrink-0 text-rose-gold transition ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-500 ${
                      isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-muted-foreground">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
