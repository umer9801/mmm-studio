import { MessageCircle } from "lucide-react";

export function FloatingActions() {
  return (
    <a
      href="https://wa.me/14374102185"
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-luxe text-primary-foreground shadow-luxe transition hover:scale-110"
      aria-label="WhatsApp"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-rose-gold opacity-30" />
      <MessageCircle className="relative" size={22} />
    </a>
  );
}
