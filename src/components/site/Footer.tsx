import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[oklch(0.16_0.005_60)] text-ivory">
      <div className="gold-divider" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl text-ivory">
            MMM Studio <span className="text-gradient-luxe">by Moni</span>
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/70">
            Toronto's premier destination for luxury bridal artistry. Crafting timeless,
            unforgettable beauty for the most important day of your life.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="https://instagram.com/kothamoni_themakeupartist"
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-champagne/40 transition hover:bg-gradient-luxe"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-[11px] uppercase tracking-[0.3em] text-champagne">
            Atelier
          </h4>
          <ul className="space-y-2 text-sm text-ivory/70">
            <li><Link to="/about" className="reveal-line">About Moni</Link></li>
            <li><Link to="/services" className="reveal-line">Services</Link></li>
            <li><Link to="/packages" className="reveal-line">Packages</Link></li>
            <li><Link to="/gallery" className="reveal-line">Gallery</Link></li>
            <li><Link to="/faq" className="reveal-line">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[11px] uppercase tracking-[0.3em] text-champagne">
            Visit
          </h4>
          <ul className="space-y-3 text-sm text-ivory/70">
            <li className="flex gap-2"><MapPin size={14} className="mt-0.5 text-champagne" />3020 Danforth Ave Unit E, Toronto, ON</li>
            <li className="flex gap-2"><Phone size={14} className="mt-0.5 text-champagne" />+1 437-410-2185</li>
            <li className="flex gap-2"><Mail size={14} className="mt-0.5 text-champagne" />mmmstudiobymonica@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="gold-divider" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-[0.3em] text-ivory/50 md:flex-row md:px-10">
        <p>© {new Date().getFullYear()} MMM Studio by Moni</p>
        <p className="font-display normal-case tracking-wider">
          Crafted with elegance by MMM Studio by Moni
        </p>
      </div>
    </footer>
  );
}
