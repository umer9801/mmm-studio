import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gradient-luxe">404</h1>
        <h2 className="mt-4 font-serif text-2xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page has wandered off the runway.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-gradient-luxe px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl">Something didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again.</p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-full bg-gradient-luxe px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground"
        >
          Home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <main key={pathname} className="animate-fade-up">
        <Outlet />
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingActions />}
    </>
  );
}
