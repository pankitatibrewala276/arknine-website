"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainNavigation } from "@/data/navigation";

/** Pages that have a dark hero — header should start in light-on-dark mode */
const DARK_HERO_PAGES = [
  "/",
  "/about",
  "/contact",
  "/gallery/blogs",
  "/impact",
  "/investor-relations/policies",
  "/investor-relations/announcements",
  "/investor-relations/governance",
  "/investor-relations/results",
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const hasDarkHero = DARK_HERO_PAGES.some(
    (p) => pathname === p || pathname.startsWith("/about/team/") || pathname.startsWith("/gallery/blogs/")
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  /** When on a dark hero page and not scrolled, show light-on-dark */
  const isDarkMode = hasDarkHero && !scrolled;

  return (
    <header
      className={cn(
        "header",
        scrolled && "header--scrolled",
        isDarkMode && "header--dark"
      )}
    >
      <div className="header__inner">
        <Link href="/" className="header__logo">
          <Image
            src={isDarkMode ? "/logos/Arknine white.png" : "/logos/arknine-logo.png"}
            alt="Arknine Technologies"
            width={120}
            height={28}
            className="header__logo-img"
            priority
          />
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          {mainNavigation.map((item) => (
            <div
              key={item.href}
              className={cn(
                "header__nav-item",
                item.children && "header__nav-item--has-children"
              )}
            >
              <Link
                href={item.href}
                className={cn(
                  "header__link",
                  isActive(item.href) && "header__link--active"
                )}
              >
                {item.label}
                {item.children && (
                  <svg
                    className="header__chevron"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2.5 3.75L5 6.25L7.5 3.75" />
                  </svg>
                )}
              </Link>

              {item.children && (
                <div className="header__dropdown">
                  <div className="header__dropdown-panel">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "header__dropdown-link",
                          isActive(child.href) &&
                            "header__dropdown-link--active"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link
          href="/contact"
          className={cn(
            "header__contact",
            isActive("/contact") && "header__contact--active"
          )}
        >
          Contact
        </Link>

        <button
          className="header__toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={cn(
              "header__burger",
              mobileOpen && "header__burger--open"
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "header__mobile",
          mobileOpen && "header__mobile--open"
        )}
      >
        <nav className="header__mobile-nav" aria-label="Mobile navigation">
          {mainNavigation.map((item) => (
            <div key={item.href} className="header__mobile-group">
              <Link
                href={item.href}
                className={cn(
                  "header__mobile-link",
                  isActive(item.href) && "header__mobile-link--active"
                )}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="header__mobile-sub">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "header__mobile-link header__mobile-link--sub",
                        isActive(child.href) && "header__mobile-link--active"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="btn btn-primary btn-md"
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "var(--space-4)",
            }}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
