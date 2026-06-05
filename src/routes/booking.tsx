import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/booking")({
  component: Booking,
});

function Booking() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="pt-40 pb-12 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal><SectionLabel>Reserve</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl leading-[1.02] md:text-8xl">
              Begin your
              <span className="italic text-gradient-luxe"> transformation</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-28 pt-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.4fr_1fr] md:px-10">
          <Reveal>
            <div className="rounded-sm border border-border bg-card p-8 md:p-12">
              {submitted ? (
                <div className="py-16 text-center animate-fade-up">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-luxe text-primary-foreground shadow-glow">
                    <Check size={28} />
                  </div>
                  <h3 className="mt-6 font-display text-4xl">Reservation received</h3>
                  <p className="mt-3 text-muted-foreground">
                    Moni will personally respond within 24 hours to confirm your consultation.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="grid gap-5"
                >
                  <h2 className="font-display text-3xl">Appointment Request</h2>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Full Name" name="name" required />
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Phone" name="phone" type="tel" required />
                    <Field label="Event Date" name="date" type="date" required />
                  </div>
                  <Select label="Service" name="service" options={["Bridal Makeup","Reception","Engagement","Henna","Hair Styling","Consultation"]} />
                  <Select label="Event Type" name="event" options={["Wedding","Reception","Engagement","Sangeet","Photoshoot","Other"]} />
                  <Field label="Preferred Time" name="time" type="time" />
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Notes</label>
                    <textarea
                      rows={4}
                      className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-champagne"
                      placeholder="Tell us about your vision, palette, or guest count..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 rounded-full bg-gradient-luxe py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-luxe transition hover:shadow-glow"
                  >
                    Request Appointment
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-6">
              <div className="rounded-sm border border-border bg-card p-8">
                <div className="text-[11px] uppercase tracking-[0.3em] text-rose-gold">Fastest Reply</div>
                <h3 className="mt-2 font-display text-2xl">WhatsApp Booking</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Skip the form — message Moni directly for instant availability.
                </p>
                <a
                  href="https://wa.me/14374102185"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-luxe px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground"
                >
                  <MessageCircle size={14} /> Open WhatsApp
                </a>
              </div>

              <div className="rounded-sm border border-border bg-card p-8">
                <div className="text-[11px] uppercase tracking-[0.3em] text-rose-gold">What to expect</div>
                <ul className="mt-4 space-y-3 text-sm">
                  {[
                    "Response within 24 hours",
                    "Private consultation invitation",
                    "Custom proposal & timeline",
                    "Deposit secures your date",
                  ].map((s) => (
                    <li key={s} className="flex gap-2"><Check size={14} className="mt-1 text-rose-gold" />{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
      <input
        {...props}
        className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-champagne"
      />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
      <select
        name={name}
        className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-champagne"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
