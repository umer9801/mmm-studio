import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      let json: { token?: string; error?: string } = {};
      try {
        json = await res.json() as { token?: string; error?: string };
      } catch {
        throw new Error("API not available. If running locally, use `vercel dev` instead of `vite dev`.");
      }

      if (!res.ok) {
        throw new Error(json.error || "Invalid credentials");
      }

      // Store token in sessionStorage
      sessionStorage.setItem("admin_token", json.token!);
      void navigate({ to: "/admin/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-soft px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl">MMM Studio</h1>
          <p className="mt-2 text-sm text-muted-foreground uppercase tracking-[0.25em]">Admin Portal</p>
        </div>

        <div className="rounded-sm border border-border bg-card p-8 shadow-luxe">
          <div className="mb-6 flex justify-center">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-champagne/60 text-champagne">
              <Lock size={18} />
            </div>
          </div>

          <h2 className="mb-6 text-center font-display text-2xl">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="admin"
                className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-champagne"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-sm border border-border bg-background px-4 py-3 pr-11 text-sm outline-none transition focus:border-champagne"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-luxe py-3.5 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-luxe transition hover:shadow-glow disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
