import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import {
  LogOut,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  RefreshCw,
  Trash2,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

interface ContactEntry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  eventDate?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<ContactEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const token = sessionStorage.getItem("admin_token");

  const fetchEntries = useCallback(async () => {
    if (!token) {
      void navigate({ to: "/admin/login" });
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        sessionStorage.removeItem("admin_token");
        void navigate({ to: "/admin/login" });
        return;
      }
      if (!res.ok) throw new Error("Failed to load contacts");
      const data = await res.json() as ContactEntry[];
      setEntries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    void fetchEntries();
  }, [fetchEntries]);

  async function markRead(id: string) {
    if (!token) return;
    try {
      await fetch(`/api/admin/contacts/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, read: true } : e))
      );
    } catch {
      // silent
    }
  }

  async function deleteEntry(id: string) {
    if (!token) return;
    if (!confirm("Delete this contact entry? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries((prev) => prev.filter((e) => e._id !== id));
    } catch {
      alert("Delete failed. Please try again.");
    } finally {
      setDeleting(null);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_token");
    void navigate({ to: "/admin/login" });
  }

  function toggleExpand(id: string) {
    if (expanded !== id) {
      void markRead(id);
    }
    setExpanded((prev) => (prev === id ? null : id));
  }

  const filtered = entries.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      (e.service ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const unread = entries.filter((e) => !e.read).length;

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <div>
            <h1 className="font-display text-2xl">MMM Studio</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Admin Dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:border-rose-gold hover:text-rose-gold transition"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Total Inquiries" value={entries.length} icon={Mail} />
          <StatCard label="Unread" value={unread} icon={Sparkles} highlight />
          <StatCard
            label="Latest"
            value={
              entries[0]
                ? new Date(entries[0].createdAt).toLocaleDateString("en-CA", {
                    month: "short",
                    day: "numeric",
                  })
                : "—"
            }
            icon={Calendar}
          />
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, service…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-sm border border-border bg-card pl-9 pr-4 py-2.5 text-sm outline-none focus:border-champagne"
            />
          </div>
          <button
            onClick={() => void fetchEntries()}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-gradient-luxe hover:text-primary-foreground hover:border-transparent transition"
          >
            <RefreshCw size={13} />
            Refresh
          </button>
        </div>

        {/* Content */}
        {loading && (
          <div className="py-20 text-center text-muted-foreground">
            <RefreshCw size={24} className="mx-auto mb-3 animate-spin" />
            Loading inquiries…
          </div>
        )}

        {error && (
          <div className="rounded-sm border border-destructive/30 bg-destructive/5 px-6 py-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            {search ? "No results found." : "No contact submissions yet."}
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((entry) => (
              <div
                key={entry._id}
                className={`rounded-sm border bg-card transition ${
                  !entry.read ? "border-champagne/60 shadow-[0_0_0_1px_var(--champagne)]" : "border-border"
                }`}
              >
                {/* Row */}
                <button
                  onClick={() => toggleExpand(entry._id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    {!entry.read && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-rose-gold" />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg truncate">{entry.name}</span>
                        {entry.service && (
                          <span className="hidden rounded-full border border-champagne/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-rose-gold sm:inline">
                            {entry.service}
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Mail size={11} />{entry.email}</span>
                        {entry.phone && <span className="flex items-center gap-1"><Phone size={11} />{entry.phone}</span>}
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {new Date(entry.createdAt).toLocaleDateString("en-CA", {
                            year: "numeric", month: "short", day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); void deleteEntry(entry._id); }}
                      disabled={deleting === entry._id}
                      className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition"
                      aria-label="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                    {expanded === entry._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* Expanded */}
                {expanded === entry._id && (
                  <div className="border-t border-border/60 px-5 pb-6 pt-4 grid gap-4 sm:grid-cols-2">
                    <DetailField label="Email">
                      <a href={`mailto:${entry.email}`} className="text-rose-gold hover:underline">
                        {entry.email}
                      </a>
                    </DetailField>
                    {entry.phone && (
                      <DetailField label="Phone">
                        <a href={`tel:${entry.phone}`} className="hover:underline">{entry.phone}</a>
                      </DetailField>
                    )}
                    {entry.service && (
                      <DetailField label="Service">{entry.service}</DetailField>
                    )}
                    {entry.eventDate && (
                      <DetailField label="Event Date">
                        {new Date(entry.eventDate).toLocaleDateString("en-CA", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </DetailField>
                    )}
                    <div className="sm:col-span-2">
                      <DetailField label="Message">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{entry.message}</p>
                      </DetailField>
                    </div>
                    <div className="sm:col-span-2 flex justify-end">
                      <a
                        href={`mailto:${entry.email}?subject=Re: Your inquiry — MMM Studio by Moni`}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-luxe px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-luxe"
                      >
                        <Mail size={12} />
                        Reply via Email
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  highlight,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-sm border p-6 ${
        highlight ? "border-champagne/60 bg-card shadow-[0_0_0_1px_var(--champagne)]" : "border-border bg-card"
      }`}
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-champagne/60 text-champagne">
        <Icon size={16} />
      </div>
      <div className="font-display text-4xl text-gradient-luxe">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
    </div>
  );
}

function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
