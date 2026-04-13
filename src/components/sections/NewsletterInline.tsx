/**
 * NewsletterInline
 * ----------------
 * Purpose: Inline newsletter CTA block for use within page sections.
 * Used on: Home page (bottom CTA), or as a standalone section
 * Visual: showcase container with heading, description, and email input.
 * Note: Footer already has its own compact newsletter form.
 */
"use client";

import { useState } from "react";

export function NewsletterInline() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="showcase" style={{ textAlign: "center" }}>
        <div className="alert alert-success" style={{ justifyContent: "center" }}>
          <strong>You&apos;re subscribed.</strong> Watch your inbox for quarterly updates.
        </div>
      </div>
    );
  }

  return (
    <div className="showcase" style={{ textAlign: "center" }}>
      <span className="eyebrow" style={{ display: "block", marginBottom: "var(--space-3)" }}>
        Stay Updated
      </span>
      <h3 style={{ marginBottom: "var(--space-3)" }}>
        Subscribe to Our Newsletter
      </h3>
      <p
        className="body-sm text-stone"
        style={{
          maxWidth: "480px",
          margin: "0 auto var(--space-6)",
        }}
      >
        Receive quarterly updates, financial results, and announcements directly
        to your inbox.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        style={{
          display: "flex",
          gap: "var(--space-2)",
          maxWidth: "420px",
          margin: "0 auto",
        }}
      >
        <input
          type="email"
          placeholder="Your email address"
          className="input"
          required
          aria-label="Email address"
        />
        <button type="submit" className="btn btn-primary btn-md" style={{ flexShrink: 0 }}>
          Subscribe
        </button>
      </form>
    </div>
  );
}
