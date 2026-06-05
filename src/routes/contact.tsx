import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Instagram, Mail, MapPin, Phone, Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

const cards = [
  { i: MapPin, t: "Atelier", v: "3020 Danforth Ave Unit E\nToronto, ON, Canada", h: "https://maps.google.com/?q=3020+Danforth+Ave+Toronto" },
  { i: Phone, t: "Call", v: "+1 437-410-2185", h: "tel:+14374102185" },
  { i: Mail, t: "Email", v: "mmmstudiobymonica@gmail.com", h: "mailto:mmmstudiobymonica@gmail.com" },
  { i: Instagram, t: "Instagram", v: "@kothamoni_themakeupartist", h: "https://instagram.com/kothamoni_themakeupartist" },
];

type FormState = "idle" | "loading" | "success" | "error";

function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      eventDate: (form.elements.namedItem("eventDate") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error || "Something went wrong");
      }

      setFormState("success");
      form.reset();
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  }

  return (
    <>
      <section className="pt-40 pb-12 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal><SectionLabel>Contact</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl leading-[1.02] md:text-8xl">
              Find us on
              <span className="italic text-gradient-luxe"> Danforth</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-2 lg:grid-cols-4 md:px-10">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.06}>
              <a
                href={c.h}
                target={c.h.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="hover-lift block h-full rounded-sm border border-border bg-card p-8"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-champagne/60 text-champagne">
                  <c.i size={15} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">{c.t}</div>
                <p className="mt-2 whitespace-pre-line font-display text-lg">{c.v}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gradient-soft py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal>
            <div className="rounded-sm border border-border bg-card p-8 md:p-12">
              {formState === "success" ? (
                <div className="py-12 text-center animate-fade-up">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-luxe text-primary-foreground shadow-glow">
                    <Check size={28} />
                  </div>
                  <h3 className="mt-6 font-display text-4xl">Message received</h3>
                  <p className="mt-3 text-muted-foreground">
                    Thank you for reaching out! A confirmation has been sent to your email. Moni will personally respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-8 inline-flex rounded-full border border-border px-6 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-gradient-luxe hover:text-primary-foreground"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5">
                  <div>
                    <SectionLabel>Send a Message</SectionLabel>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Fill in the form below and we'll get back to you within 24 hours.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Full Name" name="name" required placeholder="Your full name" />
                    <Field label="Email Address" name="email" type="email" required placeholder="your@email.com" />
                    <Field label="Phone Number" name="phone" type="tel" placeholder="+1 (416) 000-0000" />
                    <Field label="Event Date" name="eventDate" type="date" />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      Service of Interest
                    </label>
                    <select
                      name="service"
                      className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-champagne"
                    >
                      <option value="">Select a service…</option>
                      <option>Bridal Makeup</option>
                      <option>Reception Makeup</option>
                      <option>Engagement Look</option>
                      <option>Hairstyling</option>
                      <option>Bridal Henna</option>
                      <option>Hair Treatment</option>
                      <option>Facial / Hydra Facial</option>
                      <option>Full Bridal Package</option>
                      <option>Other / General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us about your vision, event details, or any questions you have…"
                      className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-champagne resize-none"
                    />
                  </div>

                  {formState === "error" && (
                    <p className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="mt-2 rounded-full bg-gradient-luxe py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-luxe transition hover:shadow-glow disabled:opacity-60"
                  >
                    {formState === "loading" ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.5fr_1fr] md:px-10">
          <Reveal>
            <div className="overflow-hidden rounded-sm border border-border shadow-luxe">
              <iframe
                title="MMM Studio Map"
                className="aspect-[4/3] w-full"
                src="https://www.google.com/maps?q=3020+Danforth+Ave+Toronto&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-sm border border-border bg-card p-8 md:p-10">
              <div className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">Hours</div>
              <h3 className="mt-2 font-display text-3xl">By appointment only</h3>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  ["Mon — Fri", "10:00 — 19:00"],
                  ["Saturday", "08:00 — 20:00"],
                  ["Sunday", "By request"],
                ].map(([d, t]) => (
                  <li key={d} className="flex justify-between border-b border-border/60 py-2">
                    <span className="flex items-center gap-2"><Clock size={12} className="text-champagne" />{d}</span>
                    <span className="font-display">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                Wedding-day services are available worldwide on request.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-champagne"
      />
    </div>
  );
}
