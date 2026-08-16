"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function NotFoundTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("page_not_found", {
      path: pathname,
      referrer: document.referrer,
    });
  }, [pathname]);

  return null;
}
