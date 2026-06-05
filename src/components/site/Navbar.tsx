import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/packages", label: "Packages" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-[0_4px_30px_rgba(0,0,0,0.04)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="group flex items-center gap-2">
          <span className="font-display text-2xl tracking-wider text-foreground">
            MMM<span className="text-gradient-luxe"> Studio</span>
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.4em] text-muted-foreground md:inline">
            by Moni
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="reveal-line text-[12px] font-medium uppercase tracking-[0.22em] text-foreground/80 hover:text-foreground"
              activeProps={{ className: "text-foreground reveal-line" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/booking"
            className="hidden rounded-full bg-gradient-luxe px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground shadow-luxe transition hover:shadow-glow md:inline-flex"
          >
            Book Now
          </Link>
          <button
            aria-label="Menu"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass border-t border-border lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm uppercase tracking-[0.2em]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-gradient-luxe py-3 text-center text-xs uppercase tracking-[0.2em] text-primary-foreground"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
