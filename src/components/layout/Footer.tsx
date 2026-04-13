"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/company";
import { footerNavigation } from "@/data/navigation";

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="footer__group">
      <h4 className="footer__group-title">{title}</h4>
      <ul className="footer__group-list">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="footer__link"
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = inputRef.current?.value.trim() ?? "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        if (inputRef.current) inputRef.current.value = "";
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Failed to subscribe.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <div className="footer__newsletter">
      <h4 className="footer__group-title">Stay Informed</h4>
      <p className="footer__newsletter-desc">
        Quarterly updates and investor announcements.
      </p>
      {status === "success" ? (
        <p className="footer__newsletter-desc" style={{ color: "var(--color-secondary)" }}>
          Subscribed successfully.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="footer__newsletter-form" noValidate>
          <input
            ref={inputRef}
            type="email"
            placeholder="Email address"
            className={`input input-sm ${status === "error" ? "input-error" : ""}`}
            aria-label="Email address"
            style={{ flex: 1 }}
            disabled={status === "loading"}
            onChange={() => { if (status === "error") setStatus("idle"); }}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={status === "loading"}
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p style={{ fontSize: "var(--text-caption)", color: "var(--color-secondary)", marginTop: "var(--space-2)" }}>
          {errorMsg}
        </p>
      )}
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand-col">
            <Link href="/" className="footer__brand">
              <Image
                src="/logos/Arknine white.png"
                alt="Arknine Technologies"
                width={100}
                height={22}
                className="footer__logo-img"
              />
            </Link>
            <p className="footer__tagline">{company.tagline}</p>
          </div>

          <div className="footer__links">
            <FooterLinkGroup title="Company" links={footerNavigation.company} />
            <FooterLinkGroup
              title="Investor Relations"
              links={footerNavigation.investorRelations}
            />
            <FooterLinkGroup title="Brands" links={footerNavigation.brands} />
          </div>
        </div>

        <NewsletterForm />

        <div className="footer__bottom">
          <p className="footer__legal">
            &copy; {currentYear} {company.name}. All rights reserved.
          </p>
          <div className="footer__meta">
            <span>CIN: {company.cin}</span>
            <span className="footer__meta-dot" />
            <span>Listed on {company.listedOn}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
