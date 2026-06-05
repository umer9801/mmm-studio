export function Particles({ count = 18 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i % 8) * 1.5;
        const duration = 12 + ((i * 7) % 14);
        const size = 2 + ((i * 3) % 5);
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full bg-champagne"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              boxShadow: "0 0 12px oklch(0.79 0.07 78)",
              animation: `particle ${duration}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
