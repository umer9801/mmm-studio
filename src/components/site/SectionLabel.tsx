export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-10 bg-gradient-luxe" />
      <span className="text-[11px] uppercase tracking-[0.4em] text-rose-gold">
        {children}
      </span>
    </div>
  );
}
