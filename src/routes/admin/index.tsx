import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  beforeLoad: () => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      throw redirect({ to: "/admin/dashboard" });
    } else {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: () => null,
});
