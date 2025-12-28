"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function hasAuthCookie() {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith("auth="));
}

export default function AuthGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!hasAuthCookie()) {
      router.replace("/admin/login");
    }
  }, [router]);

  // Prevent flash
  if (!hasAuthCookie()) {
    return null;
  }

  return children;
}
