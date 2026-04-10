"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { irSubNavigation } from "@/data/navigation";

export function IRSubNav() {
  const pathname = usePathname();

  return (
    <div style={{ borderBottom: "1px solid var(--color-mist)", background: "var(--color-pure-white)" }}>
      <div className="page-wrapper" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="tabs" style={{ marginBottom: 0, overflowX: "auto" }}>
          {irSubNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("tab", pathname === item.href && "active")}
              style={{ textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
